<template>
    <div>
          <div  class="dialog__content">
              <div class="topBar">
                <div class="text_content">
                  Исходный
                </div>
               
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
      /* max-height: 710px; */
      min-width: 500px;
      max-width: 500px;
      position: relative;
      box-shadow: 1px 1px   rgba(0, 0, 0, 0.265);
  }
  input{
    margin-left: 30px;
  }
  .topBar{
    height: 30px;
    display: flex;
    justify-content: end;
    border-bottom: 1px solid rgba(0, 0, 0, 0.18);
    align-items: center;
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
  .text_content{
    margin-right: 5px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  }
  </style>