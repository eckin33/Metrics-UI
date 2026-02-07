# Metrics Dashboard

Dashboard web desenvolvido em **React** para visualização de métricas de produtividade e comportamento do usuário, consumindo dados reais gerados pela aplicação **IdFocus**.

O projeto tem como objetivo transformar ações do usuário (login, criação de tarefas, sessões de foco, etc.) em **dados analisáveis**, exibidos em gráficos dinâmicos, sem recarregar a página.

🔗 **Aplicação em produção:** https://metrics-ui-tau.vercel.app/  
🔗 **Backend:** https://github.com/eckin33/backend-idf  
🔗 **Projeto base (IdFocus):** https://github.com/eckin33/Projeto-IdFocus

---

## 🎯 Propósito do Projeto

Este dashboard foi criado para resolver um problema real:

> “Como visualizar, de forma clara e organizada, o comportamento e a produtividade do usuário a partir de eventos gerados no front-end?”

A aplicação consome métricas armazenadas no backend e apresenta insights como:
- Quantidade de ações por período
- Criação de tarefas
- Sessões de foco (Pomodoro)
- Comparação entre tipos de eventos

Tudo isso respeitando autenticação e isolamento de dados por usuário.

---

## 🧠 Principais Conceitos Aplicados

- Arquitetura **SPA (Single Page Application)**
- Autenticação via **JWT**
- Consumo de API protegida
- Renderização condicional baseada em estado
- Gráficos dinâmicos com troca de período via query params
- Separação clara entre **UI, lógica e dados**
- Integração com backend real em produção

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- React Router
- Hooks (`useEffect`, `useState`)
- Fetch API
- Chart.js
- Bootstrap / CSS customizado

### Backend 
- Node.js
- Express
- Prisma ORM
- JWT
- MongoDB

---

## 🔐 Autenticação e Fluxo de Login

- O dashboard **não possui cadastro próprio**
- O login utiliza o mesmo backend do IdFocus
- Usuários só conseguem acessar o dashboard se:
  - Possuírem conta no IdFocus
  - Estiverem autenticados via token JWT válido

### Fluxo:
1. Usuário faz login
2. Token JWT é armazenado no `localStorage`
3. Requisições ao backend incluem:
4. Rotas protegidas validam o token antes de retornar métricas

---

## 📈 Dashboard e Métricas

O dashboard permite:
- Selecionar períodos (ex: hoje, últimos 7 dias, etc.)
- Atualizar gráficos **sem recarregar a página**
- Visualizar métricas agregadas por tipo de evento

Exemplos de métricas:
- Total de ações no período
- Quantidade de logins
- Tarefas criadas
- Sessões de foco iniciadas

---

## 🧪 Tratamento de Estados

A aplicação trata corretamente:
- Loading (aguardando resposta da API)
- Dados vazios (métricas = 0)
- Token inválido ou expirado
- Erros de requisição

O conteúdo do dashboard só é renderizado após a confirmação de que os dados foram carregados com sucesso.

---

## 🚀 Deploy

- Aplicação hospedada na **Vercel**
- Build otimizado para SPA
- Configuração de rotas para evitar erros ao recarregar páginas diretamente

---

## 📌 Aprendizados

Este projeto consolidou conceitos importantes como:
- Integração real entre frontend e backend
- Autenticação em aplicações SPA
- Visualização de dados baseada em eventos
- Organização de estados e efeitos colaterais no React
- Deploy e resolução de problemas em ambiente de produção

---

## 📄 Licença

Este projeto é de uso educacional e faz parte do ecossistema do **IdFocus**.

