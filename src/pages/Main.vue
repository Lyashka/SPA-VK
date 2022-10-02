<template>
    <div>
      <div class="app__btns">
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
                          :dataFriends="dataFriends">
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
  import axios from 'axios'
  import FriendsListVue from '@/components/FriendsList.vue'
  import MyButton from '@/components/UI/MyButton.vue'
  import MySelect from '@/components/UI/MySelect.vue'
  import MyWindowFriendListVue from '@/components/UI/MyWindowFriendList.vue'
  import { jsonp } from 'vue-jsonp'
  
  
  export default {
    components:{
      FriendsListVue,
      MyWindowFriendListVue,
      MyButton,
      MySelect,
    },
    data(){
      return{
        offsetValue: 0,
        MyAccessToken: 'vk1.a.CpeajMIsN5yamRyraL0EQrh-zrTxiXZJ8GvwkzebCpmlqHU11oBAVUtC7rVOdMiUvUqfHiFTPGjlJtLpOEEBLP4CsCHp_1jQi8eaz29aNFmhgK1cEoM8j0-WKqdkvlxCt68q7O_gBr76JWaYwM93--1FE8FKR8M76dGE76EOIftM2WtbQJB4iC_NNOUlsTv0',
        dataFriends: [],
        windowVisible: false,
        selectedSort: '',
        sortoption: [
          {value:'', name: 'Все'},
          {value: 'first_name', name: 'По имени'},
          {value: 'last_name', name: 'По фамилии'}
        ],
        SOURCE_UID: '213743757',
        TARGET_UID: '135643350',
        mutualFriendsCount: [],
        newData: {},
      }
      
    },
    methods: {  
  
      buildListFriends(){
          this.requestFriendlList();
          this.selectedSort = ''
      },
      requestFriendlList(){
        jsonp('https://api.vk.com/method/friends.search?',
              {
                count: '15',
                // offset: '15',
                fields:"photo_50",
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.dataFriends = res.response.items;
                console.log(this.dataFriends);
                localStorage.setItem('dataFriends', JSON.stringify(this.dataFriends))
                this.requestMutualFriends()
              })
              
            
        
        
            
      },
      requestMutualFriends(){

        
        // jsonp('https://api.vk.com/method/friends.getMutual?',
        // {
        //   source_uid: '213743757',
        //   target_uid: `${item.id}`,
        //   v: '5.131',
        //   access_token: this.MyAccessToken
        // }).then(res => {
        //     this.mutualFriendsCount = res.response.length
        //     console.log(this.mutualFriendsCount);
        // })
        
        //   console.log('f');
        //   jsonp('https://api.vk.com/method/friends.getMutual?',
        // {
        //   source_uid: '213743757',
        //   target_uid: `${element.id}`,
        //   v: '5.131',
        //   access_token: this.MyAccessToken
        // }).then(res => {
        //     this.mutualFriendsCount = res.response.length
        //     console.log(this.mutualFriendsCount);
        // })
          
        // this.dataFriends.forEach(element => {
        //   console.log('f');
        //   jsonp('https://api.vk.com/method/friends.getMutual?',
        // {
        //   source_uid: '213743757',
        //   target_uid: `${element.id}`,
        //   v: '5.131',
        //   access_token: this.MyAccessToken
        // }).then(res => {
        //     this.mutualFriendsCount = res.response.length
        //     console.log(this.mutualFriendsCount);
        // })
        // });
      },

      requestOffsetFriendList(){
        this.offsetValue += 15
        jsonp('https://api.vk.com/method/friends.search?',
              {
                count: '15',
                offset: String(this.offsetValue),
                fields:"photo_50",
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.newData = res.response.items;
                this.newData.forEach(element => {
                  this.dataFriends.push(element)
                });
                localStorage.setItem('dataFriends', JSON.stringify(this.dataFriends))
                console.log(this.dataFriends);
              })
      }
    },
  
    mounted() {
          this.dataFriends = JSON.parse(localStorage.getItem('dataFriends'))  

          // jsonp('https://oauth.vk.com/access_token?', {
          //   client_id: '51428350',
          //   client_secret: 'QIjLmhKbH14AsJYgL2mW',
          //   redirect_uri: 'http://localhost:8080/',
          //   code: 'vk1.a.CpeajMIsN5yamRyraL0EQrh-zrTxiXZJ8GvwkzebCpmlqHU11oBAVUtC7rVOdMiUvUqfHiFTPGjlJtLpOEEBLP4CsCHp_1jQi8eaz29aNFmhgK1cEoM8j0-WKqdkvlxCt68q7O_gBr76JWaYwM93--1FE8FKR8M76dGE76EOIftM2WtbQJB4iC_NNOUlsTv0',
          //   v: 'v=5.131',
          // }).then(res => {
          //   console.log(res);
          // })
              
      },
    watch: {
      selectedSort(newValue){
        if(newValue != ''){
          this.dataFriends.sort( (friend1, friend2) => {
            return friend1[newValue]?.localeCompare(friend2[newValue])
        })
        }else{
              this.requestFriendlList()
        }     
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
  