import nodemailter, { SendMailOptions } from 'nodemailer'

export const sendMail = async (mailOptions: SendMailOptions) => {
  const transporter = nodemailter.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail(mailOptions)
  } catch (e) {
    if (e instanceof Error) {
      return { success: false, message: e.message }
    }
  }
  return { success: true, message: '' }
}
