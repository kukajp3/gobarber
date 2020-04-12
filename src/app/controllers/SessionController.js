import jwt from 'jsonwebtoken';
import * as yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
  async store(req, res) {
    // Valida os campos do usuário na sessão.
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    // Se alguma validação retornar errado, ocorre erro.
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fail!' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = user;

    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.experisIn,
      }),
    });
  }
}

export default new SessionController();
