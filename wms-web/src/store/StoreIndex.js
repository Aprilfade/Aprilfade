import { createStore } from 'vuex'

export default createStore({
    state: {
        menu: [],
        token: '',
        user: {}
    },
    mutations: {
        setMenu(state, menuList) {
            state.menu = menuList
        },
        SET_TOKEN(state, token) {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USER(state, user) {
            state.user = user
            sessionStorage.setItem("user", JSON.stringify(user))
        }
    },
    getters: {
        getMenu(state) {
            return state.menu
        },
        getUser(state) {
            return state.user
        }
    }
    // 注意：如果之前使用了 vuex-persistedstate 插件，也需要确保其与 Vuex 4 兼容
})