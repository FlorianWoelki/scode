import App from './App.vue';
import './index.css';
import router from './router';
import { createApp } from 'vue';
import vuex from './store';

createApp(App).use(router).use(vuex).mount('#app');
