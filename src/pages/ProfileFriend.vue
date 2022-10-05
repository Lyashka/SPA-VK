<template>
  <div class="btnContainer">
    <div><my-button-vue @click="$router.push(`/`)" class="btn"> Назад </my-button-vue></div>
  </div>
  <my-profile-friend-vue>
    <div class="container">
            <div class="leftContainer">
                <div class="containerTopBar">
                    <div class="topbar">
                        <div>
                            <img class="imgProfile" :src="friend.photo_200"/>
                        </div>
                        <div class="textContent">
                            {{ friend.first_name }} {{ friend.last_name }} 
                            <div class="itemContent">
                                <div>
                                    Пол: {{ sex }}
                                </div>
                                <div>
                                    Взраст: {{ age }}
                                </div>
                                <div>
                                    Количество друзей: {{ friendsCount }}
                                </div>
                                <div>
                                    Общих друзей: {{ mutualFriendsCount }}
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div class="posts">
                    <div >
                        <post-item v-for="post in posts" :post="post" :key="post.id" >

                        </post-item>
                    </div>
                        
                </div>
            </div>
            <div class="friendListContainer">
                <div class="friendList">
                <friends-list-item v-for="friend in friendsUser" :friend="friend" :key="friend.id">

                </friends-list-item>
                
            </div>
            <div class="addFriendList" @click="requestOffsetFriendList">
                    <div>Ещё..</div> 
            </div>
            </div>
            
    </div>
           
    </my-profile-friend-vue>

    
</template>

<script>
import FriendsListItemVue from '@/components/FriendsListItem.vue';
import MyProfileFriendVue from '@/components/UI/MyProfileFriend.vue';
import { jsonp } from 'vue-jsonp'
import FriendsListItem from '@/components/FriendsListItem.vue';
import PostItem from '@/components/PostItem.vue';
import MyButtonVue from '@/components/UI/MyButton.vue';
export default {
    components: {
        MyProfileFriendVue,
        FriendsListItem,
        PostItem,
        MyButtonVue

    },
    props:{

    },
    data(){
      return{
        MyAccessToken: 'vk1.a.bliSQGPwAPCsWlAWuh4PKdtqj-V0ZzXzTbe7IhLnZF1ZQ_pVDYHflzKdnA_gbZi-jDZXh0q-2PiiU1Djsk3C6mTHfv7vS9x_wJif5ulIfiuX6tdAglUem2OMfcX_wAUI3RMEHBhSLNbvA1pVktoFgrSO_T61v8HMfOYAxBl5wfCLFlPxHOKRz5RQIe7TF7CR',
        friendsUser: {},
        friend: {},
        friendsCount: '',
        mutualFriendsCount: '',
        sex: '',
        age: '',
        posts: '',
        noPosts: 'Постов нет',
        offsetValue: 0,
        newDataFriendList: {},
       
        }
    },

    methods: {
       async requestUserGet() {
        try {
            await jsonp('https://api.vk.com/method/users.get',
              {
                user_ids: `${this.$route.params.id}`,
                fields: 'photo_200, sex, bdate, can_post',
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                // console.log(res.response);
                this.friend = res.response[0]
                console.log(this.friend);
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
         
        },
        async requestFriendsUser(){
            
            try {
                await jsonp('https://api.vk.com/method/friends.search',
              {
                user_id: `${this.$route.params.id}`,
                count: '8',
                fields: 'photo_50',
                v: '5.131',
                access_token: this.MyAccessToken
              }).then(res => {
                console.log(res.response);
                this.friendsCount = res.response.count
                console.log(this.friendsCount);
                this.friendsUser = res.response.items
                console.log(this.friendsUser);
              }) 
            } catch (error) {   
                console.log(error);
            }
         
        },
        async requestMutualFriends(){
            try {
                await jsonp('https://api.vk.com/method/friends.getMutual?',
        {
          source_uid: '213743757',
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
        try {
            await jsonp('https://api.vk.com/method/wall.get',
        {
        //   source_uid: '213743757',
          owner_id: `${this.$route.params.id}`,
          v: '5.131',
          access_token: this.MyAccessToken
        }).then(res => {
            this.posts = res.response.items
            console.log(this.posts);
            // console.log( this.posts[1].attachments[0].photo.sizes[6].url);
        })
        } catch (error) {
            console.log(error);
        }
      
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
  /* margin-right: 10px; */
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
    /* border-bottom: 1px solid black; */
    align-items: center;
    box-shadow: 1px 1px  rgba(0, 0, 0, 0.258);
    border-radius: 6px;
  }
  .addFriendList:hover{
    background-color:#0000003b;
  }

</style>