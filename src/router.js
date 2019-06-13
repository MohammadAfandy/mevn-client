import Vue from 'vue';
import Router from 'vue-router';
import PlayersComponent from './components/PlayersComponent.vue'
import HelloWorld from './components/HelloWorld.vue'
import AlternatifsComponent from './components/AlternatifsComponent.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/player',
      name: 'Players',
      component: PlayersComponent,
    },
    {
      path: '/helloworld',
      name: 'Hello',
      component: HelloWorld,
    },
    {
      path: '/alternatif',
      name: 'Alternatif',
      component: AlternatifsComponent,
    },
  ],
});