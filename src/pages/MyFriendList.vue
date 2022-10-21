<template>
  <div class="container">
        <div class="search_container">
            <div class="searchFriend">
                <input class="inputSearch" placeholder="Введите id/userName" v-model="inputId"/>
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
       
        <div class="container_rigth_window">
            <div class="selectStyle">
                <MySelect 
                        :class="disabledSelect"
                        v-model="selectedSort"
                        :options="sortoption"
                        v-show="true"
                        style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">        
                </MySelect>
            </div>
        <div class="container_inside">
            <MyWindowFriendListVue>
                <myFriendListUsers  v-if="friendList.length > 0"
                                    :friendList="friendList"
                                    @removeUser="removeUserInFriendList">
                </myFriendListUsers>

                <div class="text_Content" v-else-if="friendList.length == 0">
                   {{ valueTextElse }} 
                </div>
                <div v-else>
                    Список пуст
                </div>
            </MyWindowFriendListVue>  
            <div class="btn_options">
                <MyButton @click="buildList" :class="disabledBtn">Построить</MyButton>
                <MyButton  @click="$router.push(`/`)" style="margin-top: 10px">Назад</MyButton>  
            </div>
             
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
import MySelect from '@/components/UI/MySelect.vue'
export default {
    components:{
        MyWindowFriendListVue,
        MyButton,
        MySearchWindow,
        searchFriendList,
        myFriendListUsers,
        MySelect,
    },

    data(){
        return{
            inputId: undefined,
            userId: '',
            MyAccessToken: '',
            requestUser: [],
            dataSearchUser: [],
            valueMutual: '',
            valueTextElse: '',
            // buildVisible: true,
            friendList: [],
            disabledBtn: 'all',

            selectedSort: '',
            sortoption: [
            {value: 'first_name', name: 'По имени'},
            {value: 'last_name', name: 'По фамилии'},
            {value: 'mutual', name: 'Общие друзья'}
            ],
            linkValue: '/',
            disabledSelect: 'disabled',
        }
    },



    methods:{
        buildList(){
            try {
                this.friendList = JSON.parse(localStorage.getItem('fiendList'))
                this.disabledSelect = 'all'
            } catch (error) {
                console.log(error);
            }
        },

        addUserInFriendList(user){
            if(JSON.parse(localStorage.getItem('fiendList')) !== null){
                this.friendList = JSON.parse(localStorage.getItem('fiendList'))
            }
                for(let i = 0; i < this.friendList.length; i++){
                   if(this.friendList[i].id === user.id){
                    return
                   }
                }
                this.friendList.push(user)
            
                
                localStorage.setItem('fiendList',  JSON.stringify(this.friendList))
                this.disabledSelect = 'all'
                if(this.friendList != '[]'){
                    this.disabledBtn = 'all'
                }  
               
        },

        removeUserInFriendList(user){
                this.friendList = this.friendList.filter(u => u.id !== user.id)
                localStorage.setItem('fiendList',  JSON.stringify(this.friendList))
                
                if(localStorage.getItem('fiendList') == '[]'){
                    localStorage.removeItem('fiendList')
                    this.valueTextElse = 'Список пуст'
                    this.disabledBtn = 'disabled'
                }
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
              fields: "photo_50, screen_name",
            })
            .then(res => {
              this.requestUser = res.response
              this.requestMutualFriends(this.requestUser)
              console.log(res.response);
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

    watch: {
    selectedSort(newValue){
        if(newValue != 'mutual'){
        this.friendList.sort( (friend1, friend2) => {
          return friend1[newValue]?.localeCompare(friend2[newValue])
          })
        }else if(newValue == 'mutual'){
          this.friendList.sort((friend1, friend2)=> {
          return friend2.mutual - friend1.mutual  
          }) 
        }
    }
  },
    
    mounted(){
        this.linkValue = '/friendList'
        localStorage.setItem('linkValue', this.linkValue)

        if(this.friendList == []  || localStorage.getItem('fiendList') == null || JSON.parse(localStorage.getItem('fiendList') == [] )){
            this.valueTextElse = 'Список пуст'
            this.disabledBtn = 'disabled'
        }
        else if(JSON.parse(localStorage.getItem('fiendList')) != [] || this.friendList != []){
            this.valueTextElse = 'Нажмите "Построить"'
            this.disabledBtn = 'all'
        }   
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
    /* margin-top: 30px; */
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
.text_Content{
    padding-left: 10px;
    padding-top: 5px;
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.disabled{
    pointer-events: none;
    background-color: rgba(47, 60, 78, 0.218);
}
.container_rigth_window{
    display: flex;
    flex-direction: column;
}
.selectStyle{
  min-width: 80px;
  min-height: 20px;
  text-decoration: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content:flex-start;
  margin-left: 25px;
}
</style>