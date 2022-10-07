<template>
    <div>
      <div class="app__btns">
        <div><my-button  ><a href="https://oauth.vk.com/authorize?client_id=51428350&display=page&redirect_uri=http://localhost:8080/&scope=friends&response_type=token&v=v=5.131">Авторизировать</a></my-button></div>
          <div><my-button @click="buildListFriends">Построить</my-button></div>
          <div>
              <my-select v-model="selectedSort"
                          :options="sortoption"> 
  
              </my-select>
          </div>
      </div>
      <div class="container">
          <div>
              <my-window-friend-list-vue >
                <friends-list-vue class="list_content" 
                          v-show="true"
                          :localStorageDataFriend="localStorageDataFriend"
                          >
                          
                              
                </friends-list-vue>
              </my-window-friend-list-vue>
          </div>
      </div>
      <div class="addFriendList" @click="requestOffsetFriendList">
        <div>...</div> 
      </div>
     
    </div>
    
  </template>
  
  <script>
    
  import Vue from 'vue'
  import axios from 'axios'
  import FriendsListVue from '@/components/FriendsList.vue'
  import MyButton from '@/components/UI/MyButton.vue'
  import MySelect from '@/components/UI/MySelect.vue'
  import MyWindowFriendListVue from '@/components/UI/MyWindowFriendList.vue'
  import { jsonp } from 'vue-jsonp'
  import VKAuth from '@dyadikov/vue-vk-oauth2'
//   new Vue(VKAuth, {apiId: 51428350,
//   widgets: [{
//     widget: 'ContactUs',
//     selector: 'vk_contact_us',
//     props: {text: 'Задайте свой вопрос'}
//   }]
// })
  
  export default {
    
    components:{
      FriendsListVue,
      MyWindowFriendListVue,
      MyButton,
      MySelect,
    },
    
    data(){
      return{
        offsetValueProfileFriend: 0,
        MyAccessToken: '',
        dataFriends: [],
        // windowVisible: false,
        selectedSort: '',
        sortoption: [
          // {value: '', name: 'Все'},
          {value: 'first_name', name: 'По имени'},
          {value: 'last_name', name: 'По фамилии'},
          {value: 'mutual', name: 'Общие друзья'}
        ],
        SOURCE_UID: '213743757',
        // TARGET_UID: '135643350',
        // mutualFriendsCount: [],
        localeStorageMutualFriends: [],
        newData: [],
        valueMutual: 0,
        dataFriendsAndMutual: [],
        localStorageDataFriend: [],

      }
      
    },
    methods: {  
      // vkLogin () {
      // $vkAuth.login()
      //   .then(response => {
      //     console.log('vklogin', response)
      //   })
      //   .catch(error => {
      //     console.error(error)
      //   })
      // },
      authUser(){
      //   axios.post('https://oauth.vk.com/access_token?client_id=51428350&client_secret=QIjLmhKbH14AsJYgL2mW&redirect_uri=http://localhost:8080/&code=cd6ab5e90ef8686fd0'
      //   //   'https://oauth.vk.com/access_token?',{
      //   // client_id: '51428350',
      //   // client_secret: 'QIjLmhKbH14AsJYgL2mW',
      //   // redirect_uri: 'http://localhost:8080/',
      //   // code: 'e6475c124b4f7943df', 
      //   // }
      //   )
      //  .then(res => console.log(res))

      },
      buildListFriends(){
          this.getUrlParam()
          // this.authUser()
          this.requestFriendlList();
          this.selectedSort = ''
      },
      requestFriendlList(){
        jsonp('https://api.vk.com/method/friends.search?',
              {
                count: '8',
                fields:"photo_50",
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.dataFriends = res.response.items;
                console.log(this.dataFriends);
                
                this.requestMutualFriends(this.dataFriends)
                
              })     
      },
      async requestMutualFriends(value){
        
          for (const item of value) {
         await jsonp('https://api.vk.com/method/friends.getMutual?',
        {
          source_uid: '213743757',
          target_uid: `${item.id}`,
          v: '5.131',
          access_token: this.MyAccessToken
        }).then(res => {
          this.valueMutual = res.response.length
            // this.mutualFriendsCount.push(this.valueMutual)
            item['mutual'] = this.valueMutual
            
            console.log(item);
            this.dataFriendsAndMutual.push(item)
        })
        
      };
      this.localStorageDataFriend = this.dataFriendsAndMutual
      console.log('this.dataFriendsAndMutual');
      console.log(this.localStorageDataFriend);
     
      
      localStorage.setItem('localStorageDataFriend', JSON.stringify(this.dataFriendsAndMutual))
      },

      requestOffsetFriendList(){
        this.dataFriendsAndMutual =  this.localStorageDataFriend 
        this.offsetValueProfileFriend = this.dataFriendsAndMutual.length + 8
        jsonp('https://api.vk.com/method/friends.search?',
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
       this.MyAccessToken = token
       console.log(this.MyAccessToken);
      }
     
    },
  
    mounted() {
      // this.getUrlParam()
      // console.log(window.location.href);
      // console.log(window.location.href.get('access_token'));
      // this.authUser()
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
        // else if(newValue == ''){
        //   console.log('d');
        //   this.dataFriendsAndMutual =  this.localStorageDataFriend 
        // }
      }
    }
  }
  </script>
  
  <style scoped>
  
  .container{
      /* margin-left: 60px; */
      display: flex;
      justify-content: center;
      
  }
  .app__btns{
     margin-left: auto;
     /* 545px */
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
    /* border-bottom: 1px solid black; */
    align-items: center;
    box-shadow: 1px 1px  rgba(0, 0, 0, 0.258);
    border-radius: 6px;
  }
  .addFriendList:hover{
    background-color:#0000003b;
  }
  
  </style>
  