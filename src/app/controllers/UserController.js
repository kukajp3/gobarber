import * as yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Valida os campos no insert do usuário.
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });

    // Se alguma validação retornar errado, ocorre erro.
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const { id, name, email, provide } = await User.create(req.body);

    return res.json({ id, name, email, provide });
  }

  async update(req, res) {
    /*
      Valida os campos no update do usuário
      Verifica se foi informado a senha antiga
      Caso tenha sido informado, confirma se é passado uma nova senha e
      se as novas senhas passadas são iguais.
    */
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup.string().min(6),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });

    // Se alguma validação retornar errado, ocorre erro.
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name, provide } = await user.update(req.body);

    return res.json({ id, name, email, provide });
  }
}

export default new UserController();
