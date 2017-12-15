const {events} = require('./core/constants')
const mailUtils = require('./utils/mail-utils')

module.exports.start = () => {
  global.emitter.on(events.send_mail, async (subject, body) => {
    await mailUtils.sendMail(subject, body)
  })
}
