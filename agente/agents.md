# Save Room — Contexto do Projeto

> Este arquivo orienta o agente de IA que me ajuda no desenvolvimento. Leia tudo antes de sugerir ou alterar código.

## 1. Visão geral

**Save Room** é um site de uso pessoal para documentar os jogos que o autor já zerou. Funciona como um centro de ferramentas para jogadores: o usuário cria a sua conta e tem acesso a ferramentas para usar em seus jogos favoritos.

Cada jogo registrado deve guardar:

- o jogo e a plataforma em que foi jogado;
- as anotações e opiniões do jogador (o que sentiu durante a gameplay, o que achou da história);
- a faixa de tempo que levou para zerar.

## 2. Origem do nome e identidade

"Save point" é o lugar seguro onde o jogador salva o progresso e admira o ambiente e as músicas relaxantes, como nas *save rooms* de Resident Evil.

O nome **Save Room** deve passar a sensação de um lugar **nostálgico**: um espaço pessoal que salva o progresso da vida do jogador, onde cada jogo que passou por ela fica registrado e cada passo da "campanha" pode ser contado.

Tom do projeto: pessoal, nostálgico, acolhedor. Não é um site competitivo.

## 3. Por que o projeto existe

- O autor é apaixonado por videogames desde a infância (PlayStation 2 → Xbox 360 → PlayStation 4 → notebook, que também despertou o interesse por computação).
- Com os anos, os jogos ficam espalhados por plataformas e lojas digitais diferentes, sem um lugar único que reúna todos. Alguns acabam "esquecidos", sem registro, ou a pessoa até esquece de jogá-los.
- As lembranças de cada jornada ficam presas apenas na memória. O site resolve isso criando um registro permanente.

## 4. Público-alvo

Jogador **casual**: joga por diversão e prazer, sem pretensão de competir. Para esse perfil, o valor de um jogo está nas sensações e em tudo o que foi vivido enquanto se jogava, não em ranking, desempenho ou conquistas.

Consequência para as decisões de design e de funcionalidade: priorizar o CSS já criado nas páginas existentes em public, seguindo sempre a mesma estética

## 5. Funcionalidades

**Núcleo:**

- Criação de conta e login.
- Registro de jogos zerados (jogo, plataforma, anotações/opiniões, faixa de tempo para zerar).
- Centro de ferramentas de uso pessoal.

**Ideias de ferramentas:**

- Montador de times Pokémon.
- Guia das canções de ocarina de *Zelda: Ocarina of Time*.
- Outras ferramentas, abertas a sugestões da comunidade.

## 6. Estrutura atual do site

- `index.html`
  - `header` com logo (`assets/logo.png`) e `nav` com: HOME, SOBRE, SEU TIPO, CONEXÕES, FERRAMENTAS, LOGIN.
  - `main` com `article` (div `#sobreMim`).
  - `footer` com crédito a Gregory Casarini e link do GitHub `casarinigreg`.
- `style.css`: estilos da página principal.
- Login: usa `styleLogin.css` (card em duas colunas: imagem à esquerda, formulário à direita; botões "VER" e "Entrar"; link "Cadastre-se" para `cadastro.html`).
- Cadastro (`cadastro.html`): campos nickname, e-mail, senha e confirmar senha, reaproveitando o CSS do login.

## 7. Regras para o agente

1. **Respeite a estrutura e os nomes existentes** (arquivos, ids, classes, itens do menu). Não renomeie nem reorganize sem eu pedir.
2. **Reaproveite o CSS existente** antes de criar novos estilos; mantenha a identidade visual do projeto.
3. **Mudanças pequenas e explicadas:** diga o que alterou e em qual arquivo. Não reescreva arquivos inteiros sem necessidade.
4. **Não invente funcionalidades** fora deste escopo. Se algo estiver ambíguo, pergunte antes.
5. **Mantenha o tom nostálgico e pessoal** em textos, títulos e mensagens do site.
6. **Código simples e legível**, em português nos comentários, adequado ao meu nível de aprendizado.
7. Ao sugerir uma ferramenta nova, explique como ela se encaixa no perfil de jogador casual.
8. **Sempre utilizar apenas HTML, CSS, JavaScript e chartJS para fazer gráficos**
