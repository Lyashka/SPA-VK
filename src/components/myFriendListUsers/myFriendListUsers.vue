<template>
    <div>
      <div>
          <transition-group name="friend-list">
                <myFriendListUsersItem  
                                      v-for="user in friendList"
                                      :user="user"
                                      :key="user.id"
                                      @removeUser="$emit('removeUser', user)"
                                  >
              </myFriendListUsersItem>
          </transition-group>
          
      </div>
     
      </div>
  </template>
  
  <script>
    //   import FriendsListItemVue from './FriendsListItem.vue';
    import myFriendListUsersItem from '@/components/myFriendListUsers/myFriendListUsersItem.vue'
  export default {
      components:{ myFriendListUsersItem },
      data(){
        return{
  
        //   mutualIndex: JSON.parse(localStorage.getItem('mutualCountsFriends')) 
        }
      },
      props: {
        friendList: {
            friendList: Array,
          },
      },
  
      mounted(){
  
      }
      
  }
  </script>
  
  <style scoped>
  .friend-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .friend-list-enter-active,
  .friend-list-leave-active {
    transition: all 0.3s ease;
  }
  .friend-list-enter-from,
  .friend-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  
  
  .friend-list-move {
    transition: transform 0.8s ease;
  }
  .friend-list-complete-item {
    transition: all 0.8s ease;
    display: inline-block;
    margin-right: 10px;
  }
  
  .friend-list-complete-enter-from,
  .friend-list-complete-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  
  .friend-list-complete-leave-active {
    position: absolute;
  }
  </style>