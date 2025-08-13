import { HttpCode } from '../config/constants.ts';
import { IController } from '../interfaces/interface_controlers.ts';
import { contactBymailService } from '../services/contactme.ts';
import { sendContactMail } from '../utils/sendMail.ts';

export const contactMeByEmailController: IController = async (req, res) => {
  const { name, email, text } = req.body;

  const data = await contactBymailService();
  await sendContactMail({ name, email, text, superUserEmail: data.contact_email });
  res.status(HttpCode.OK).send();
};
