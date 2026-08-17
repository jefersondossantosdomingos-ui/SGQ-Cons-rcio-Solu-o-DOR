# SGQ — Consórcio Solução DOR (Lote 08)

App de lançamento de ensaios do controle tecnológico. Supervisão GOINFRA.

## O que é

Página única em HTML/JS, sem servidor e sem build. Roda no celular do laboratorista,
guarda os lançamentos no próprio aparelho e sincroniza com uma planilha do Google
via Apps Script. Depois da primeira visita funciona **sem internet**.

## Arquivos

| Arquivo | Papel |
|---|---|
| `index.html` | O app inteiro, com a biblioteca de Excel embutida |
| `manifest.json` | Faz o navegador tratar como aplicativo instalável |
| `sw.js` | Service Worker — guarda o app no aparelho para funcionar offline |
| `icon-*.png`, `apple-touch-icon.png` | Ícones da tela de início |

## Publicar

Suba todos os arquivos na **raiz** do repositório, depois:
**Settings → Pages → Source: Deploy from a branch → `main` → `/ (root)` → Save.**

Em 1–2 minutos o app está no ar em `https://USUARIO.github.io/REPOSITORIO/`.

## Instalar no celular

Abrir o endereço no Chrome (Android) ou Safari (iPhone) e tocar em
**Instalar no celular** — no iPhone, em *Compartilhar → Adicionar à Tela de Início*.

## Atualizar

Substitua o `index.html` no repositório. Quem já tem o app instalado recebe a versão
nova em segundo plano e ela passa a valer no acesso seguinte (o app avisa na tela).

## Aviso

As credenciais de acesso estão apenas **ofuscadas** dentro do `index.html`, não
criptografadas. Isso é controle de uso, não segurança: quem baixar o arquivo e abrir
num editor de texto consegue recuperá-las.
