import Vue from 'vue';
import Router from 'vue-router';
import Signin from '../components/signin';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin,
    },
  ],
});
