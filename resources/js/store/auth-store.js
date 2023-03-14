import {defineStore} from "pinia";
import {api} from "../api/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        email: '',
        password: '',
        remember: false,
        user: null,
    }),

    getters: {

    },

    actions: {
        login(){
            return api.post('/api/login', {
                email: this.email,
                password: this.password
            }).then(response => {
                this.email = '';
                this.password = '';
            })
        },

        profile() {
            return api.get('/api/profile')
                .then(response => {
                    this.user = response.data;
                })
        }
    }
})
