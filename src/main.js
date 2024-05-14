import './assets/main.css'
import '@/assets/styles.scss';
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import { VueFire, VueFireAuth } from 'vuefire';
import { firebaseApp } from './firebaseConfig/config';

import Aura from '../aura';   

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ConfirmationService)
app.use(ToastService);
app.use(DialogService)
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.use(PrimeVue, {
    ripple: true,
    unstyled: true,
    pt: Aura
});


app.mount('#app')
