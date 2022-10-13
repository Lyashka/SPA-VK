<template>
  <div class="signIn_container" >
    <div class="signIn_content">
      <slot>

      </slot>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'my-sigIn',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },

  methods:{
    hideWindow() {
      this.$emit('update:show', true)
    }
  }

}
</script>

<style scoped>
.signIn_container{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}
.signIn_content{
  margin: auto;
  background-color: white;
  border-radius: 12px;
  min-height: 100px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin-bottom: auto;
}
</style>