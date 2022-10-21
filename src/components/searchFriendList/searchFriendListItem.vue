<template>
    <div>
        <!-- @click="$router.push(`/profile/${user.id}`)" -->
        <button class="container" >
            <img class="imgFriend" :src="user.photo_50"/>
            <div class="borderBottomFriend">
                <div class="containerFriend">
                    <div class="text_content">{{ user.first_name }} {{ user.last_name }}</div>
                    <div class="mutual">{{ user.mutual }}</div> 
                </div>
                <button class="imgBtn" @click="$emit('addUserInList', user)"><img class="addUserBtn" src="@/components/assets/plus.png"></button> 
            </div>
        </button>

       
    </div>
 
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    props: {
        user: {
            type: Object,
        },
    },
    
    mounted() {

    }
}
</script>

<style scoped>
.container{
    height: 50px;
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
    /* background-color: #0000003b; */
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
    align-items: center;
    justify-content: flex-end;
}
.text_content{
    text-decoration: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .addUserBtn{
    height: 20px;
    width: 20px;
  }
  .imgBtn{
    text-decoration: none;
    background: transparent;
    border: none;
    margin-right: 10px;
  }
  .imgBtn:hover{
    background-color: rgba(67, 63, 105, 0.292);
    border-radius: 10px;
  }
</style>