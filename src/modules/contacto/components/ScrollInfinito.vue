
<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
 
    

const emits = defineEmits(['infinite'])
let scroller = ref(null)
let endOfScroller = ref(null)


onMounted(()=>{
  const observer = new IntersectionObserver(
    (entries)=>{
      let entry = entries[0]
    
      
      if(entry.isIntersecting){
    

        emits('infinite')
      }
  },
  {root: scroller.value} 
  )
  observer.observe(endOfScroller.value)

})




</script>
<template>
    <div ref="scroller" class="scroller">
    <slot></slot>
    <div ref="endOfScroller"></div>

  </div>
</template>
<style scoped>
    .scroller{
  height: 11rem;
  width:100%;
  overflow:auto;
 
}
</style>