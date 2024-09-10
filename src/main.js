// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap"

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPhone)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
