<template>
  <div class="container_user_row" :style="backgroundMutualFriendPanel">
      
      <button class="container"  @click="$router.push(`/profile/${user.id}`)">
          <img class="imgFriend" :src="user.photo_50"/>
          <div class="borderBottomFriend">
              <div class="containerFriend">
                  <div class="text_content">{{ user.first_name }} {{ user.last_name }}</div>
                  <div class="container_add_content">
                    <div class="mutual text_content_add">Общ. друзья: {{ user.friendInList.length}}</div> 
                    <div class="text_content_add">{{ sex }}</div>
                    <div class="text_content_add age_flex">Возраст: {{ age }}</div>
                  </div>
                  
              </div>
          </div>
      </button>
      <!-- <button class="imgBtn" @click="$emit('removeUser', user)"><img class="delete_btn" src="@/components/assets/delete.png"></button> -->
     
  </div>
</template>

<script>
export default {
    data(){
        return{
            sex: '',
            age: '',
        }
    },
    props: {
        user: {
            type: Object,
        },
        mutualFriendList: {
            type: Array,
        },
    },

    mounted(){
        console.log(this.user);
                if(this.user.sex == 2){
                    this.sex = 'М'
                }else if(this.user.sex == 1){
                    this.sex = 'Ж'
                }
                this.age = ((new Date().getTime() - new Date(this.user.bdate)) / (24 * 3600 * 365.25 * 1000)) | 0;
                if(this.age == 0){
                    this.age = '-'
                }
    },

    computed:{
        backgroundMutualFriendPanel(){
            let res = this.user.mutual / (this.mutualFriendList.length / 30)
            return 'background-color:  rgba(0, 162  , 251, ' + res + ' )'
        }
    }
}
</script>

<style scoped>
.container{
    height: 45px;
    padding-left: 15px;
    /* border-bottom: 1px solid black; */
    display: flex;
    align-items: center;
    font-size: 18px;
    width: 100%;
    background: none;
    border: none;
}
.container:hover{
    background-color: rgb(196, 217, 234);
}
.imgFriend{
    padding: 5px;
    border-radius: 30px;
    height: 40px;
}
.borderBottomFriend{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #0000003b;
    height: 100%;
    width: 100%;
    padding-left: 10px;
    
}
.containerFriend{
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.mutual{
    margin-right: 15px;
    display: flex;
    
}
.text_content{
    text-decoration: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container_user_row{
    display: flex;
    flex-direction: row;
  }
  .imgBtn{
    text-decoration: none;
    background: transparent;
    border: none
  }
  .delete_btn{
    height: 23px;
    width: 25px;
  }
  .text_content_add{
    font-size: 14px;
    margin-right: 25px;
  }
  .container_add_content{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .age_flex{
    width: 50px;
  }
</style>