const messages = {
  en: {
    message: {
      hello: 'hello',
      world: 'world',
      hello_world: '@.capitalize:message.hello @:message.world', // using linked
      hello_user: '@.capitalize:message.hello {user}',
      tos: 'Term of Service',
      term: 'I accept xxx {0}.',
    },
  },
  ja: {
    message: {
      hello: 'こんにちは',
      world: '世界',
      hello_world: '@.capitalize:message.hello、@:message.world',
      hello_user: '@.capitalize:message.hello、{user}',
      tos: '利用規約',
      term: '私は xxx の{0}に同意します。',
    },
  },
}

const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    },
  },
  ja: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
    long: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    },
  },
}

const numberFormats = {
  en: {
    currency: {
      style: 'currency',
      currency: 'USD',
    },
  },
  ja: {
    currency: {
      style: 'currency',
      currency: 'JPY',
      currencyDisplay: 'symbol',
    },
  },
}

const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  dateTimeFormats,
  numberFormats,
})
