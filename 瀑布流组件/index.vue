<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <div class="wbox" :style="{ height: allHeight + 'px' }">
        <div
          class="box"
          v-for="item in list"
          :key="item"
          :style="{
            top: item.top + 'px',
            left: item.left + 'px',
            width: item.width + 'px',
            height: item.height + 'px'
          }"
        >
          <!-- <img :src="item.src" alt=""/> -->
          <com-view :carddate="item"></com-view>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import comView from 'components/comView'
export default defineComponent({
  name: '',
  components: {
    comView
  },
  setup (props) {
    const list = ref([])
    const loading = ref(false)
    const finished = ref(false)
    const refreshing = ref(false)
    const waterfallList = ref([])
    const imgWidth = ref('')
    const imgHeight = ref('')
    const allHeight = ref('')
    const deviationHeight = ref([])
    const col = ref(2)
    const screenWidth = ref(document.body.clientWidth)
    const imgArr = reactive([
      'https://picsum.photos/360/420?random=1',
      'https://picsum.photos/360/480?random=15',
      'https://picsum.photos/360/800?random=12',
      'https://picsum.photos/360/360?random=11',
      'https://picsum.photos/360/800?random=1',
      'https://picsum.photos/360/480?random=13'
    ])
    const onLoad = () => {
      imgPreloading()
      setTimeout(() => {
        if (refreshing.value) {
          list.value = []
          refreshing.value = false
        }
        // var alla = 0
        for (let i = 0; i < waterfallList.value.length; i++) {
          list.value.push(waterfallList.value[i])
          // alla += Number(waterfallList.value[i].height)
        }
        // allHeight.value = alla
        allHeight.value = waterfallList.value.pop().top + waterfallList.value.pop().height
        loading.value = false
        // console.log(list.value[0])
        if (list.value.length >= 200) {
          finished.value = true
        }
      }, 1000)
    }
    onMounted(() => {
      calculationWidth()
    })
    // 计算每个图片的宽度
    const calculationWidth = () => {
      // 初始化偏移高度数组
      deviationHeight.value = new Array(col.value)
      for (let i = 0; i < deviationHeight.value.length; i++) {
        deviationHeight.value[i] = 0
      }
      imgPreloading()
    }
    const imgPreloading = () => {
      for (let i = 0; i < imgArr.length; i++) {
        const aImg = new Image()
        aImg.src = imgArr[i]

        aImg.onload = aImg.onerror = () => {
          const imgData = {}
          imgData.width = (screenWidth.value - 10 * col.value) / col.value
          imgData.height = (imgData.width / aImg.width) * aImg.height + 100
          imgData.src = aImg.src
          // rankImg(imgData)
          waterfallList.value.push(imgData)
          rankImg(imgData)
        }
      }
    }
    // // 瀑布流布局
    const rankImg = imgData => {
      const minIndex = filterMin() // 获得高度最小的一列的下标
      imgData.top = deviationHeight.value[minIndex] // 插入图片的top值
      imgData.left = minIndex * (10 + imgData.width) // 插入图片的left值
      deviationHeight.value[minIndex] += imgData.height + 10 // 更新当前列的高度
      // console.log(waterfallList.value.length, '---------', imgData.top)
    }
    // // 找到最短的列并返回下标
    const filterMin = () => {
      const min = Math.min.apply(null, deviationHeight.value)
      return deviationHeight.value.indexOf(min)
    }
    const onRefresh = () => {
      // 清空列表数据
      finished.value = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true
      onLoad()
    }
    return {
      col,
      list,
      onLoad,
      loading,
      finished,
      onRefresh,
      refreshing,
      imgArr,
      imgWidth,
      imgHeight,
      waterfallList,
      imgPreloading,
      screenWidth,
      rankImg,
      allHeight,
      filterMin,
      calculationWidth
    }
  }
})
</script>

<style lang="scss" scoped>
.wbox {
  position: relative;
  .box {
    position: absolute;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
