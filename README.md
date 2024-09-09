# Consume Products Open Food Facts

Este projeto é uma API que importa e armazena dados do Open Food Facts para uma base de dados, atualizando essas informações diariamente.

## Tecnologias Utilizadas

- Linguagem: Node.js (Typescript)
- Framework: Express
- Banco de Dados: MongoDB
- Gerenciador de Pacotes: npm
- Outros: Axios, nodemon, node-cron, yup
https://github.com/seu-usuario/nome-do-projeto.

## Instalação e Uso

### Pré-requisitos

- Docker version 27.1.2

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/devluisfelippe/challenge-coodesh-v4.git

2. Monte a imagem Docker:
    ```bash
    windows: docker compose build
    linux: sudo docker-compose build
    ```
3. Suba a aplicação no Docker
    ```bash
    windows: docker compose up -d
    linux: sudo docker-compose up -d
    ```

> Por padrão a API esta utilizando a porta 3000.

### Investigação para o Desenvolvimento do Sistema

1. Antes de iniciar, fiz a separação dos requisitos do sistema, no caso, os Endpoints e Serviços que seriam necessários para cumprir as necessidades especificadas, quebrei os Endpoints e Serviços em tasks menores, utilizando um editor externo pude definir melhor os Controladores, Serviços, Regra de Negócio e etc, após a definição de toda a estrutura que seria necessária para minha aplicação e sua desestruturação em tasks menores, ficou mais claro o que deveria ser feito.

2. Após toda a definição da estrutura, comecei em "camadas", da mais externa para a mais interna, então iniciei criando o servidor e suas rotas, em seguida o controller, service e etc, até chegar a camada mais interna, a principio não defini nenhum tipo de regra, minha intenção principal era deixar tudo integrado e funcionando, devolvendo apenas um status de tudo OK, pois com tudo funcionando, eu poderia focar nas regras, lógica e etc, indo lapidando o sistema, fazendo as devidas separações.

3. Com o sistema rodando, pude ir melhorando cada parte, criando os contratos (Interfaces), realizando as devidas separações(aplicando algumas regras do S.O.L.I.D em alguns casos de forma mais explicita e outras formas de boas práticas) e melhorias.

4. Com a conclusão total das estruturas a nível de Infra e Application, pude começar a criação das regras de negócio e também as separações por pastas, lembrando que durante todo o desenvolvimento fui seguindo o que foi descrito no passo 1, marcando as tasks como concluídas.

5. Por fim, com todo o sistema operando comecei a desenvolver os principais testes, que seria no foi o de serviço e de rotas, eu também poderia ter desenvolvido os testes a cada metódo criado, porém optei por realizar a criação de todos no final do projeto, mas em um projeto real, a melhor prática seria construir os testes na medida que finalizava cada parte dos serviços.

> Obs: algumas regras de entrada como PUT /products, que defini apenas o status para alteração por não saber exatamente o que poderia ser alterado no produto, assim também fiz para a importação dos produtos direto do open food facts, no qual estou importando os produtos por inteiro, porém existe uma falha no que me é solicitado, mas seria algo que em um cenário real eu tiraria minhas dúvidas com quem definiu o projeto.

>  This is a challenge by [Coodesh](https://coodesh.com/)