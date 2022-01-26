<template>
  <h1>{{ msg }}</h1>
  count is: {{ counter }}
  {{ doubleCounter }}
  {{ msg2 }}
  <p ref="desc"></p>
  <ModelButton @hhh="asd"></ModelButton>

</template>

<script>
import { computed, reactive, onMounted, onUnmounted, ref, toRefs, watch } from "vue";
import ModelButton from './ModelButton.vue'
export default {
  name: "HelloWorld",
  components:{
    ModelButton
  },
  props: {
    msg: String,
  },
  setup() {
    const {counter, doubleCounter} = useCounter();
    const msg2 = ref("some message");
    const desc = ref(null)
    watch(counter, (val, oldVal)=>{
      const p = desc.value
      p.textContent='231'
    })
    const asd=()=>{
      console.log('hhh')
    }
    return {
      counter,doubleCounter,
      msg2,
      asd,
      desc
    };
  },
};
function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2),
  });
  let timer;
  onMounted(() => {
    timer = setInterval(() => {
      data.counter++;
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(timer);
  });
  return toRefs(data);
}
</script>
