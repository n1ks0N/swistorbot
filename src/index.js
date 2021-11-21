const { Telegraf, Markup } = require('telegraf')

const { openMap, move } = require('./map/map')

// Start commands
// Test API key
const bot = new Telegraf('2102861921:AAHHYJSC6l0ZmtkRny2J3CH6HUdM66TlukA')
bot.start((ctx) => {
  ctx.reply(
    `Привет, ${ctx.message.from.first_name}!\nЭто тестовая версия игры Swords History!`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Пройти обучение', 'Пройти обучение')],
      [Markup.button.callback('Начать играть', 'Начать играть')]
    ])
  )
})

const state = {

}

const menu = (ctx) => {
  ctx.reply(`{username}, {lvl} уровень ({xp}/{needXp} опыта)\nВы находитесь в {location}\nВаши задания: {tasks}\nГлавное меню:\nКарта - /map`,
  Markup.inlineKeyboard([
    [Markup.button.callback('Карта мира', 'Карта мира')]
  ])
)
}

bot.hears('Начать играть', (ctx) => {
  menu(ctx)
})
bot.action('Начать играть', (ctx) => {
  menu(ctx)
})

// Start Map system
bot.hears(['Карта', 'Карта мира', '/map'], (ctx) => {
  openMap(ctx)
})
bot.action(['Карта', 'Карта мира', '/map'], (ctx) => {
  openMap(ctx)
})

// Moving
bot.hears(['Отправиться в другое место', '/move'], (ctx) => {
  ctx.reply(`Выберите место, в которое хотите отправиться:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Город Ахтиар — {time} минут', 'Город Ахтиар — {time} минут')],
      [Markup.button.callback('Замок Ленц — {time} минут', 'Замок Ленц — {time} минут')],
      [Markup.button.callback('Деревня Мелица — {time} минут', 'Деревня Мелица — {time} минут')]
    ])
  )
})
bot.action(['Отправиться в другое место', '/move'], (ctx) => {
  ctx.reply(`Выберите место, в которое хотите отправиться:`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Город Ахтиар — {time} минут', 'Город Ахтиар — {time} минут')],
      [Markup.button.callback('Замок Ленц — {time} минут', 'Замок Ленц — {time} минут')],
      [Markup.button.callback('Деревня Мелица — {time} минут', 'Деревня Мелица — {time} минут')]
    ])
  )
})

// To menu
bot.hears(['Выйти в главное меню', '/menu', 'Меню', 'меню'], (ctx) => {
  menu(ctx)
})
bot.action(['Выйти в главное меню', '/menu', 'Меню', 'меню'], (ctx) => {
  menu(ctx)
})

// Listen command
bot.on('text', (ctx) => {
  const message = ctx.message.text
  const messageTransformText = ctx.message.text.toLowerCase()
  // Move to another place: town, castle or village
  if (messageTransformText.includes('город') || messageTransformText.includes('замок') || messageTransformText.includes('деревня')) {
    move()
    ctx.reply(`Вы решили отправиться в ${message}\nЭто займёт {time} минут\n\nВы получитие уведомление в случае:\nПрибытия в ${message}\nНападения разбойников\nВстречи с путешественником`,
    Markup.inlineKeyboard([
      [Markup.button.callback('Вернуться обратно - {time} минут', 'Вернуться обратно - {time} минут')],
      [Markup.button.callback('Выйти в главное меню', 'Выйти в главное меню')],
    ])
    )
  }
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))