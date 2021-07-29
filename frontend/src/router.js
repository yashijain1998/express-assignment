export default [
    {
       name:'home',
       path:'/' ,
       component: () => import("./views/HomePage.vue"),
    },
    {
        name:'userRegion',
        path:'/user/:uname/:region',
        component: () => import('./views/userRegion.vue'),
    },
    {
        name:'CityWeather',
        path: '/user/:uname/:region/:city',
        component: () => import('./views/cityWeather.vue'),
    },
    {
        name:'addNewGroup',
        path: '/user/addNewGroup',
        component: () => import('./views/addNewGroup.vue'),
    },
    {
        name:'newCity',
        path:'/user/addNewCity',
        component: () => import('./views/newCity.vue')
    },
    {
        name:'noGroup',
        path:'/user/:uname/:region',
        component: () => import('./views/noGroup.vue')
    }

]    