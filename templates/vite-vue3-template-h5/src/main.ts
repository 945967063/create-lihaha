import { createApp } from 'vue';
import { initializeDarkMode } from '@/utils/dark-mode';
import App from './App.vue';
import '@/assets/styles/tailwind.css';
import '@/assets/styles/index.scss';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import i18n from './locales/index';
import router from '@/router';
initializeDarkMode();
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');
