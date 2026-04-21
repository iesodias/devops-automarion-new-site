# Correção de Indexação Google - Documentação

## Problema Resolvido

As páginas de projeto em `/projeto/*` não estavam sendo indexadas pelo Google Search Console apesar de serem rastreadas. A causa foi identificada como:

1. **Múltiplos `<title>` tags** simultâneos (3 tags na mesma página)
2. **Meta tags incorretas** apontando para homepage em todas as páginas
3. **Conteúdo duplicado** detectado pela junção de meta tags de múltiplas rotas

## Solução Implementada

### Arquivos Modificados

#### 1. `index.html`
Removidas todas as meta tags dinâmicas que devem ser renderizadas por página:
- ❌ `<title>` (agora vazio ou renderizado por Helmet)
- ❌ `<meta name="description">` (dinâmico)
- ❌ `<meta property="og:*">` (dinâmico, exceto og:type, og:locale, og:site_name, og:image, og:image:width/height)
- ❌ `<meta name="twitter:title">` (dinâmico)
- ❌ `<meta name="twitter:description">` (dinâmico)
- ❌ `<link rel="canonical">` (dinâmico)

✅ Mantidas:
- Tags estruturais (charset, viewport, theme-color, manifest, apple icons)
- Tags universais (robots, author)
- Tags genéricas do site (og:type, og:locale, og:site_name, og:image dimensions, twitter:card)

#### 2. `vite.config.js` - Função `applyRouteMetadata()`

A função foi completamente reescrita para garantir que não há duplicação de meta tags durante a prerendering com Puppeteer:

```javascript
function applyRouteMetadata(route, html) {
  // Remove TODOS os <title> antigos
  output = output.replace(/<title[^>]*>.*?<\/title>/gi, '')
  
  // Remove TODOS os og:* e twitter:* antigos
  output = output.replace(/<meta\s+property="og:(title|description|url|image)"[^>]*>/gi, '')
  output = output.replace(/<meta\s+name="twitter:(title|description|image)"[^>]*>/gi, '')
  
  // Remove canonical antigo
  output = output.replace(/<link\s+rel="canonical"[^>]*>/gi, '')
  
  // Insere novos tags corretos para a rota
}
```

### Páginas JavaScript com Meta Tags (React Helmet)

Todos estes já tinham meta tags corretos, apenas foram validados:

#### `src/pages/Home.jsx`
```jsx
<Helmet>
  <title>DevOps Automation | DevOps, Cloud & Automação — Ieso Dias</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://iesodias.com/" />
  <meta property="og:url" content="https://iesodias.com/" />
  <meta property="og:title" content="..." />
  <meta property="og:description" content="..." />
  <meta name="twitter:title" content="..." />
  <meta name="twitter:description" content="..." />
</Helmet>
```

#### `src/pages/ProjectDetail.jsx`
```jsx
<Helmet>
  <title>{project.title} | Portfólio DevOps — Ieso Dias</title>
  <meta name="description" content={project.shortDescription} />
  <link rel="canonical" href={`https://iesodias.com/projeto/${project.slug}`} />
  <meta property="og:url" content={projectUrl} />
  <meta property="og:title" content={`${project.title} | Portfólio DevOps`} />
  <meta property="og:description" content={project.shortDescription} />
  <meta name="twitter:title" content={`${project.title} | Portfólio DevOps`} />
  <meta name="twitter:description" content={project.shortDescription} />
</Helmet>
```

## Validação

### Build Process
```bash
npm run build
```

Verifica:
1. ✅ Vite constrói os assets
2. ✅ Puppeteer renderiza as rotas (`/`, `/projeto/devops-automation-lab`, `/projeto/tech-challenge-cloud-labs`)
3. ✅ `applyRouteMetadata()` limpa e reconstrói meta tags para cada rota
4. ✅ Archivos HTML finais em `dist/` contêm apenas 1 `<title>` correto

### Checklist Final

```bash
# 1. Verificar que Home tem 1 título
grep "<title" dist/index.html | wc -l  # Deve ser 1

# 2. Verificar que Projects têm 1 título cada
grep "<title" dist/projeto/*/index.html | wc -l  # Deve ser 1 por projeto

# 3. Verificar og:url está correto
grep 'og:url.*projeto' dist/projeto/devops-automation-lab/index.html

# 4. Verificar canonical está correto
grep 'canonical.*projeto' dist/projeto/devops-automation-lab/index.html
```

## Próximos Passos para Reindexação

### 1. Deploy
Deploy a nova versão para produção.

### 2. Google Search Console
1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Vá para **Sitemap**
3. Clique em **Reenviar** no sitemap.xml existente
4. Ou adicione novamente: `https://iesodias.com/sitemap.xml`

### 3. Solicitar Reindexação
1. Vá para **Inspeção de URL** no Search Console
2. Digite as URLs:
   - `https://iesodias.com/projeto/devops-automation-lab`
   - `https://iesodias.com/projeto/tech-challenge-cloud-labs`
3. Clique em **Solicitar indexação**

### 4. Monitoramento
- Aguarde 2-4 semanas para reindexação
- Verifique **Cobertura** no Search Console para ver o status
- Procure pelas páginas no Google: `site:iesodias.com/projeto`

## Arquivos Relacionados

- `.github/copilot-instructions.md` — Instruções para futuras sessões do Copilot
- `public/sitemap.xml` — Mapa do site (já com URLs corretas)
- `public/robots.txt` — Permite indexação de todos os arquivos

## Troubleshooting

**Problema:** Still vendo múltiplos `<title>` tags após rebuild

**Solução:**
```bash
rm -rf dist/
npm run build
```

**Problema:** og:url ainda aponta para homepage

**Solução:** Verificar se `applyRouteMetadata()` está sendo chamada corretamente:
```bash
# Verificar se há chamada para applyRouteMetadata no vite.config.js
grep -n "applyRouteMetadata" vite.config.js
```

## Referências

- [Google SEO Starter Guide](https://developers.google.com/search/docs)
- [Meta Tags Best Practices](https://developers.google.com/search/docs/appearance/snippet)
- [Canonical Links](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [React Helmet Async Docs](https://github.com/steo/react-helmet-async)
