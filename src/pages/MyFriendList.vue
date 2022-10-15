<template>
  <div class="container">
        <div class="search_container">
            <div class="searchFriend">
                <input class="inputSearch" placeholder="Введите имя" v-model="inputId"/>
                <MyButton @click="searchFriend" class="searchBtn">Найти</MyButton>
            </div>
            <div>
                <MySearchWindow>

                </MySearchWindow>  
            </div>
        </div>
       
        <div class="container_inside">
            <MyWindowFriendListVue>

            </MyWindowFriendListVue>  
            <div class="btn_options">
                <MyButton >Построить</MyButton>
                <MyButton  @click="$router.push(`/`)" style="margin-top: 10px">Назад</MyButton>  
            </div>
             
        </div>
  </div>
</template>

<script>
import { jsonp } from 'vue-jsonp'
import MyWindowFriendListVue from '@/components/UI/MyWindowFriendList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySearchWindow from '@/components/UI/MySearchWindow.vue'
export default {
    components:{
        MyWindowFriendListVue,
        MyButton,
        MySearchWindow,
    },

    data(){
        return{
            inputId: undefined,
            userId: '',
            MyAccessToken: '',
        }
    },



    methods:{
        
        searchFriend(){
          if (this.inputId === undefined){
            return console.log("Ошибка");
          }
          else{
            jsonp('https://api.vk.com/method/users.get',{
              user_id: this.inputId,
              access_token: this.MyAccessToken,
              v: '5.131',
              fields: 'photo_200, sex, bdate, can_post',
            })
            .then(res => {
              console.log(res);
            })
          }
        }
    },

    mounted(){
        this.userId = localStorage.getItem('userId')
        this.MyAccessToken = localStorage.getItem('token')
    }
}
</script>

<style scoped>
.container{
    margin-top: 30px;
    display: flex;
    /* justify-content: center; */
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
}

.searchFriend{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.searchBtn{
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10px;
    width: 30px;
    font-size: 14px;
}
.inputSearch{
    height: 20px;
    
}
.container_inside{
    margin-top: 30px;
    display: flex;
    flex-direction: row;
}
/* .backBtn{
    margin-top: 0;
    margin-left: 10px;
} */
.search_container{ 
    margin-right: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.btn_options{
    margin-left: 10px;
    margin-top: 10px;
    flex-direction: column;
 
}
</style>