<script setup>
import { ref, onMounted } from 'vue';
 
    const {Encabezado,Lista} = defineProps({
        Encabezado:Array,
        Lista:Array
        
    });

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

    <table ref="scroller" class="scroller">
      <thead>
        <tr  >
          <th v-for = "(en,index) in Encabezado" :key="index">
              {{ en }}
          </th>
        </tr>
      </thead>
    <tbody>
        <tr v-for="lc in Lista"> 
          <td v-for = "en in Encabezado">
              {{ lc[en] }}
          </td>
        
        </tr>
    <!--   <slot></slot> -->
      <div ref="endOfScroller"></div>
    </tbody>
   

  </table>
</template>

<style scoped>
    .scroller{
  height: 11rem;
  width:100%;
  overflow:auto;
 
}

table{
  background-color: white;
  color:black;
  


}

</style>