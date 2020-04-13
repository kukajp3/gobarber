# GoBarber

Desenvolvimento App Barber.

Comandos utilizados:

- **(yarn init -y)** - Utilizado para iniciar o yarn na aplicação.
- **(yarn add sucrase nodemon -D)** - Utilizado para adicionar a dependência **Nodemon** e **Sucrase**.
  - O Sucrase possibilita a utilização de _imports_ e _exports_ em vez de utilizar _require_. Por exemplo: **_import app from './app';_** e **_export
    default new App();_**.
  - Adicionar também o comando **"scripts":{ "start": "nodemon caminhoArquivoIndex.js"}** no arquivo **package.json**.
  - Depois criar o arquivo **nodemon.json** e adicionar os comandos **{"execMap": { "js": "sucrase-node" } }**.
  - Para rodar, utilizar o comando **yarn start** no terminal.
- **(yarn add express)** - Utilizado para adicionar as dependências
  **Express**.
- **(yarn add eslint -D)** - Utilizado para adicionar a dependência **ESLint**.
  - **(yarn eslint --init)** - Utilizado para configurar o **ESLint**.
  - **(yarn add prettier eslint-config-prettier eslint-plugin-prettier -D)** - Utilizado para adicionar o **Prettier** e as as configurações com o **ESLint**.
  - **(yarn eslint --fix src --ext .js)** - Corrige os erros dos arquivos .js através do **ESLint**.
- **(yarn add pg pg-hstore)** - Utilizado para adicionar a dependência **Postgres**.
- **(yarn add sequelize)** - Utilizado para adicionar a dependência **Sequelize**.
- **(yarn add sequelize-cli -D)** - Utilizado para adicionar a dependência **Sequelize-Cli**.
  - **(yarn sequelize migration:create --name=create-users)** - Utilizado para criar o migration do **Sequelize**.
  - **(yarn sequelize db:migrate)** - Executa as migrations. O local das migrations é buscado no arquivo '.sequelizerc'.
- **(yarn add bcryptjs)** - Utilizado para adicionar a dependência **bcryptjs** que será usado na geração de senhas hash.
- **(yarn add jsonwebtoken)** - Utilizado para adicionar a dependência **JWT** que será usado na geração de um token de sessão.
- **(yarn add yup)** - Utilizado para adicionar a dependência **yup** responsável por validar campos, por exemplo: O campo 'nome' terá no mínimo 6 letras.
- **(yarn add multer)** - Utilizado para adicionar a dependência **Multer**.
