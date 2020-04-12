import { Model, Sequelize } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provide: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    // Criptografa a senha antes de adicionar o usuário no banco.
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  // Verifica se a senha informada é igual a senha cadastrada do usuário.
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

export default User;
