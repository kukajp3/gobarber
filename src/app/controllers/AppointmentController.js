import * as yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';

class AppointmentController {
  async store(req, res) {
    const schema = yup.object().shape({
      provider_id: yup.number().required(),
      date: yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { provider_id, date } = req.body;

    // Verifica se o usuário é um provedor de serviço.
    const isProvider = await User.findOne({
      where: { id: provider_id, provide: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers!' });
    }

    const hourStart = startOfHour(parseISO(date));

    // Verifica se a data passada é menor que a data atual, caso seja, é retornado um erro.
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted!' });
    }

    const isAvailabilityDate = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (isAvailabilityDate) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available!' });
    }

    // Caso passe nas verificações, o serviço é criado.
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
