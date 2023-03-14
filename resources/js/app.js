import './bootstrap';
import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'
import 'uno.css'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'
import Router from "./router";
import Pinia from './store'
const app = createApp(App)
app.use(Pinia);
app.use(Router)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
app.mount('#app')
