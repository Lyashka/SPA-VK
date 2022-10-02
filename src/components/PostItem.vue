<template>
    <div v-if="post.attachments != undefined && post.text != undefined">
        <div class="container">
            <div v-if="this.post.attachments != undefined && this.post.attachments[0].photo != undefined" >
            <div class="textContent">
                {{ post.text }}
            </div>
            <img class="img" :src="this.post.attachments[0].photo.sizes[3].url">
        </div>
        <div  v-else class="textContent">
            {{ post.text }}
        </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            
        }
    },

    props: {
        post: {
            type: Object,
        },
    },
    mounted(){
        // console.log('F');
        // for(let i=0; i<this.post.attachments.length; i++){
            // if(this.post.attachments != undefined){
            //     console.log(this.post.attachments[0].photo.sizes[6]);
            // }
            
        // }
        
    }
}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(0, 0, 0, 0.253);
    box-shadow: 0px 2px rgba(0, 0, 0, 0.104)
}
.img{
    padding-left: 20px;
    padding-top: 20px;
    padding-bottom: 10px;
    display: flex;
    max-width: 500px;
}
.textContent{
    padding-left: 20px;
    padding-top: 20px;
    font-size: 18px;
}

</style>