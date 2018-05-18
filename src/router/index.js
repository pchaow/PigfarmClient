import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


function view(name) {
    return function (resolve) {
        require(['@/components/' + name + '.vue'], resolve);
    }
};

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: view('Home')
        }, {
            path: '/login',
            name: 'Login',
            component: view('Login')
        }, {
            path: '/admin',
            component: view('admin/Template'),
            children: [
                {
                    path: '/',
                    name: 'admin-home',
                    component: view('admin/Home')
                }
            ],
        }, {
            path: '/admin/role',
            component: view('admin/Template'),
            children: [
                {
                    name: 'role-home',
                    path: '/',
                    component: view('admin/role/index')
                },
            ]
        }, {
            path: '/admin/user',
            component: view('admin/Template'),
            children: [
                {
                    name: 'user-home',
                    path: '',
                    component: view('admin/user/index')
                },
                {
                    name: 'user-add',
                    path: 'add',
                    component: view('admin/user/add')
                },
            ]
        }
    ]
})
