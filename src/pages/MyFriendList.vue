<template>
  <div class="container">
        <div class="search_container">
            <div class="searchFriend">
                <input type="text"  class="inputSearch" placeholder="Введите имя" v-model="inputId"/>
                <MyButton @click="searchFriend" class="searchBtn">Найти</MyButton>
            </div>
            <div>
                <MySearchWindow>
                    <PreLoader class="preLoader"  v-show="preLoaderVisiblde">

                    </PreLoader>
                   <searchFriendList  
                                      :dataSearchUser="dataSearchUser"
                                      @addUserInList="addUserInFriendList">
                   </searchFriendList>
                   <div class="userNotFound">
                    {{ userNotFound }}
                   </div>
                   
                </MySearchWindow>
                <div class="addFriendList" @click="requestOffsetFriendList" v-show="visibleAddFriendList">
                    <div>...</div> 
                </div>  
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
import PreLoader from '@/components/UI/PreLoader.vue'
export default {
    components:{
    MyWindowFriendListVue,
    MyButton,
    MySearchWindow,
    searchFriendList,
    myFriendListUsers,
    MySelect,
    PreLoader
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
            countOffsetSearchusers: 0,
            visibleAddFriendList: false,
            preLoaderVisiblde: false,
            userNotFound: ''
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
                    this.disabledSelect = 'disabled'
                }
        },
        
       async searchFriend(){

          console.log(typeof this.inputId);
          this.dataSearchUser = []
          this. countOffsetSearchusers = 0
          this.preLoaderVisiblde = true
          this.userNotFound = ''
          if (this.inputId === undefined || this.inputId == 0){
            this.dataSearchUser = []
            this.visibleAddFriendList = false
            this.preLoaderVisiblde = false
            console.log("Ошибка");
          }
          else{
            await jsonp('https://api.vk.com/method/users.search',{
              q: this.inputId,
              access_token: this.MyAccessToken,
              count: '8',
              v: '5.131',
              fields: "photo_50, screen_name",
            })
            .then(res => {
                 try {
                    if(res.response.items.length == 0){
                        this.userNotFound = 'Пользователь не найден...'
                    }       
                    this.requestUser = res.response.items
                    this.requestMutualFriends(this.requestUser)
                    this.visibleAddFriendList = true
                } 
                catch (error) {
                    console.log(error);
                    this.userNotFound = 'Произошла ошибка, попробуйте сделать запрос еще раз'
                    this.preLoaderVisiblde = false
                }
             
            })
          }
        },


        async requestMutualFriends(value){
            for (let item of value) {
               await jsonp('https://api.vk.com/method/friends.getMutual?',
              {
                source_uid: `${ this.userId}`,
                target_uid: `${item.id}`,
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                  this.valueMutual = res.response.length
                  item['mutual'] = this.valueMutual  
                  this.dataSearchUser.push(item) 
                  
                
              })
            };  
            this.preLoaderVisiblde = false
        },

        async requestOffsetFriendList(){
            this.countOffsetSearchusers += 8
            await jsonp('https://api.vk.com/method/users.search',{
              q: this.inputId,
              access_token: this.MyAccessToken,
              count: '8',
              offset: String(this.countOffsetSearchusers),
              v: '5.131',
              fields: "photo_50",
            })
            .then(res => {
              this.requestMutualFriends(res.response.items)
            })
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
    /* align-items: center; */
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
    align-items: flex-start;
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
.addFriendList{
  margin: auto;
  margin-top: 5px;
  margin-bottom: 20px;
  width: 350px;
  height: 25px;
  background-color:aliceblue;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px  rgba(0, 0, 0, 0.258);
  border-radius: 6px;
}
.addFriendList:hover{
    background-color: rgb(196, 217, 234);
}
.preLoader{
  position:absolute;
  margin-top: 100px;
  margin-left: 130px;
}
.userNotFound{
    margin-left: 10px;
}
</style>