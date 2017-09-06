// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
// import router from './router'
import VueRouter from 'vue-router';
import goods from './components/goods/goods';
import seller from './components/seller/seller';
import ratings from './components/ratings/ratings';
import "./common/stylus/index.styl";
import VueResource from "vue-resource";

Vue.use(VueRouter);
Vue.use(VueResource);

// Vue.config.productionTip = false

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   // router,
//   // VueRouter,
//   template: '<App/>',
//   components: { App }
// })
// let app = Vue.extend(App);

const routes = [
  {path: '/',component: goods},
  {path: '/goods',component: goods},
  {path: '/seller',component: seller},
  {path: '/ratings',component: ratings}
];

const router = new VueRouter({
	routes
});



const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
// router.map({
// 	'/goods': {
// 		component: goods
// 	},
// 	'/seller': {
// 		component: seller
// 	},
// 	'/ratings': {
// 		component: ratings
// 	}
// });


// router.start(app,'#app');
