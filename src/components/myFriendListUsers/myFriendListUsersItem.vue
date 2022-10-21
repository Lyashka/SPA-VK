<template>
    <div class="container_user_row" :style="backgroundUserpanel">
      
        <button class="container"  @click="$router.push(`/profile/${user.id}`)">
            <img class="imgFriend" :src="user.photo_50"/>
            <div class="borderBottomFriend">
                <div class="containerFriend">
                    <div class="text_content">{{ user.first_name }} {{ user.last_name }}</div>
                    <div class="mutual" >{{ user.mutual }}</div> 
                    
                </div>
            </div>
        </button>
        <button class="imgBtn" @click="$emit('removeUser', user)"><img class="delete_btn" src="@/components/assets/delete.png"></button>
       
    </div>
 
</template>

<script>


export default {
    data() {
        return {
            friendList: JSON.parse(localStorage.getItem('fiendList'))
        }
    },
    props: {
        user: {
            type: Object,
        },
    },
    mounted() {

    },
    computed:{
        backgroundUserpanel(){
            let res = this.user.mutual / (this.friendList.length * 7)
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
    background-color: #0000003b;
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
</style>