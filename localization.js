const messages = {
  en: {
    message: {
      hello: 'hello world',
      hello_user: 'hello {user}',
    },
  },
  ja: {
    message: {
      hello: 'こんにちは、世界',
      hello_user: 'こんにちは、{user}',
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
