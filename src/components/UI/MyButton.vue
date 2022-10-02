<template>
  <div class="btn">
    <slot> </slot>
  </div>
</template>

<script>
export default {
    name: 'my-button'
}
</script>

<style>
.btn{
    margin: auto;
    padding: 10px 15px;
    background: none;
    color: rgb(8, 30, 66);
    border-radius: 5px;
    border: none;
    box-shadow: 0.3px 0.3px black;
    display: flex;
    align-self:flex-end;
    
    
}
.btn:hover{
    background-color: aliceblue;
  
}
</style>