
import  { createStore } from 'vuex'


export default createStore({
    state:{
        access_token: 'hide for repo'
    },
    getters: {
        TOKEN: state => {
          return state.access_token
        }
    }

})