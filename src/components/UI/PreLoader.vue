<template>
    <div class="lds-dual-ring">

    </div>
</template>

<script>
export default {
    name: 'my-pre-loader'
}
</script>

<style scoped>

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgba(0, 0, 0, 0.5);
  border-color: rgba(0, 0, 0, 0.5) transparent rgba(0, 0, 0, 0.5) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



</style>