<template>
  <div class="btnContainer">
    <div><my-button-vue @click="$router.push(`${linkValue}`)" class="btn"> Назад </my-button-vue></div>
  </div>
  <my-profile-friend-vue>
    <div class="container">
            <div class="leftContainer">
                <div class="containerTopBar">
                    <PreLoader v-show="visiblePreLoader">

                    </PreLoader>
                    <div class="topbar">
                        <div>
                            <img class="imgProfile" :src="friend.photo_200"/>
                        </div>
                        <div class="textContent">
                            {{ friend.first_name }} {{ friend.last_name }} 
                            <div class="itemContent">
                                <div class="text_conten_style">
                                    Пол: {{ sex }}
                                </div>
                                <div class="text_conten_style">
                                    Взраст: {{ age }}
                                </div>
                                <div class="text_conten_style">
                                    Количество друзей: {{ friendsCount }}
                                </div>
                                <div class="text_conten_style">
                                    Общих друзей: {{ mutualFriendsCount }}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="posts">
                        <PreLoader v-show="visiblePreLoaderPosts">

                        </PreLoader>
                        <div v-if="posts.length > 0">
                        <post-item v-for="post in posts" :post="post" :key="post.id" >

                        </post-item>
                        </div>
                        <div class="text_content" v-else>
                            {{ noPosts }}
                        </div>
            
                </div>
            </div>
            <div class="friendListContainer">
                <PreLoader v-show="visiblePreLoaderFriends">

                </PreLoader>
                <div class="friendList">
                    <friends-list-item v-for="friend in friendsInListUser" :friend="friend" :key="friend.id">

                    </friends-list-item>
                </div>
                <!-- <div   class="addFriendList" @click="requestOffsetFriendList">
                        <div>Ещё..</div> 
                </div> -->
            </div>
    </div>
    </my-profile-friend-vue>

    
</template>

<script>
import MyProfileFriendVue from '@/components/UI/MyProfileFriend.vue';
import { jsonp } from 'vue-jsonp'
import FriendsListItem from '@/components/FriendsListItem.vue';
import PostItem from '@/components/PostItem.vue';
import MyButtonVue from '@/components/UI/MyButton.vue';
import PreLoader from '@/components/UI/PreLoader.vue';
export default {
    components: {
    MyProfileFriendVue,
    FriendsListItem,
    PostItem,
    MyButtonVue,
    PreLoader
},
    
    data(){
      return{
        MyAccessToken: localStorage.getItem('token'),
        friendsUser: {},
        friend: {},
        friendsCount: '',
        mutualFriendsCount: '',
        sex: '',
        age: '',
        posts: '',
        noPosts: 'Записей нет',
        offsetValue: 0,
        newDataFriendList: {},
        visiblePreLoader: false,
        visiblePreLoaderPosts: false,
        visiblePreLoaderFriends: false,
        myUserId: '',
        linkValue: localStorage.getItem('linkValue'),
        pullAllFriendsInList: [],
        friendsInListUser: [], 
        }
    },

    methods: {
       async requestUserGet() {
        this.visiblePreLoader = true
        try {
            await jsonp('https://api.vk.com/method/users.get',
              {
                user_ids: `${this.$route.params.id}`,
                fields: 'photo_200, sex, bdate, can_post',
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.friend = res.response[0]
                this.sex = this.friend.sex
                if(this.sex == 2){
                    this.sex = 'М'
                }else if(this.sex == 1){
                    this.sex = 'Ж'
                }
                this.age = ((new Date().getTime() - new Date(this.friend.bdate)) / (24 * 3600 * 365.25 * 1000)) | 0;
                if(this.age == 0){
                    this.age = '-'
                }
              })
        } catch (error) {
            console.log(error);
        }
        this.visiblePreLoader = false
        },

        async requestFriendsUser(){
            this.visiblePreLoaderFriends = true
            try {
                await jsonp('https://api.vk.com/method/friends.search',
              {
                user_id: `${this.$route.params.id}`,
                count: '8',
                fields: 'photo_50',
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                this.friendsCount = res.response.count
                this.friendsUser = res.response.items
              }) 
            } catch (error) {   
                console.log(error);
            }
            this.visiblePreLoaderFriends = false
        },

        async requestMutualFriends(){
            try {
                await jsonp('https://api.vk.com/method/friends.getMutual?',
        {
          source_uid: this.myUserId,
          target_uid: `${this.$route.params.id}`,
          v: '5.131',
          access_token: this.MyAccessToken
        }).then(res => {
            this.mutualFriendsCount = res.response.length
        }) 
            } catch (error) {
                console.log(error);
            }
         
      },

      async requestWallGet(){
        this.visiblePreLoaderPosts = true
        try {
            await jsonp('https://api.vk.com/method/wall.get',
        {
          owner_id: `${this.$route.params.id}`,
          v: '5.131',
          access_token: this.MyAccessToken
        }).then(res => {
            this.posts = res.response.items
        })
        } catch (error) {
            console.log(error);
        }
        this.visiblePreLoaderPosts = false
      },

      async requestOffsetFriendList(){
        this.offsetValue += 8
        try {
            await jsonp('https://api.vk.com/method/friends.search?',
              {
                user_id: `${this.$route.params.id}`,
                count: '15',
                offset: String(this.offsetValue),
                fields: 'photo_50',
                v: '5.131',
                access_token: this.MyAccessToken
                
              }).then(res => {
                this.newDataFriendList = res.response.items;
                this.newDataFriendList.forEach(element => {
                  this.friendsUser.push(element)
                });
              })  
        } catch (error) {
            console.log(error);
        }
      }
    },
    mounted() {
        if(this.pullAllFriendsInList !== null) {
            this.pullAllFriendsInList = JSON.parse(localStorage.getItem('pullAllFriendsInList'))
            this.pullAllFriendsInList.forEach(e => {
                if(e.id == this.$route.params.id){
                    this.friendsInListUser = e.friendInList
                    // console.log(this.friendsInListUser);
                }
            })
        }
        // console.log(this.pullAllFriendsInList);
        this.myUserId = localStorage.getItem('userId')
        this.requestFriendsUser()
        this.requestUserGet()
        this.requestMutualFriends()
        this.requestWallGet()
    },
}
</script>

<style scoped>
.containerTopBar{
    height: 200px;
    display: flex;
    flex-direction: column;
}
.imgProfile{
    width: 190px;
    padding-left: 20px;
    padding-top: 20px;
    display: flex;
}
.textContent{
    padding-left: 50px;
    font-size: 26px;
    padding-top: 20px;
}
.itemContent{
    padding-top: 10px;
    font-size: 20px;
}
.container{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    
}
.topbar{
    display: flex;
}
.posts{
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    width: 600px;
}
.leftContainer{
    display: flex;
    flex-direction: column;
}
.btn{
    width: 100px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
.btnContainer{
    margin-top: 20px;
    min-width: 700px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    display: flex; 
}
.friendList{
  border-left: 1px solid rgba(0, 0, 0, 0.314);
  width: 40%;
  display:flex;
  margin-top: 10px;
  flex-direction: column;
  pointer-events: none;
}
.friendListContainer{
    margin-top: 20px;
    min-width: 700px;
    max-width: 1000px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
}
.addFriendList{
    margin-top: 10px;
    margin-bottom: 20px;
    width: 40%;
    height: 25px;
    background-color:aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px  rgba(0, 0, 0, 0.258);
    border-radius: 6px;
  }
  .addFriendList:hover{
    background-color:#0000003b;
  }
  .text_content{
    margin-left: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.232);
  }
  .text_conten_style{
    text-decoration: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    justify-content: flex-start;
  }

</style>