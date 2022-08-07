import { defineClientConfig } from '@vuepress/client';
import './index.css';
import Pwd from './components/pwd.vue';

export default defineClientConfig({
  enhance({ app, router }) {
    app.component('n-pwd', Pwd);

    router.beforeEach((to, from, next) => {
      const flag = globalThis.sessionStorage?.getItem('flag') || '';

      if (to.path !== '/') {
        if (flag === 'ndzy') {
          next();
        } else {
          next({ path: '/' });
        }
      } else {
        next();
      }
    });
  },
});
