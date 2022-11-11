<template>
  <div class="container">
        <div class="search_container">
            <div class="searchFriend">
                <input type="text"  class="inputSearch" placeholder="Введите имя" v-model="inputId"  @input="searchFriend"/>
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
                        :options="sortoptionFriendList"
                        v-show="true"
                        style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">        
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
                <PreLoader class="preLoaderFriendList"  v-show="preLoaderVisibldeFriendList">

                </PreLoader>
            </MyWindowFriendListVue>  
            <div class="btn_options">
                
            </div>
             
        </div>
    </div>

    <div class="container_mutual_friend"> 
        <div class="btn_directions">
            <div class="selectStyle">
                <MySelect 
                        :class="disabledSelect"
                        v-model="selectedSortFriends"
                        :options="sortoption"
                        v-show="true"
                        style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">        
                </MySelect>
        </div>
        <MyMutualFriend>
            <mutualFriendVue :mutualFriendList="mutualFriendList">

            </mutualFriendVue>
        </MyMutualFriend>
        </div>
        <PreLoader class="preLoader"  v-show="visibleFriendList">

        </PreLoader>
        <div class="btn_directions">
            <MyButton @click="buildList" :class="disabledBtn" style="margin-top: 30px; margin-left: 10px" >Построить</MyButton>
            <MyButton  @click="$router.push(`/`)" style="margin-left: 10px; margin-top: 5px">Назад</MyButton> 
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
import MyMutualFriend from '@/components/UI/MyMutualFriend.vue'
import mutualFriendVue from '@/components/mutualFriend/mutualFriend.vue'
export default {
    components:{
    MyWindowFriendListVue,
    MyButton,
    MySearchWindow,
    searchFriendList,
    myFriendListUsers,
    MySelect,
    PreLoader,
    MyMutualFriend,
    mutualFriendVue,
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
            selectedSortFriends: '',
            sortoptionFriendList: [
            {value: 'first_name', name: 'По имени'},
            {value: 'last_name', name: 'По фамилии'},
            ],
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
            preLoaderVisibldeFriendList: false,
            visibleFriendList: false,
            userNotFound: '',

            // mutualArray: '',
            mutualFriends: [],
            mutualValue: [],
            mutualFriendList: [],
            dataFriendsListUser: [],

            pullAllFriendsInList: [], // общий пулл всех друзей из списка 
            filterPullAllFriends: [], 
            fullFilter: [],

            deleteUserInFriendList: [],
        }
    },



    methods:{
        buildList(){
           this.visibleFriendList = true
            for(let F=0; F < this.friendList.length; F++){
                // console.log('f');
                    for(let j = 0; j < this.mutualFriends.length; j++){
                        
                        
                        if(this.friendList[F].id == this.mutualFriends[j]){
                            // console.log(this.mutualFriends[j]);
                            this.mutualValue.push(this.mutualFriends[j]) 
                            
                        }
                }
                this.friendList[F]['friendInList'] = this.mutualValue
                this.mutualValue = []
            }
            this.mutualFriendList =  this.pullAllFriendsInList
            localStorage.setItem('mutualFriendList', JSON.stringify(this.mutualFriendList))
            // console.log('mutualFriendList');
            // console.log( this.mutualFriendList);


            this.pullAllFriendsInList.forEach(element => {
                this.fullFilter.forEach(e => { 
                    if(element.id == e.id){
                        element.friendInList.push(e.friendInList[0])
                    
                    }
                })
            })
            this.pullAllFriendsInList.forEach(element => {
                element['mutual'] = element.friendInList.length
            })

            

            this.fullFilter = []
            // console.log(this.pullAllFriendsInList);
            localStorage.setItem('pullAllFriendsInList', JSON.stringify(this.pullAllFriendsInList))

        //     setTimeout(()=>{
        //         this.pullAllFriendsInList.forEach(user => {
                
        //         jsonp('https://api.vk.com/method/friends.get', //поиск друзей добавленного друга
        //       {
        //           user_id: `${user.id}`,
        //           count: '100',
        //           // fields: 'photo_50, sex, bdate',
        //           v: '5.131',
        //           access_token: this.MyAccessToken
        //       }).then(res => {
        //           console.log(res);
        //       })
          
               
        //   })
        //     }, 1000)
            
            setTimeout(()=>{
                this.visibleFriendList = false
            }, 2000)
        },


       async addUserInFriendList(user){
        this.preLoaderVisibldeFriendList = true
            if(JSON.parse(localStorage.getItem('fiendList')) !== null){
                this.friendList = JSON.parse(localStorage.getItem('fiendList'))
            }
            for(let i = 0; i < this.friendList.length; i++){
               if(this.friendList[i].id === user.id){
                this.preLoaderVisibldeFriendList = false
                return
               }
            }
            this.requestFriendlListUser(user)
        },

        requestFriendlListUser(user){ 
            jsonp('https://api.vk.com/method/friends.search?', //поиск друзей добавленного друга
            {
                user_id: `${user.id}`,
                count: '100',
                fields: 'photo_50, sex, bdate',
                v: '5.131',
                access_token: this.MyAccessToken
            }).then(res => {
                try {
                    // console.log(res);
                    this.dataFriendsListUser.push(res.response.items);
                    this.friendList.push(user)
                    localStorage.setItem('fiendList',  JSON.stringify(this.friendList))
                    this.disabledSelect = 'all'

                        if(this.friendList != '[]'){
                            this.disabledBtn = 'all'
                        }  
                   
                        this.dataFriendsListUser[0].forEach(element => {
                                    element['friendInList'] = []  //добавляем каждому другу его друга из списка
                                    
                                    element.friendInList.push(user) 
                                    this.pullAllFriendsInList.push(element)
                        });
                        // console.log( this.pullAllFriendsInList);
                    
                        this.filterPullAllFriends = this.pullAllFriendsInList.filter((value, index, self) => //находим повторяющихся друзей
                        index !== self.findIndex((t) => (
                            t.id === value.id 
                        )))  
                      
                        this.filterPullAllFriends.forEach(element => {
                            this.fullFilter.push(element)
                        })
                        
                        this.filterPullAllFriends = []
 
                        // Remove duplicates 
                        this.pullAllFriendsInList = this.pullAllFriendsInList.filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            value.id === t.id  
                        )))
                        this.dataFriendsListUser = []
                } catch (error) {
                    console.log(error);
                }
            })
            localStorage.setItem('pullAllFriendsInList', JSON.stringify(this.pullAllFriendsInList))
            this.preLoaderVisibldeFriendList = false
        },

        // Удалить друга из списка
        removeUserInFriendList(user){
            this.friendList = this.friendList.filter(u => u.id !== user.id)
            this.preLoaderVisibldeFriendList = true
            jsonp('https://api.vk.com/method/friends.search?', //поиск друзей добавленного друга
            {
                user_id: `${user.id}`,
                count: '100',
                fields: 'photo_50',
                v: '5.131',
                access_token: this.MyAccessToken
            }).then(res => {
                this.deleteUserInFriendList = res.response.items
                // console.log('deleteUserInFriendList');
                // console.log( this.deleteUserInFriendList);

                this.pullAllFriendsInList.forEach(e => {
                    e.friendInList.forEach(ef => {
                            // console.log(ef.id == user.id);
                            e.friendInList = e.friendInList.filter(ef => ef.id !== user.id)
                    })
                })

                this.pullAllFriendsInList.forEach(e => {
                    this.deleteUserInFriendList.forEach(el => {
                        
                        this.pullAllFriendsInList = this.pullAllFriendsInList.filter(e => e.friendInList.length !== 0)
                        
                    })
                    
                })
                this.preLoaderVisibldeFriendList = false
                })

    
            localStorage.setItem('fiendList',  JSON.stringify(this.friendList))

            localStorage.setItem('mutualFriendList',  JSON.stringify( this.mutualFriendList))

            this.mutualFriends = []
            this.mutualFriendList = []
            
            for(let F=0; F < this.friendList.length; F++){
                localStorage.setItem('mutualFriends', JSON.stringify(this.mutualFriends))
            }
            
            if(localStorage.getItem('fiendList') == '[]'){ 
                localStorage.removeItem('fiendList')
                this.valueTextElse = 'Список пуст'
                this.disabledBtn = 'disabled'
                this.disabledSelect = 'disabled'
            } 
            localStorage.setItem('pullAllFriendsInList', JSON.stringify(this.pullAllFriendsInList))
           
        },
        

        //_____________Поиск друзей_________________________
       async searchFriend(){

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
             await setTimeout(() => {
             jsonp('https://api.vk.com/method/users.search',{
              q: this.inputId,
              access_token: this.MyAccessToken,
              count: '8',
              v: '5.131',
              fields: "photo_50, screen_name, sex, bdate",
            })
            .then(res => {
                 try {
                    
                        if(res.response.items.length == 0){
                        this.userNotFound = 'Пользователь не найден...'
                        }       
                        this.requestUser = res.response.items
                        this.dataSearchUser = this.requestUser
                        // this.requestUser.forEach(e => {
                        //     this.dataSearchUser.push(e)
                        // })
                        // this.requestMutualFriends(this.requestUser)
                        this.visibleAddFriendList = true
                        this.preLoaderVisiblde = false
                        
                   
                } 
                catch (error) {
                    console.log(error);
                    this.userNotFound = 'Произошла ошибка, попробуйте сделать запрос еще раз'
                    this.preLoaderVisiblde = false
                }
             
            })
            }, 500)
          }
        },

        

        // async requestMutualFriends(value){
        //     for (let item of value) {
        //        await jsonp('https://api.vk.com/method/friends.getMutual?',
        //       {
        //         source_uid: `${this.userId}`,
        //         target_uid: `${item.id}`,
        //         v: '5.131',
        //         access_token: this.MyAccessToken
        //       }).then(res => {
        //         //   this.valueMutual = res.response.length
        //           item['mutual'] = res.response.length
        //         //   this.mutualArray = res.response
        //         //   item['ArrayMutual'] = this.mutualArray
        //           this.dataSearchUser.push(item) //пулл найденых по ФИО пользователей
                  
        //       })
        //     };  
        //     this.preLoaderVisiblde = false
        // },

        async requestOffsetFriendList(){
            this.countOffsetSearchusers += 8
            await jsonp('https://api.vk.com/method/users.search',{
              q: this.inputId,
              access_token: this.MyAccessToken,
              count: '8',
              offset: String(this.countOffsetSearchusers),
              v: '5.131',
              fields: "photo_50, sex, bdate",
            })
            .then(res => {
                res.response.items.forEach(e => {
                    this.dataSearchUser.push(e)
                })
            //   this.requestMutualFriends(res.response.items)
            })
        },
        async getFriends(user) {
            // setTimeout(()=>{
               await jsonp('https://api.vk.com/method/friends.get', //поиск друзей добавленного друга
                {
                    user_id: `${user.id}`,
                    count: '100',
                    // fields: 'photo_50, sex, bdate',
                    v: '5.131',
                    access_token: this.MyAccessToken
                }).then(res => {
                    console.log(res);
                })
            // }, 1000)
        }
           

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
    },

    selectedSortFriends(newValue){
        if(newValue != 'mutual'){
        this.pullAllFriendsInList.sort( (friend1, friend2) => {
          return friend1[newValue]?.localeCompare(friend2[newValue])
          })
        }else if(newValue == 'mutual'){
          this.pullAllFriendsInList.sort((friend1, friend2)=> {
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
        else{
            this.disabledBtn = 'all'
        }
        if(JSON.parse(localStorage.getItem('fiendList')) != null){
            // console.log(JSON.parse(localStorage.getItem('fiendList')));
            this.friendList = JSON.parse(localStorage.getItem('fiendList'))
            this.disabledSelect = 'all'
        }   
        if(JSON.parse(localStorage.getItem('pullAllFriendsInList')) != null){
            this.pullAllFriendsInList = JSON.parse(localStorage.getItem('pullAllFriendsInList'))
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
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}
/* .backBtn{
    margin-top: 0;
    margin-left: 10px;
} */
.search_container{ 
    margin-right: 20px;
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
.container_mutual_friend{
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}
.btn_directions{
    flex-direction: column;
}
.preLoaderFriendList{
    position: absolute;
    display: flex;
    margin-left: 40%;
    margin-top: -10%;
}
</style>