<template>
  <div class="container">
        <div class="search_container">
            <div class="searchFriend">
                <input class="inputSearch" placeholder="Введите имя" v-model="inputId"/>
                <MyButton @click="searchFriend" class="searchBtn">Найти</MyButton>
            </div>
            <div>
                <MySearchWindow>
                   <searchFriendList :dataSearchUser="dataSearchUser"
                                      @addUserInList="addUserInFriendList">

                   </searchFriendList>
                </MySearchWindow>  
            </div>
        </div>
       

        <div class="container_inside">
            <MyWindowFriendListVue>
                <myFriendListUsers  v-if="friendList.length > 0"
                                    :friendList="friendList"
                                    @removeUser="removeUserInFriendList">

                </myFriendListUsers>
                <div v-else>
                    Список пуст
                </div>
            </MyWindowFriendListVue>  
            <div class="btn_options">
                <MyButton @click="buildList">Построить</MyButton>
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
import searchFriendList from '@/components/searchFriendList/searchFriendList.vue'
import myFriendListUsers from '@/components/myFriendListUsers/myFriendListUsers.vue'
export default {
    components:{
        MyWindowFriendListVue,
        MyButton,
        MySearchWindow,
        searchFriendList,
        myFriendListUsers,
    },

    data(){
        return{
            inputId: undefined,
            userId: '',
            MyAccessToken: '',
            requestUser: [],
            dataSearchUser: [],
            valueMutual: '',

            friendList: [],
            // friendlistForBuild: []
        }
    },



    methods:{
        buildList(){
            
        },

        addUserInFriendList(user){
                for(let i = 0; i < this.friendList.length; i++){
                   if(this.friendList[i].id === user.id){
                    return
                   }
                }
                this.friendList.push(user)
                console.log(this.friendList);
                localStorage.setItem('fiendList',  JSON.stringify(this.friendList))
        },

        removeUserInFriendList(user){
                this.friendList = this.friendList.filter(u => u.id !== user.id)
                localStorage.setItem('fiendList',  JSON.stringify(this.friendList))
        },
        
       async searchFriend(){
          if (this.inputId === undefined || this.inputId == 0){
            this.dataSearchUser = []
            console.log("Ошибка");
          }
          else{
            await jsonp('https://api.vk.com/method/users.get',{
              user_id: this.inputId,
              access_token: this.MyAccessToken,
              v: '5.131',
              fields: "photo_50",
            })
            .then(res => {
              this.requestUser = res.response
            //   console.log(this.requestUser);
              this.requestMutualFriends(this.requestUser)
            })
          }
        },


        async requestMutualFriends(value){
            for (const item of value) {
               await jsonp('https://api.vk.com/method/friends.getMutual?',
              {
                source_uid: `${ this.userId}`,
                target_uid: `${item.id}`,
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.valueMutual = res.response.length
                  item['mutual'] = this.valueMutual
                  this.dataSearchUser = []
                  this.dataSearchUser.push(item) 
                
              })
            };
                  console.log(this.dataSearchUser);   
        },

    },



    mounted(){
        this.userId = localStorage.getItem('userId')
        this.MyAccessToken = localStorage.getItem('token')
        this.friendList = JSON.parse(localStorage.getItem('fiendList'))
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