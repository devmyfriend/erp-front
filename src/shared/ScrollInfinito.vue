<template>
  <div ref="scroller" class="scroller">
    <slot></slot>
    <div ref="endOfScroller" class="fin">
    </div>
  </div>
</template>


<script setup>
import { ref, defineEmits, onMounted } from 'vue';

const emits = defineEmits(['UpdateScroll']);
let scroller = ref(null);
let endOfScroller = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      let entry = entries[0];
      if (entry.isIntersecting) {
        emits('UpdateScroll');
      }
    },
    { root: scroller.value }
  );
  observer.observe(endOfScroller.value);
});
</script>

<style scoped>
.scroller {
  height: 11rem;
  width: 98%;
  overflow: auto;
  margin: auto;
}
.fin{
  height: 1px;
  width: 100%;
  background-color: transparent ;
}
</style>