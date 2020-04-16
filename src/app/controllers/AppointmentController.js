import * as yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

// import pt from 'date-fns/locale/pt';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(appointments);
  }

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

    if (req.userId === provider_id) {
      return res.status(401).json({ error: 'User logged is equal provider!' });
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

    // Verifica se não tem agendamento para o horário marcado.
    if (isAvailabilityDate) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available!' });
    }

    // Caso passe nas validações, o agendamento é criado.
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    const user = await User.findByPk(req.userId);
    const formattedDate = format(
      hourStart,
      "MMMM dd 'at' H:mm"
      // locale: pt  (para deixar formatado em português)
    );

    await Notification.create({
      content: `New appointment of ${user.name} for the ${formattedDate}`,
      user: provider_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment!",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance!',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
