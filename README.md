# PedroOS 98 — Portfólio de Pedro Lucas Garcia

Portfólio pessoal em forma de ambiente de trabalho ao estilo do Windows 98. Os projetos, o CV e os contactos abrem em janelas que se podem arrastar, minimizar e fechar, como num computador dos anos 90.

Sou desenvolvedor web e analista de dados, formado como Técnico Especialista em Gestão de Informação e Ciência dos Dados (Nível 5).

## O que tem

- **Ambiente de trabalho completo:** arranque com ecrã de boot, janela de boas-vindas, ícones, menu Iniciar, barra de tarefas com relógio e janelas com várias instâncias.
- **Janelas do portfólio:**
  - Projetos, com capturas de ecrã e links para o site e o código.
  - Sobre mim.
  - CV em PDF.
  - Competências.
  - Formação.
  - Formulário de contacto.
  - Uma página pessoal ao estilo dos anos 90.
- **Jogos originais:** Campo Minado, Paciência, FreeCell e Ski Rush, com recordes guardados no browser.
- **Três idiomas:** português, inglês e espanhol, escolhidos no arranque e guardados para a próxima visita.
- **Versão clássica:** em [`/classico`](classico/) há uma versão moderna e simples do portfólio, para quem prefere ir direto ao assunto.
- **Funciona no telemóvel:** em ecrãs pequenos, as janelas ocupam o ecrã inteiro.

## Projetos em destaque

| Projeto | Descrição | Links |
| --- | --- | --- |
| Royal Lion Studio | Site para uma barbearia em Lamego, com marcação online e painel de administração. | [Site](https://royal-lion-studio.vercel.app) · [Código](https://github.com/PedroLucasGarcia/royal-lion-studio) |
| EletroPoint | Loja online de eletrónica, com carrinho e páginas de login e registo. | [Site](https://eletropoint.vercel.app) · [Código](https://github.com/PedroLucasGarcia/EletroPoint-Ecommerce) |
| FrameGame | Jogo diário de adivinhar o filme a partir de uma imagem, com filmes novos todos os dias via TMDB. | [Site](https://frame-game-seven.vercel.app) · [Código](https://github.com/PedroLucasGarcia/FrameGame) |
| Orçamento Pessoal | App para registar despesas, com filtros, exportação para CSV e resumo mensal. | [Site](https://app-orcamento-pessoal-beta.vercel.app) · [Código](https://github.com/PedroLucasGarcia/AppOrcamentoPessoal) |

## Tecnologias

- HTML, CSS e JavaScript puro, sem frameworks nem passo de build.
- [98.css](https://jdan.github.io/98.css/) para o visual do Windows 98.
- Font Awesome para os ícones e Google Fonts (Pixelify Sans, VT323).

## Estrutura

```
index.html      Página principal (PedroOS 98)
style.css       Estilos do ambiente de trabalho
script.js       Janelas, menus, traduções e conteúdo
games.js        Jogos
projects.js     Lista de projetos, partilhada pelas duas versões
classico/       Versão clássica do portfólio
assets/         Imagens, capturas dos projetos e CV
```

Para adicionar um projeto, basta acrescentar um objeto à lista em [`projects.js`](projects.js). Aparece automaticamente nas duas versões.

## Correr localmente

Não é preciso instalar nada. Clona o repositório e abre o `index.html` no browser, ou usa um servidor local, por exemplo a extensão Live Server do VS Code:

```bash
git clone https://github.com/PedroLucasGarcia/Portfolio.git
```

## Contacto

- GitHub: [PedroLucasGarcia](https://github.com/PedroLucasGarcia)
- LinkedIn: [pedro-lucas-garcia](https://linkedin.com/in/pedro-lucas-garcia/)

## Licença

Distribuído sob a licença MIT. Consulta o ficheiro [LICENSE](LICENSE).
