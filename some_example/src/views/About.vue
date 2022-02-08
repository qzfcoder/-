<template>
  <div class="chartNum">
    <h3 class="orderTitle">订单总量</h3>
    <div class="box-item">
      <li
        :class="{ 'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
        v-for="(item, index) in orderNum"
        :key="index"
      >
        <span v-if="!isNaN(item)">
          <i
            ref="asd"
            :style="{
              transform: isFlage
                ? `translate(-50%, -${orderNum[index] * 10}%)`
                : `translate(-50%)`,
            }"
            >0123456789</i
          >
        </span>
        <span class="comma" v-else>{{ item }}</span>
      </li>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup(props) {
    let isFlage = ref(false);
    const orderNum = ref(["0", "0", ",", "0", "0", "0", ",", "0", "0", "0"]);
    onMounted(() => {
      setTimeout(() => {
        toOrderNum(12345);
      }, 100);
    });
    // 处理总订单数字
    const toOrderNum = (num) => {
      num = num.toString();
      // 把订单数变成字符串
      if (num.length < 8) {
        num = "0" + num; // 如未满八位数，添加"0"补位
        toOrderNum(num); // 递归添加"0"补位
      } else if (num.length === 8) {
        // 订单数中加入逗号
        num = num.slice(0, 2) + "," + num.slice(2, 5) + "," + num.slice(5, 8);
        orderNum.value = num.split(""); // 将其便变成数据，渲染至滚动数组
        isFlage.value = true;
      } else {
        // 订单总量数字超过八位显示异常
        console.log("订单总量数字过大，显示异常，请联系客服");
      }
    };
    return {
      orderNum,
      // setNumberTransform,
      toOrderNum,
      isFlage,
    };
  },
});
</script>
<style scoped lang="scss">
/*订单总量滚动数字设置*/
.box-item {
  position: relative;
  height: 100px;
  font-size: 54px;
  line-height: 41px;
  text-align: center;
  list-style: none;
  color: #2d7cff;
  writing-mode: vertical-lr;
  text-orientation: upright;
  /*文字禁止编辑*/
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  /* overflow: hidden; */
}
/* 默认逗号设置 */
.mark-item {
  width: 10px;
  height: 100px;
  margin-right: 5px;
  line-height: 10px;
  font-size: 48px;
  position: relative;
  & > span {
    position: absolute;
    width: 100%;
    bottom: 0;
    writing-mode: vertical-rl;
    text-orientation: upright;
  }
}
/*滚动数字设置*/
.number-item {
  width: 41px;
  height: 75px;
  background: #ccc;
  list-style: none;
  margin-right: 5px;
  background: rgba(250, 250, 250, 1);
  border-radius: 4px;
  border: 1px solid rgba(221, 221, 221, 1);
  & > span {
    position: relative;
    display: inline-block;
    margin-right: 10px;
    width: 100%;
    height: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    overflow: hidden;
    & > i {
      font-style: normal;
      position: absolute;
      top: 11px;
      left: 50%;
      transform: translate(-50%, 0);
      transition: transform 1s ease-in-out;
      letter-spacing: 10px;
    }
  }
}
.number-item:last-child {
  margin-right: 0;
}
</style>
