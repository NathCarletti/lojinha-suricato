# 🛍️ Projeto Loja React

Este é um projeto de uma **loja virtual** desenvolvida com **React + Vite + TypeScript**, simulando a experiência completa de um usuário navegando, adicionando produtos ao carrinho e finalizando uma compra.

---

## ✨ Funcionalidades

- Listagem de produtos com **cards interativos**
1. **Página de listagem de produtos:**
   - Cards exibindo imagem, nome, preço e botão "Adicionar ao carrinho"
   - Clique no card leva à página de detalhes do item
2. **Página de detalhes do produto:**
   - Exibe imagem, descrição e avaliações do item
   - Contém botão para adicionar ao carrinho
3. **Carrinho lateral:**
   - Sempre visível
   - Exibe imagem, nome, preço e quantidade dos produtos
   - Botão "Checkout" para seguir para o resumo da compra
4. **Página de Checkout:**
   - Mostra o resumo do pedido
   - Botão "Finalizar compra"
5. **Tela de confirmação:**
   - Mensagem de sucesso da compra
   - Seta/botão para retornar à página inicial
---

## 🚀 Como rodar o projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
2. Navegue até a pasta do projeto:
    cd nome-da-pasta
3.  Instale as dependências:
    pm install
4. Inicie o servidor de desenvolvimento:
   npm run dev
5. Acesse o projeto via navegador:
   http://localhost:5173/

---


## 🗂️ Organização do código

A estrutura de pastas dentro da pasta `src/` segue uma separação clara de responsabilidades:
```
src/
├── components/ # Componentes reutilizáveis (Card, Header, Cart, etc.)
├── pages/ # Páginas da aplicação (Home, ProductDetails, Checkout, Success)
├── context/ # Contextos globais (ex: Carrinho)
├── api/ # Simulações ou chamadas de API
├── types/ # Tipagens TypeScript (tipos e interfaces)
├── App.tsx # Componente raiz da aplicação com rotas
├── main.tsx # Ponto de entrada do React (ReactDOM)
```
---

## 🧪 Tecnologias utilizadas

- [React](https://reactjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) como bundler e dev server
- [Tailwind CSS](https://tailwindcss.com/) para estilização
- [React Router](https://reactrouter.com/) para navegação entre páginas
- [localStorage](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage) para persistência dos dados do carrinho
- [useReducer](https://react.dev/reference/react/useReducer) e [useEffect](https://react.dev/reference/react/useEffect) para gerenciamento de estado

---

