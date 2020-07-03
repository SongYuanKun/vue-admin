import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import User from './views/nav1/User.vue'
import Form from './views/nav1/Form.vue'
import Appointment from './views/nav1/Appointment.vue'
import Article from './views/article/article.vue'
import ArticleAddOrUpdate from './views/article/article-add-or-update.vue'
import Category from './views/category/category.vue'
import MyTag from "./views/tag/my-tag.vue";
import Recommend from "./views/recommend/recommend.vue";
import Article2WeChat from "./views/article/Article2WeChat";
import Test from "./views/Test";

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
    {
        path: '/test',
        component: Test,
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
            {path: '/main', component: Main, name: '主页', hidden: true},
            {path: '/user', component: User, name: '用户'},
            {path: '/form', component: Form, name: 'Form', hidden: true},
            {path: '/appointment', component: Appointment, name: '预约列表'},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '博文管理',
        iconCls: 'fa fa-file-text-o',
        children: [
            {path: '/article-add-or-update', component: ArticleAddOrUpdate, name: '新增博文'},
            {path: '/article', component: Article, name: '博文列表'},
            {path: '/Article2WeChat', component: Article2WeChat, name: '推送至微信'},
            {
                path: '/article/article/update/:id',
                component: ArticleAddOrUpdate,
                name: '博文修改',
                hidden: true
            },
        ]
    }, {
        path: '/',
        component: Home,
        name: '运营',
        iconCls: 'fa  fa-line-chart',
        children: [
            {path: '/category', component: Category, name: '分类'},
            {path: '/tag', component: MyTag, name: '标签'},
            {path: '/recommend', component: Recommend, name: '推荐'},
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;
