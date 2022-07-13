import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'

import App from './App.vue'

import 'uno.css'
import './base.scss'

export function createApp() {
  const app = createSSRApp(App)

  return {
    app,
    Pinia,
  }
}
