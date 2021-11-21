const { Markup } = require('telegraf')

const openMap = (ctx) => {
  ctx.reply(`Вы находитесь в {location}\nКарта мира:\n{img}`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Отправиться в другое место', 'Отправиться в другое место')]
    ])
  )
}

const move = (ctx) => {
  
}

module.exports = { openMap, move }