# GoBarber

Desenvolvimento App Barber.

Comandos utilizados:

- **(yarn init -y)** - Utilizado para iniciar o yarn na aplicação.
- **(yarn add sucrase nodemon -D)** - Utilizado para adicionar a dependência
  **Nodemon** e **Sucrase**.
  - O Sucrase possibilita a utilização de _imports_ e _exports_ em vez de
    utilizar _require_. Por exemplo: **_import app from './app';_** e **_export
    default new App();_**
  - Adicionar também o comando **"scripts":{ "start": "nodemon
    caminhoArquivoIndex.js"}** no arquivo **package.json**
  - Depois criar o arquivo **nodemon.json** e adicionar os comandos **{
    "execMap": { "js": "sucrase-node" } }**
- **(yarn add express nunjucks)** - Utilizado para adicionar as dependências
  **Express** e **Nunjucks**.
- **(yarn add eslint -D)** - Utilizado para adicionar a dependência **ESLint**.
  - **(yarn eslint --init)** - Utilizado para configurar o **ESLint**.
- **(yarn add sequelize)** - Utilizado para adicionar a dependência
  **Sequelize**.
  - **(yarn add sequelize-cli -D)** - Utilizado para adicionar a dependência
    **Sequelize-Cli**.
    - **(npx sequelize init)** - Utilizado para inicializar o **Sequelize**.
    - **(npx sequelize migration:create --name=create-users)** - Utilizado para
      criar o _migration_ do **Sequelize**.
- **(yarn add pg)** - Utilizado para adicionar a dependência **Postgres**.
