import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


function view(name) {
    return function (resolve) {
        require(['@/components/' + name + '.vue'], resolve);
    }
};

let router = new Router({
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
                {
                    name: 'user-edit',
                    path: ':id/edit',
                    component: view('admin/user/edit')
                },
            ]
        }, {
            path: '/admin/report',
            component: view('admin/Template'),
            canReuse: false,
            children: [
                {
                    name: 'report-home',
                    path: '',
                    component: view('admin/report/index')
                },
                {
                    name: 'report-goal-edit',
                    path: '/goal/:id/edit',
                    component: view('admin/report/editGoal')
                }
            ]
        }, {
            path: '/admin/choice',
            component: view('admin/Template'),
            canReuse: false,
            children: [
                {
                    name: 'choice-home',
                    path: '',
                    component: view('admin/choice/index')
                },
                {
                    path: 'add',
                    name: 'choice-add',
                    component: view('admin/choice/add')
                },
                {
                    path: ':id/edit',
                    name: 'choice-edit',
                    component: view('admin/choice/edit')
                },
                {
                    path: ':id/view',
                    name: 'choice-view',
                    component: view('admin/choice/view')
                },
                {
                    path: ':id/add',
                    name: 'choice-children-add',
                    component: view('admin/choice/add')
                },
            ]
        },
        {
            path: '/admin/pig',
            component: view('admin/Template'),
            canReuse: false,
            children: [
                {
                    name: 'pig-home',
                    path: '',
                    component: view('farm/pig/index')
                }, {
                    name: 'pig-add',
                    path: 'add',
                    component: view('farm/pig/add')
                }, {
                    name: 'pig-edit',
                    path: ':id/edit',
                    component: view('farm/pig/edit')
                }, {
                    name: 'pig-view',
                    path: ':id/view',
                    component: view('farm/pig/view')
                },
                {
                    name: 'pig-gen',
                    path: 'qrgen',
                    component: view('farm/pig/qrgen')
                },
                {
                    name: 'pig-card',
                    path: 'card',
                    component: view('farm/pig/card')
                },
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to.path);
    if (to.path != '/login') {
        // console.log("userstorage", localStorage.user, localStorage.getItem('user') == null)
        if (localStorage.getItem('user') == null) {
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router;
