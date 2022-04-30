# Descrição

Este projeto foi desenvolvido durante o período de Curso da Trybe 🚀

O projeto tem por objetivo a avaliação e prática dos conhecimentos adquiridos na Trybe, visando o cumprimento do requisitos solicitados pela mesma.

### *ATENÇÃO: Para utilizar a aplicação acesse o link no canto direito em "About"*.

![img](projectIntro.gif)

---

# Sumário

- [Descrição](#descrição)
- [Habilidades](#habilidades-requeridas)
- [O que foi desenvolvido](#o-que-foi-desenvolvido)
- [Tecnologias usadas](#tecnologias-usadas)
- [ANTES DE INICIALIZAR A APLICAÇÃO](#antes-de-inicializar-a-aplicação)
- [Linter](#linter)
- [Desmontração de Uso](#desmontração-de-uso)

---

## Habilidades requeridas

* Utilizar a _Context API_ do **React** para gerenciar estado.
* Utilizar o _React Hook useState_;
* Utilizar o _React Hook useContext_;
* Utilizar o _React Hook useEffect_;
* Criar _React Hooks_ customizados.

---

## O que foi desenvolvido

Você vai desenvolver uma lista com filtros de planetas do universo de Star Wars usando **Context API e Hooks** para controlar os estados globais.

Lembre-se que você pode consultar nosso conteúdo sobre Git & GitHub no Course sempre que precisar!

---

## Tecnologias usadas

- `javascript` , `jsx` , `React` , `ContextAPI` e `css`.

---

## ANTES DE INICIALIZAR A APLICAÇÃO

1. Clone o repositório
  * `git clone git@github.com:tryber/sd-017-project-starwars-planets-search.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-017-project-starwars-planets-search`

2. Instale as dependências e inicialize o projeto
  * Instale as dependências:
    * `npm install`
  * Inicialize o projeto:
    * `npm start` (uma nova página deve abrir no seu navegador com um texto simples)
  * Verifique que os testes estão executando:
    * `npm test` (os testes devem rodar e falhar)

---

## Linter

Para garantir a qualidade do código de forma a tê-lo mais legível, de mais fácil manutenção e seguindo as boas práticas de desenvolvimento foi utilizado neste projeto o linter `ESLint` e o `Stylelint`. Para rodar o linter localmente, execute o comando abaixo:

```bash
npm run lint
npm run lint:styles
```
---

## Execução de testes unitários

Neste projeto foi utilizado a [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro) para execução dos testes unitários.

Em alguns dos [Requisitos do projeto](#requisitos-do-projeto) será pedido que você coloque o atributo `data-testid` nos elementos HTML. Isso acontece pois a RTL utiliza esse atributo para poder verificar a solução proposta.

Por exemplo, se o requisito pedir "crie um botão e adicione o id de teste (ou `data-testid`) com o valor `my-action`", você poderá criar:

```html
<button data-testid="my-action"></button>
```

ou

```html
<a data-testid="my-action"><a/>
```

O atributo `data-testid="my-action"` servirá para a React Testing Library identificar o elemento e, dessa forma, será possível realizar os testes unitários focados no comportamento da aplicação.

**Importante:** Em alguns requisitos, utilizamos o método `getByRole` para poder selecionar os elementos de forma semântica. Portanto atente-se às instruções de cada requisito. Por exemplo, se o requisito pedir explicitamente um button, você deverá utilizar exatamente esse elemento.

Para verificar se seu projeto atende aos requisitos, você pode executar todos os testes unitários localmente, executando o comando:

```bash
npm test
```

### Dica: desativando testes

Para rodar apenas um teste, basta a utilização da função `.only` após o describe. Com isso, será possível que apenas um requisito rode localmente e seja avaliado.

![image](describe-only.png)
![image](only-all-green.png)

Caso queira avaliar apenas um tópico do requisito, você também pode usar o `.only` após o `it`.

![image](it-only.png)
![image](only-one-green.png)

---

## Desmontração de Uso

### *Em produção*...
