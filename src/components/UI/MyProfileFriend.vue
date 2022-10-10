<template>
    <div class="container">
            <slot> </slot>
    </div>
    
</template>

<script>
export default {
 
    name: 'my-profile'
}
</script>

<style scoped>
.container{
      margin: auto;
      margin-top: 1%;
      padding: 0;
      background-color:aliceblue;
      border-radius: 12px;
      max-height: 100%;
      min-width: 700px;
      max-width: 1000px;
      box-shadow: 1px 1px   rgba(0, 0, 0, 0.265);
}
</style>