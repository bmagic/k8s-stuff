const MAILJET_API_KEY = process.env.MAILJET_API_KEY
const MAILJET_API_SECRET = process.env.MAILJET_API_SECRET
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS

module.exports.sendMail = async function (subject, body) {
  const Mailjet = require('node-mailjet').connect(MAILJET_API_KEY, MAILJET_API_SECRET)
  const sendEmail = Mailjet.post('send')

  const emailData = {
    'FromEmail': 'noreply@vodalys.com',
    'FromName': 'K8S Manager',
    'Subject': subject,
    'Text-part': body,
    'Recipients': [{'Email': EMAIL_ADDRESS}]
  }

  await sendEmail.request(emailData)
}
