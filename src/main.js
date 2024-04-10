import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'animate.css'
import App from './App.vue'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

import router from './router'

import './styles/styles.scss'

const pinia = createPinia()


createApp(App).use(router).use(FloatingVue).use(pinia).mount('#app')
