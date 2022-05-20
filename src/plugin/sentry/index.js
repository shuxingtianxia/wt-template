import Vue from 'vue'
// sentry
import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

import router from '@/router'

Sentry.init({
  Vue,
  dsn: 'http://9bc9e3878a894a8bbac9516369b77a58@192.168.56.101:9000/2',
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracingOrigins: ['localhost', 'my-site-url.com', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})
