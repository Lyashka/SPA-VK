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
        offsetValueProfileFriend: 0,
        MyAccessToken: 'vk1.a.XElOo9t47hkO7JEbU0jw_8Udn1mkotrGNaM1O0EiYSNe9aS22R0pLfsytTpl-ZowAp3i7BE44sf73uNjVm0IOhbF2T47tImjuc0c6HbEifgIR_VVao9goy4Wege-Ygcf-a-XowU5nflaI41j6J5YbvCI5Mwr43Wl8h5FReAwLaJPg-46GEEQoWQ561aESYH3',
        dataFriends: [],
        windowVisible: false,
        selectedSort: '',
        sortoption: [
          {value:'', name: 'Все'},
          {value: 'first_name', name: 'По имени'},
          {value: 'last_name', name: 'По фамилии'},
          {value: 'mutual', name: 'Общие друзья'}
        ],
        SOURCE_UID: '213743757',
        TARGET_UID: '135643350',
        mutualFriendsCount: [],
        localeStorageMutualFriends: [],
        newData: {},
        valueMutual: 0,
        dataFriendsAndMutual: [],
        localStorageDataFriend: {}
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
                count: '8',
                // offset: '15',
                fields:"photo_50",
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.dataFriends = res.response.items;
                console.log(this.dataFriends);
                
                // localStorage.clear('mutualCountsFriends')
                // this.mutualFriendsCount = JSON.parse(localStorage.getItem('mutualCountsFriends')) 
                this.requestMutualFriends(this.dataFriends)
                
              })     
      },
      async requestMutualFriends(value){
        
          for (const item of value) {
            // for(let i =0; i<value.length; i++){
         await jsonp('https://api.vk.com/method/friends.getMutual?',
        {
          source_uid: '213743757',
          target_uid: `${item.id}`,
          v: '5.131',
          access_token: this.MyAccessToken
        }).then(res => {
          this.valueMutual = res.response.length
            this.mutualFriendsCount.push(this.valueMutual)
            item['mutual'] = this.valueMutual
            
            console.log(item);
            this.dataFriendsAndMutual.push(item)
            
            // console.log(this.dataFriends);
            // console.log(this.mutualFriendsCount);
            // 
        })
        
      };
      this.localStorageDataFriend = this.dataFriendsAndMutual
      console.log(this.dataFriendsAndMutual);
      localStorage.setItem('localStorageDataFriend', JSON.stringify(this.localStorageDataFriend))
      // this.localeStorageMutualFriends = this.mutualFriendsCount
      // localStorage.setItem('mutualCountsFriends', JSON.stringify(this.localeStorageMutualFriends)) 
      
      },

      requestOffsetFriendList(){
        this.offsetValueProfileFriend += 8
        jsonp('https://api.vk.com/method/friends.search?',
              {
                count: '8',
                offset: String(this.offsetValueProfileFriend),
                fields:"photo_50",
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.newData = res.response.items;
                // this.newData.forEach(element => {
                  // this.dataFriends.push(element)
                // });
                this.requestMutualFriends(this.newData)

                // localStorage.setItem('dataFriends', JSON.stringify(this.dataFriends))
                console.log(this.dataFriends);
                
              })
      }
    },
  
    mounted() {
      this.localStorageDataFriend = JSON.parse(localStorage.getItem('localStorageDataFriend'))  
          // this.localeStorageMutualFriends = JSON.parse(localStorage.getItem('mutualCountsFriends'))
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
        if(newValue != 'mutual'){
          this.localStorageDataFriend.sort( (friend1, friend2) => {
            return friend1[newValue]?.localeCompare(friend2[newValue])
        })
        }else if(newValue == 'mutual'){
          this.localStorageDataFriend.sort((friend1, friend2)=> {
            return friend2.mutual - friend1.mutual  
          }) 
        }else if(newValue == ''){
          console.log('s');
          // localStorage.clear();
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
  