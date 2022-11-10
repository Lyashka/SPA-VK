<template>
    <div>
        <button class="container disabled" @click="$router.push(`/profile/${friend.id}`)">
            <img class="imgFriend" :src="friend.photo_50"/>
            <div class="borderBottomFriend">
                <div class="containerFriend">
                    <div class="text_content">{{ friend.first_name }} {{ friend.last_name }}</div>
                    <div class="mutual">{{ friend.mutual }}</div> 
                </div>
                
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
        friend: {
            type: Object,
        },
    },
    mounted() {

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
  }
  .disabled{
    pointer-events: none;
  }
</style>