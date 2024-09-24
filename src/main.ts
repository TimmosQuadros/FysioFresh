import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Import Vuetify styles
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons
import * as components from 'vuetify/components'; // Optionally import components
import * as directives from 'vuetify/directives'; // Optionally import directives

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App)

app.use(vuetify);
app.use(router)
app.mount('#app')
