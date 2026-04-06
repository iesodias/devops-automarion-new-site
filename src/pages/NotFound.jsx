import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Home, BookOpen, FolderOpen, Mail, Terminal } from 'lucide-react'

const terminalLines = [
  { prompt: '~$', cmd: 'curl -I /page-requested', delay: 0 },
  { prompt: '', cmd: 'HTTP/1.1 404 Not Found', delay: 1, error: true },
  { prompt: '', cmd: 'content-type: text/html', delay: 2 },
  { prompt: '~$', cmd: 'echo "Página não encontrada"', delay: 3 },
]

const quickLinks = [
  { to: '/#cursos', label: 'Cursos', icon: BookOpen },
  { to: '/#portfolio', label: 'Portfólio', icon: FolderOpen },
  { to: '/#contato', label: 'Contato', icon: Mail },
]

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const stagger = (index) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.12}s`,
  })

  return (
    <>
      <Helmet>
        <title>404 — Página não encontrada | DevOps Automation</title>
        <meta
          name="description"
          content="A página que você procura não existe ou foi movida."
        />
      </Helmet>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white">
        {/* ── Decorative ambient blobs ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-[480px] w-[480px] animate-[notFoundFloat_7s_ease-in-out_infinite] rounded-full bg-primary/[0.04] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-32 h-[400px] w-[400px] animate-[notFoundFloat_9s_ease-in-out_infinite_1s] rounded-full bg-orange/[0.05] blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 h-[280px] w-[280px] -translate-x-1/2 animate-[notFoundFloat_8s_ease-in-out_infinite_0.5s] rounded-full bg-gradient-to-br from-purple/[0.06] to-pink/[0.04] blur-2xl"
        />

        {/* ── Content ── */}
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 py-20 sm:px-6">
          <div className="flex flex-col items-center text-center">

            {/* Large 404 number */}
            <div style={stagger(0)} className="relative select-none">
              {/* Ghost outline behind */}
              <span
                aria-hidden="true"
                className="absolute inset-0 font-heading text-[8rem] font-black leading-none text-primary/[0.04] sm:text-[10rem] lg:text-[12rem]"
                style={{ transform: 'translate(4px, 4px)' }}
              >
                404
              </span>
              <h1 className="font-heading text-[8rem] font-black leading-none sm:text-[10rem] lg:text-[12rem]">
                <span className="bg-gradient-to-r from-primary to-purple bg-clip-text text-transparent">
                  404
                </span>
              </h1>
            </div>

            {/* Title */}
            <h2
              style={stagger(1)}
              className="mt-2 font-heading text-2xl font-bold text-primary sm:text-3xl"
            >
              Página não encontrada
            </h2>

            {/* Decorative gradient bar */}
            <div
              style={stagger(2)}
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-orange to-pink"
            />

            {/* Description */}
            <p
              style={stagger(3)}
              className="mt-5 max-w-md text-base leading-relaxed text-gray-muted sm:text-lg"
            >
              A página que você procura não existe ou foi movida.
              Verifique o endereço ou volte à página inicial.
            </p>

            {/* Terminal mockup */}
            <div
              style={stagger(4)}
              className="mt-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-light bg-white shadow-xl"
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-gray-light bg-gray-bg px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-pink/60" />
                <span className="h-3 w-3 rounded-full bg-orange/60" />
                <span className="h-3 w-3 rounded-full bg-primary/40" />
                <span className="ml-2 flex items-center gap-1.5 font-mono text-xs text-gray-muted">
                  <Terminal size={12} />
                  terminal
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 text-left font-mono text-sm leading-7">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? 'translateX(0)' : 'translateX(-12px)',
                      transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${0.9 + line.delay * 0.25}s`,
                    }}
                  >
                    {line.prompt && (
                      <span className="text-orange">{line.prompt} </span>
                    )}
                    <span
                      className={
                        line.error
                          ? 'font-semibold text-pink'
                          : line.prompt
                            ? 'text-primary'
                            : 'text-gray-muted'
                      }
                    >
                      {line.cmd}
                    </span>
                  </div>
                ))}
                <div
                  className="mt-1 inline-block h-4 w-2 animate-[blink404_1s_step-end_infinite] bg-primary"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transition: 'opacity 0.5s 2.2s',
                  }}
                />
              </div>
            </div>

            {/* Primary CTA */}
            <div style={stagger(5)} className="mt-10">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange px-7 py-3 font-semibold text-white shadow-md transition-all duration-200 ease-out hover:bg-orange-dark hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Home size={18} className="shrink-0" />
                Voltar ao Início
              </Link>
            </div>

            {/* Quick links */}
            <nav
              style={stagger(6)}
              className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
              aria-label="Links rápidos"
            >
              <span className="text-sm text-gray-muted">Ou acesse:</span>
              {quickLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={label}
                  to={to}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-light bg-white px-4 py-2 text-sm font-medium text-primary transition-all duration-200 ease-out hover:border-primary hover:bg-primary/5 active:scale-[0.98]"
                >
                  <Icon size={15} className="shrink-0" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Brand watermark */}
            <p
              style={stagger(7)}
              className="mt-14 font-mono text-xs tracking-wider text-gray-muted/50"
            >
              DEVOPS AUTOMATION
            </p>
          </div>
        </div>

        {/* Keyframes */}
        <style>{`
          @keyframes notFoundFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-18px); }
          }
          @keyframes blink404 {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </section>
    </>
  )
}
