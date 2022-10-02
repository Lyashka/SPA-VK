<template>
  <select v-model="modelValue" @change="changeOption" class="select">
    <option disabled value="">Сортировать</option>
    <option   v-for="option in options" 
              :key="option.value" 
              :value="option.value"
              >
              {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
    name: 'my-select',
    props: {
      modelValue: {
        type: String,
      },
      options:{
        type: Array,
        default: () => []
      }
    },
    methods: {
      changeOption(event){
        this.$emit('update:modelValue', event.target.value);
      }
    }
}
</script>

<style scoped>
  .select{
    height: 30px;
    font-size: 14px;
    border-radius: 5px;
    border: none;
    box-shadow: 0.3px 0.3px black;
  }
  .select:hover{
    background-color: aliceblue;
  }


</style>