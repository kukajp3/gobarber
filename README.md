# GoBarber

Desenvolvimento App Barber.

Comandos utilizados:

- **(yarn init -y)** - Utilizado para iniciar o yarn na aplicação.
- **(yarn add nodemon -D)** - Utilizado para adicionar a dependência
  **Nodemon**.
  - Adicionar também o comando **"scripts":{ "start": "nodemon
    caminhoArquivoIndex.js"}** no arquivo **package.json**
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
