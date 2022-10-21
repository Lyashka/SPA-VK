<template>
    <div>
          <div  class="dialog__content">
              <div class="topBar">
                
              </div>
              <slot> </slot>
          </div>
    </div>
  </template>
  
  <script>
  export default {
      name: 'my-windowList',
      methods: {
      }
  }
  </script>
  
  <style scoped>

  .dialog__content{
      margin: auto;
      margin-top: 1%;
      padding: 0;
      background-color:aliceblue;
      border-radius: 12px;
      min-height: 390px;
      min-width: 350px;
      max-width: 350px;
      position: relative;
      box-shadow: 1px 1px   rgba(0, 0, 0, 0.265);
  }
  input{
    margin-left: 30px;
  }

  .addFriend{
    margin-right: 10px;
    background: none;
    border: none;
    display: flex;
    align-items: center;
    
  }
  .addFriend:hover{
    background-color: rgba(0, 0, 0, 0.185);
    border-radius: 3px;
  }
  .topBar{
    height: 15px;
  }
  </style>