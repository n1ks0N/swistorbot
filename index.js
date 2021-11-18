const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const bot = new Telegraf('2102861921:AAHHYJSC6l0ZmtkRny2J3CH6HUdM66TlukA')
bot.start((ctx) => {
  ctx.reply(
    'Привет!'
  )
})
bot.launch()