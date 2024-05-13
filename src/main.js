import './assets/main.css'
import '@/assets/styles.scss';
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '../aura';   

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    // ripple: true,
    unstyled: true,
    pt: Aura
});
app.mount('#app')
