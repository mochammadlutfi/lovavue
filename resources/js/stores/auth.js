import { defineStore } from 'pinia'
import router from '@/Router'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'
import { useApi } from '@/api/useApi';
import Cookies from 'js-cookie'
const web = useApi('web')
import axios from 'axios';
import { AbilityBuilder, createMongoAbility} from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';
import { inject } from 'vue';

const getJSONFromLocalStorage = (key) => {
    const value = window.localStorage.getItem(key);

    if (value === 'undefined' || value === 'null' || value === undefined || value === null) {
        return null;
    }
    else {
        return JSON.parse(value);
    }
};

export const useAuthStore = defineStore({
	id: 'auth',

	state: () => {
        return {
            user: null,
            token: Cookies.get('token'),
            permissions : [],
        }
    },

    getters : {
        isLoggedIn: (state) => {
            if (state.token === null || state.token === '' || state.token === undefined) {
                return false;
            }
            return true;
        },
        // can: (state)=>{
        //     return this.permissions.includes(permission);
        // }
    },

	actions: {
        async getUser(){
            const { data } = await axios.get('/profile');
            console.log(data);
            this.user = {
                name : data.name,
                username : data.username,
                email : data.email,
                role : data.roles[0].name,
                avatar : data.avatar
            };
            this.permissions = data.permissions;
        },
        updateUser(user) {
            this.user = user;
        },
        updateToken(token){
            this.token = token;
            Cookies.set('token', token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        },
        hasPermission(permission){
            if (typeof permission === 'string' || permission instanceof String) {
                return this.permissions.includes(permission);
            } else {
                return permission.every((v) => this.permissions.includes(v));
            }
        },
		async login({ email, password }) {
			const user = useUserStore()
			try {
				await web.post('/login', { email, password })
				this.updateState({ email, isLoggedIn: true })
				await user.storeInfo()
				await router.push({ name: 'login' });
			} catch (error) {
				console.log('Error at login: ', error.message)
				throw error
			}
		},
		async register(props) {
			const user = useUserStore()
			try {
				await web.post('/register', props)
				this.updateState({ email: props.email, isLoggedIn: true })
				await user.storeInfo()
			} catch (error) {
				console.log('Error at register: ', error.message)
				throw error
			}
		},
		async forgotPassword({ email }) {
			try {
				await web.post('/forgot-password', { email })
			} catch (error) {
				console.log('ERROR WITH FORGOT-PASSWORD ENDPOINT: ', error.message)
				throw error
			}
		},

		async logout() {
			const user = useUserStore()
			const router = useRouter();
            Cookies.remove('token');
			this.$reset()
			user.$reset()

			try {
				await axios.post('/logout');
				await router.push({ name: 'login' });
			} catch (error) {
				window.location.pathname = '/login'
			}
		},
	},
})