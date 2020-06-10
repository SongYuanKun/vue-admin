import Vue from 'vue'
import App from './App'
import ElementUI, {Message, MessageBox} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;


//NProgress.configure({ showSpinner: false });

sessionStorage.setItem("env", "bai");

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    //NProgress.start();
    if (to.path === '/login') {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
    }
    let token = sessionStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next({path: '/login'})
    } else {
        next()
    }
});

new Vue({
    router,
    store,
    env,
    render: h => h(App)
}).$mount('#app');


