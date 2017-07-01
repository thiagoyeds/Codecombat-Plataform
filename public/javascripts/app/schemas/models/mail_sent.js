require.register("schemas/models/mail_sent", function(exports, require, module) {
var MailSentSchema, c;

c = require('./../schemas');

MailSentSchema = c.object({
  title: 'Sent mail',
  description: 'Emails which have been sent through the system'
});

_.extend(MailSentSchema.properties, {
  mailTask: c.objectId({}),
  user: c.objectId({
    links: [
      {
        rel: 'extra',
        href: '/db/user/{($)}'
      }
    ]
  }),
  sent: c.date({
    title: 'Sent',
    readOnly: true
  }),
  metadata: c.object({}, {})
});

c.extendBasicProperties(MailSentSchema, 'mail.sent');

module.exports = MailSentSchema;
});

;
//# sourceMappingURL=/javascripts/app/schemas/models/mail_sent.js.map