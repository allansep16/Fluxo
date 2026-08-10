# Fluxo — Quadro Kanban

Quadro de tarefas estilo Kanban, com arrastar-e-soltar, totalmente funcional sem
backend nem banco de dados — os dados ficam salvos no próprio navegador (localStorage).

Cada cartão recebe automaticamente um código de rastreio (ex: FLX-1001), inspirado
em etiquetas de encomenda — uma referência direta à experiência do desenvolvedor
como Operador Logístico.

**Stack:** React + Vite. Sem dependências externas de drag-and-drop (implementado
com a API nativa do HTML5).

## Funcionalidades
- Criar, editar e excluir cartões (título, descrição, prioridade)
- Arrastar cartões entre colunas
- Criar, renomear e remover colunas
- Prioridade visual (baixa / média / alta)
- Tudo salvo automaticamente no navegador

## Como rodar localmente
1. `npm install`
2. `npm run dev`
3. Acesse o link mostrado (geralmente http://localhost:3000)

## Deploy
Publicado diretamente na Vercel — sem necessidade de configurar backend ou banco.
