import App from '@/App'
import { def } from '@vue/shared'
import { createRouter, createWebHistory } from 'vue-router'
import ProfileFriend from '@/pages/ProfileFriend.vue'
import Main from '@/pages/Main'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/profile/:id',
        component: ProfileFriend
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;