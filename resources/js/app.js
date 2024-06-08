import './bootstrap';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './Router'
import '@/Plugins/axios';
import i18n from '@/Plugins/i18n';

// import { useAppBaseStore } from "@/stores/base";
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

// const appBase = useAppBaseStore();
// if(!appBase.initialized){
//     appBase.initApp();
// }

app.mount('#app')