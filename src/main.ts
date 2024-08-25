import { createApp } from 'vue'
import App from './App.vue'
import Toast, { PluginOptions, POSITION } from 'vue-toastification'
import router from './router'
import store from './store'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue-toastification/dist/index.css'

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false,
}

createApp(App).use(store).use(router).use(Toast, options).mount('#app')
