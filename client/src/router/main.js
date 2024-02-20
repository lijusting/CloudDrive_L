import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Drive from '../page/drive.vue'
import allfile from '../components/allfile.vue'
import txtpre from '../components/txtpre.vue'
import radiopre from '../components/radiopre.vue'
import docxpre from '../components/docxpre.vue'
import xlsxpre from '../components/xlsxpre.vue'
import pptxpre from '../components/ppxtpre.vue'
import pdfpre from '../components/pdfpre.vue'
import imgpre from '../components/imgpre.vue'
import videopre from '../components/videopre.vue'
import officelist from '../components/officelist.vue'
import radiolist from '../components/radiolist.vue'
import videolist from '../components/vediolist.vue'
import imglist from '../components/imglist.vue'
import test from '../components/test.vue'
import admin from '../components/admin.vue'
import filelist from '../components/filelist.vue'
import userlist from '../components/userlist.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/test',
            name: 'test',
            component: test
        },
        {
            path: '/drive',
            name: 'drive',
            component: Drive,
            redirect: '/drive/allfile',
            children: [{
                path: 'allfile',
                name: 'allflie',
                component: allfile,
            },
            {
                path: 'videolist',
                name: 'videolist',
                component: videolist,
            },
            {
                path: 'radiolist',
                name: 'radiolist',
                component: radiolist,
            },
            {
                path: 'officelist',
                name: 'officelist',
                component: officelist,
            },
            {
                path: 'imglist',
                name: 'imglist',
                component: imglist,
            },
            ]
        },

        {
            path: '/txtpre',
            name: 'txtpre',
            component: txtpre,
        },
        {
            path: '/radiopre',
            name: 'radiopre',
            component: radiopre
        },
        {
            path: '/videopre',
            name: 'vediopre',
            component: videopre
        },
        {
            path: '/docxpre',
            name: 'docxpre',
            component: docxpre
        },
        {
            path: '/xlsxpre',
            name: 'xlsxpre',
            component: xlsxpre,
        },
        {
            path: '/pptxpre',
            name: 'pptxpre',
            component: pptxpre,

        },
        {
            path: '/pdfpre',
            name: 'pdfpre',
            component: pdfpre
        },
        {
            path: '/imgpre',
            name: 'imgpre',
            component: imgpre
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            redirect: '/admin/userlist',
            children: [
                {
                    path: 'userlist',
                    name: "userlist",
                    component: userlist,

                },
                {
                    path: 'filelist',
                    name: "filelist",
                    component: filelist
                },

            ]
        }
    ]
})
//  校验登录
router.beforeEach((to, from, next) => {
    if (to.name === 'drive') {
        if (!sessionStorage.username) {
            window.alert('您的登录信息无效或过期，请重新登录')
            return window.location.replace('/')
        } else {
            next()
        }
    } else {
        next()
    }
})



// ...（其他代码省略）

router.beforeEach((to, from, next) => {
    if (to.path === 'admin') {
        if (sessionStorage.getItem('username') === 'root') {
            next();
        } else {
            // 在组件内部，可以使用 this.$message 提示用户
            // 但在导航守卫中，需要手动创建 Vue 实例并使用 $message 方法
            new Vue().$message({
                message: '请用管理员登录',
                type: 'warning',
            });
            next(false);
        }
    } else {
        next();
    }
});

export default router;





