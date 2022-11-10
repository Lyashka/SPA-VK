<template>
  <div class="main-container">
    <div>
    <div class="app__btns">
        <!-- <div><my-button class="text_content" @click="buildListFriends" v-show="buildBtnVisible">Начать работу</my-button></div> -->
        
        <div>
            <my-select class="text_content" v-model="selectedSort"
                        :options="sortoption"
                        v-show="visibleSelect">        
            </my-select>
        </div>
    </div>
        
    <div class="container">
        <div>
            <my-window-friend-list-vue v-show="VkFriendList">
              
                  <friends-list-vue
                        v-show="true"
                        :localStorageDataFriend="localStorageDataFriend"
                        >     
                  </friends-list-vue>
                  <PreLoader class="preLoader" v-show="visiblePreLoader">

                  </PreLoader>
            </my-window-friend-list-vue>
        </div>
        
    </div>

    <div class="addFriendList" @click="requestOffsetFriendList">
      <div>{{ offsetBtn }}</div> 
    </div>
   
    <my-sign-in-vue v-model:show="signInWindowVisible">
          <h4 class="text_content">Войти в приложение</h4>
          <div class="signIn_container"><a class="text_content"  href="https://oauth.vk.com/authorize?client_id=51428350&display=popup&redirect_uri=http://localhost:8080/SPA-VK/&scope=offline,friends&users&response_type=token&v=v=5.131"><my-button class="signInBtn" @click="showWindowHide">Войти</my-button></a></div>
    </my-sign-in-vue>
    

    </div>

    <div class="handlerBtn">
        <my-button class="text_content" @click="$router.push(`/friendList`)" style="margin-top: 10px" v-show="visibleBtnListFriend">Список друзей</my-button>
        <my-button class="text_content" style="margin-top: 10px" @click="exitCkick">Выйти</my-button>
    </div>
  </div>
  
</template>

<script>
  
import FriendsListVue from '@/components/FriendsList.vue'
import MyButton from '@/components/UI/MyButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyWindowFriendListVue from '@/components/UI/MyWindowFriendList.vue'
import MySignInVue from '@/components/UI/MySignIn.vue'
import { jsonp } from 'vue-jsonp'
import PreLoader from '@/components/UI/PreLoader.vue'


export default {
  
  components:{
  FriendsListVue,
  MyWindowFriendListVue,
  MyButton,
  MySelect,
  MySignInVue,
  PreLoader,
},
  
  data(){
    return{
      inputId: undefined,
      offsetValueProfileFriend: 0,
      offsetBtn: '...',
      MyAccessToken: '',
      dataFriends: [],
      selectedSort: '',
      sortoption: [
        {value: 'first_name', name: 'По имени'},
        {value: 'last_name', name: 'По фамилии'},
        {value: 'mutual', name: 'Общие друзья'}
      ],
      source_uid_user: '',
      localeStorageMutualFriends: [],
      newData: [],
      valueMutual: 0,
      dataFriendsAndMutual: [],
      localStorageDataFriend: [],
      signInWindowVisible: true,
      buildBtnVisible: true,
      visiblePreLoader: false,
      visibleFriendList: false,
      VkFriendList: true,
      visibleBtnListFriend: false,
      visibleSelect: false,
      linkValue: '/'
    }
    
  },
  methods: { 
   

    exitCkick() {
      this.buildBtnVisible = true
      localStorage.clear();
      location.reload()
    },

    showWindowHide(){
      this.signInWindowVisible = false;
      localStorage.setItem('signInWindowVisible', this.signInWindowVisible)
    },  


    buildListFriends(){
        // this.getUrlParamUserId()
        // this.getUrlParam()
        // this.requestFriendlList();
        // this.selectVisible = true,
        // this.selectedSort = ''
        // this.buildBtnVisible = false
        // localStorage.setItem('buildBtnVisible', this.buildBtnVisible)
        // this.visibleBtnListFriend = true
        // localStorage.setItem('visibleBtnListFriend', this.visibleBtnListFriend)
        // this.visibleSelect = true
        // localStorage.setItem('visibleSelect', this.visibleSelect)
    },

    requestFriendlList(){
      this.visiblePreLoader = true
      jsonp('https://api.vk.com/method/friends.search?',
            {
              count: '8',
              fields:"photo_50",
              v: '5.131',
              access_token: this.MyAccessToken
            }).then(res => {
              this.dataFriends = res.response.items;
              this.requestMutualFriends(this.dataFriends)
            })
    },

    async requestMutualFriends(value){
        for (const item of value) {
       await jsonp('https://api.vk.com/method/friends.getMutual?',
      {
        source_uid: `${this.source_uid_user}`,
        target_uid: `${item.id}`,
        v: '5.131',
        access_token: this.MyAccessToken
      }).then(res => {
        this.valueMutual = res.response.length
          item['mutual'] = this.valueMutual
          this.dataFriendsAndMutual.push(item)           
      })
    };
    this.visiblePreLoader = false
    this.localStorageDataFriend = this.dataFriendsAndMutual
    localStorage.setItem('localStorageDataFriend', JSON.stringify(this.dataFriendsAndMutual))
    },

    async requestOffsetFriendList(){
      this.offsetBtn='...'
      this.dataFriendsAndMutual = this.localStorageDataFriend 
      this.offsetValueProfileFriend = this.dataFriendsAndMutual.length + 8

       await jsonp('https://api.vk.com/method/friends.search?',
            {
              count: '8',
              offset: String(this.offsetValueProfileFriend),
              fields:"photo_50",
              v: '5.131',
              access_token: this.MyAccessToken
            }).then(res => {
              this.newData = res.response.items;
              this.requestMutualFriends(this.newData)
            })
    },

    getUrlParam(){
      const url = window.location.href
     const token = url.match(/(?:#|#.+&)access_token=([^&]+)/)[1]
     localStorage.setItem('token', token)
     this.MyAccessToken = token
    },

    getUrlParamUserId(){
    const url = window.location.href
     const userId = url.match(/(?:#|#.+&)user_id=([^&]+)/)[1]
    localStorage.setItem('userId', userId)
    this.source_uid_user = userId
    },

  },

  mounted() {
    this.signInWindowVisible = localStorage.getItem('signInWindowVisible')
    console.log(this.signInWindowVisible);

    this.linkValue = '/'
    localStorage.setItem('linkValue', this.linkValue)

    this.visibleSelect = localStorage.getItem('visibleSelect')
    this.visibleBtnListFriend = localStorage.getItem('visibleBtnListFriend')

    this.buildBtnVisible = localStorage.getItem('buildBtnVisible')
    if (this.buildBtnVisible == null){
      this.buildBtnVisible = true
    }else{
      this.buildBtnVisible = false
    }

    
    this.MyAccessToken = localStorage.getItem('token')
    this.source_uid_user = localStorage.getItem('userId')

    if(this.signInWindowVisible == null){
      this.signInWindowVisible = true
    }
    else if(this.signInWindowVisible == 'false'){
        if(localStorage.getItem('token') == null || localStorage.getItem('userId') == null){
          this.getUrlParamUserId()
          this.getUrlParam()
          this.requestFriendlList();
        }
        this.selectVisible = true,
        this.selectedSort = ''
        this.buildBtnVisible = false
        localStorage.setItem('buildBtnVisible', this.buildBtnVisible)
        this.visibleBtnListFriend = true
        localStorage.setItem('visibleBtnListFriend', this.visibleBtnListFriend)
        this.visibleSelect = true
        localStorage.setItem('visibleSelect', this.visibleSelect)
    }
    else{
       
    }

    this.localStorageDataFriend = JSON.parse(localStorage.getItem('localStorageDataFriend'))   
    },

  watch: {
    selectedSort(newValue){
        if(newValue != 'mutual'){
        this.localStorageDataFriend.sort( (friend1, friend2) => {
          return friend1[newValue]?.localeCompare(friend2[newValue])
          })
        }else if(newValue == 'mutual'){
          this.localStorageDataFriend.sort((friend1, friend2)=> {
          return friend2.mutual - friend1.mutual  
          }) 
        }
    }
  }
}
</script>

<style scoped>

.container{
    display: flex;
    justify-content: center;
    
}
.app__btns{
   margin-left: auto;
   margin-right: auto;
    margin-top: 15px; 
    margin-bottom: 15px;
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}
.addFriendList{
  margin: auto;
  margin-top: 5px;
  margin-bottom: 20px;
  width: 500px;
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
.signInBtn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  width: 250px;
  
}
.twxt_content{
  font-size: 20px;
 
}
.main-container{
  display: flex;
  justify-content: center;
}
.handlerBtn{
  margin-left: 20px;
  margin-top: 70px
}
.preLoader{
  margin-left: 200px;
  margin-top: 100px;
}
.text_content{
  min-width: 80px;
  min-height: 20px;
  text-decoration: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  justify-content: center;
}
.searchFriend{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
