import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import puppeteer from 'puppeteer-core'
import { projects } from './src/data/projects.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoutes = projects.map(({ slug }) => `/projeto/${slug}`)
const prerenderRoutes = ['/', ...projectRoutes]
const staticDir = path.resolve(__dirname, 'dist')
const chromeExecutablePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function resolveRequestFile(requestPath) {
  const pathWithIndex = requestPath.endsWith('/') ? `${requestPath}index.html` : requestPath
  const resolved = path.resolve(staticDir, `.${pathWithIndex}`)
  if (!resolved.startsWith(staticDir)) {
    return null
  }
  return resolved
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function applyRouteMetadata(route, html) {
  const slug = route.startsWith('/projeto/') ? route.split('/').at(-1) : null
  const project = slug ? projects.find((item) => item.slug === slug) : null

  if (!project) {
    return html
  }

  // Remove ALL title tags (can be multiple due to Helmet rendering)
  let output = html.replace(/<title[^>]*>.*?<\/title>/gi, '')
  
  // Insert single correct title tag
  const title = `${project.title} | Portfólio DevOps`
  const titleTag = `<title>${escapeHtml(title)}</title>`
  output = output.replace('</head>', `    ${titleTag}\n</head>`)

  // Remove duplicate meta tags - keep only the last occurrence of each tag
  // Remove meta name="description" - keep last one
  const descriptions = output.match(/<meta\s+name="description"[^>]*>/gi) || []
  if (descriptions.length > 1) {
    output = output.replace(/<meta\s+name="description"[^>]*>/gi, '')
    // Re-add the correct one
    const correctDesc = `<meta name="description" content="${escapeHtml(project.shortDescription || project.description)}">`
    output = output.replace('</head>', `  ${correctDesc}\n</head>`)
  }

  // Remove duplicate og:* and twitter:* tags - keep only the project-specific ones
  output = output.replace(/<meta\s+property="og:(title|description|url|image)"[^>]*>/gi, '')
  output = output.replace(/<meta\s+name="twitter:(title|description|image)"[^>]*>/gi, '')
  
  // Re-add correct og and twitter tags
  const projectUrl = `https://iesodias.com/projeto/${project.slug}`
  const ogTitle = `<meta property="og:title" content="${escapeHtml(project.title + ' | Portfólio DevOps')}">`
  const ogDesc = `<meta property="og:description" content="${escapeHtml(project.shortDescription || project.description)}">`
  const ogUrl = `<meta property="og:url" content="${projectUrl}">`
  const ogImage = `<meta property="og:image" content="https://iesodias.com/assets/images/og-image.png">`
  const twTitle = `<meta name="twitter:title" content="${escapeHtml(project.title + ' | Portfólio DevOps')}">`
  const twDesc = `<meta name="twitter:description" content="${escapeHtml(project.shortDescription || project.description)}">`

  output = output.replace('</head>', `  ${ogTitle}\n  ${ogDesc}\n  ${ogUrl}\n  ${ogImage}\n  ${twTitle}\n  ${twDesc}\n</head>`)

  // Remove duplicate canonical
  output = output.replace(/<link\s+rel="canonical"[^>]*>/gi, '')
  const canonical = `<link rel="canonical" href="${projectUrl}">`
  output = output.replace('</head>', `  ${canonical}\n</head>`)

  return output
}

function prerenderPlugin(routes) {
  return {
    name: 'prerender-static-routes',
    apply: 'build',
    enforce: 'post',
    async closeBundle() {
      console.log('[prerender] starting static prerendering')

      const server = createServer(async (req, res) => {
        try {
          const requestUrl = new URL(req.url || '/', 'http://127.0.0.1')
          const requestedFile = resolveRequestFile(requestUrl.pathname)
          const fallbackFile = path.join(staticDir, 'index.html')
          const fileToServe = requestedFile || fallbackFile

          let responseBody
          let responseExtension
          try {
            responseBody = await readFile(fileToServe)
            responseExtension = path.extname(fileToServe)
          } catch {
            responseBody = await readFile(fallbackFile)
            responseExtension = '.html'
          }

          const extension = responseExtension || '.html'
          res.setHeader('content-type', contentTypes[extension] || 'application/octet-stream')
          res.end(responseBody)
        } catch (error) {
          res.statusCode = 500
          res.end('Internal Server Error')
          console.error('[prerender] failed to serve asset', error)
        }
      })

      await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
      const address = server.address()

      if (!address || typeof address === 'string') {
        throw new Error('[prerender] failed to resolve local server address')
      }

      const browser = await puppeteer.launch({
        args: ['--disable-setuid-sandbox', '--no-sandbox'],
        executablePath: chromeExecutablePath,
        headless: true,
      })

      try {
        for (const route of routes) {
          const page = await browser.newPage()
          const targetUrl = `http://127.0.0.1:${address.port}${route}`
          console.log(`[prerender] rendering route ${route}`)

          page.setDefaultNavigationTimeout(30000)
          await page.goto(targetUrl, { waitUntil: 'domcontentloaded' })
          await page.waitForSelector('#root')
          await page.waitForSelector('title')

          const html = applyRouteMetadata(route, await page.content())
          const routeOutputPath =
            route === '/'
              ? path.join(staticDir, 'index.html')
              : path.join(staticDir, route.replace(/^\//, ''), 'index.html')

          await mkdir(path.dirname(routeOutputPath), { recursive: true })
          await writeFile(routeOutputPath, html, 'utf-8')
          await page.close()
        }
      } finally {
        await browser.close()
        await new Promise((resolve) => server.close(resolve))
      }

      console.log('[prerender] completed static prerendering')
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerenderPlugin(prerenderRoutes),
  ],
  base: '/',
  build: {
    outDir: 'dist',
  },
})
