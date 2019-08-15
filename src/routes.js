import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import User from './views/nav1/User.vue'
import Form from './views/nav1/Form.vue'
import Appointment from './views/nav1/Appointment.vue'
import Page4 from './views/nav2/Page4.vue'
import Article from './views/article/article.vue'
import ArticleAddOrUpdate from './views/article/article-add-or-update.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import article from "./views/article/article";

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '基础功能',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/user', component: User, name: '用户' },
            { path: '/form', component: Form, name: 'Form', hidden: true },
            { path: '/appointment', component: Appointment, name: '预约列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '博文管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/article-add-or-update', component: ArticleAddOrUpdate, name: '新增博文' },
            { path: '/article', component: Article, name: '博文列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
