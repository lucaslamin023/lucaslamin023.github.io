# 🚀 Guia Prático de Integração de Projetos - Portfólio de Lucas Borges

Parabéns! Seu site de portfólio está configurado com a identidade visual futurista inspirada na **FIAP** e no modelo analítico do **Franklin**.

Este guia explica exatamente o que fazer para integrar **novos projetos (até 6 ou mais)**, adicionar imagens do GitHub, linkar apresentações HTML interativas e publicar seu site no GitHub Pages.

---

## 📁 Estrutura de Pastas do Portfólio

```
E:\programing\DADOS\Portifólio\
├── index.html                  <-- Estrutura principal do site
├── INTEGRACAO_PROJETOS.md      <-- Este guia de ajuda
├── css/
│   └── style.css               <-- Estilos, cores FIAP e carrossel
├── js/
│   └── main.js                 <-- Carrossel, filtro e modal de HTML
├── assets/
│   ├── images/                 <-- Imagens dos projetos (ex: global-superstore.png)
│   └── resume.pdf              <-- Opcional: Seu currículo em PDF
└── projects/
    └── superstore-analysis.html <-- Relatórios/apresentações HTML interativas
```

---

## 🛠️ Como Adicionar Novos Projetos ao Carrossel

O carrossel foi construído para exibir **3 projetos por vez no computador** (2 em tablets e 1 no celular). Ele já vem pré-configurado no HTML com **6 cards** (1 projeto real completo e 5 modelos prontos para você preencher).

### Passo 1: Salvar a Imagem do Projeto
Para usar uma capa personalizada no carrossel:
1. Copie a imagem do seu projeto (ex: `Global SuperStore.png` ou print do dashboard) para a pasta:
   `E:\programing\DADOS\Portifólio\assets\images\`
2. Ou use o link direto da imagem no seu repositório do GitHub (ex: `https://raw.githubusercontent.com/lucaslamin023/seu-repositorio/main/imagem.png`).

### Passo 2: Salvar o Relatório HTML (Opcional, mas Recomendado!)
Se o seu projeto gera um HTML interativo (ex: Jupyter Notebook exportado, Plotly, HTML com dashboard):
1. Copie o arquivo `.html` para a pasta:
   `E:\programing\DADOS\Portifólio\projects\novo-projeto.html`

### Passo 3: Atualizar o Card no `index.html`
Abra o arquivo `index.html` no seu editor (VS Code ou Bloco de Notas) e localize a seção `<!-- CARD 2: AUTOMATION & AUDIT -->` (ou Card 3, 4, 5, 6).

Substitua o conteúdo do card conforme o exemplo abaixo:

```html
<!-- EXEMPLO DE CARD CUSTOMIZADO -->
<div class="glass-card project-card" data-category="auditoria python">
    <div class="project-img-wrapper">
        <!-- Substitua pelo caminho da sua imagem -->
        <img src="assets/images/seu-projeto.png" alt="Título do Projeto" class="project-img">
        <span class="project-overlay-badge">NOVO PROJETO</span>
    </div>
    <div class="project-content">
        <div class="project-tags">
            <span class="project-tag">Python</span>
            <span class="project-tag">SQL</span>
            <span class="project-tag">Protheus</span>
        </div>
        <h3 class="project-title">Nome do Seu Projeto</h3>
        <p class="project-description">
            Breve descrição dos resultados alcançados, métricas e tecnologias utilizadas.
        </p>
        <div class="project-actions">
            <!-- Botão para abrir a apresentação HTML interativa no modal -->
            <button onclick="openProjectModal('Nome do Projeto', 'projects/novo-projeto.html')" class="btn btn-primary btn-sm project-btn">
                <i class="fas fa-desktop"></i> Ver Apresentação
            </button>
            <!-- Botão do GitHub -->
            <a href="https://github.com/lucaslamin023/nome-do-repositorio" target="_blank" class="btn btn-secondary btn-sm project-btn">
                <i class="fab fa-github"></i> Código
            </a>
        </div>
    </div>
</div>
```

---

## 🏷️ Categorias e Filtros

Cada card possui o atributo `data-category=""`. Esse atributo define em qual filtro o projeto vai aparecer:
- `data-category="ml"` -> Machine Learning & Forecast
- `data-category="bi"` -> Power BI & Dashboards
- `data-category="auditoria"` -> Auditoria & Estoque
- `data-category="python"` -> Python & ETL
- Para aparecer em múltiplos filtros, basta separar por espaço: `data-category="ml python auditoria"`

---

## 🌐 Como Publicar no GitHub Pages (Gratuito e Rápido)

Para deixar seu site online com link público (ex: `https://lucaslamin023.github.io/`):

1. Crie um repositório no seu GitHub chamado `lucaslamin023.github.io` ou `portifolio`.
2. Suba todos os arquivos da pasta `E:\programing\DADOS\Portifólio\` para o repositório.
3. No GitHub, vá em **Settings** > **Pages**.
4. Em **Build and deployment** > **Source**, selecione a branch `main` e a pasta `/ (root)`.
5. Clique em **Save**. Em 1 a 2 minutos seu site estará no ar mundialmente!

---

## 💡 Recursos Incluídos no Seu Portfólio

- ✅ **Identidade FIAP**: Cores Dark Velvet (`#08080c`), Rosa Neon FIAP (`#ed145b`), Ciano Cyber (`#00f2fe`) e Glassmorphism.
- ✅ **Carrossel Responsivo 3 em 1**: Exibe 3 projetos simultâneos em telas grandes e desliza suavemente com botões, dots ou arrasto no celular.
- ✅ **Modal Iframe Interativo**: Abre arquivos HTML completos (como a análise do Global Superstore) dentro do próprio site.
- ✅ **Digitação Dinâmica**: Texto do Hero alternando seus títulos profissionais.
- ✅ **Botões "Copiar E-mail"**: Feedback visual instantâneo (Toast Notification) quando alguém clica para copiar seus contatos.
