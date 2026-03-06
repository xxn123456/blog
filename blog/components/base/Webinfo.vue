<template>
  <div class="web-info">
    <div class="tianqi">{{ weather.weather }}</div>
    <div class="other">数据采集时间：{{ weather.reporttime }}</div>
    <div class="other">地区：{{ weather.city }}</div>
    <div class="other">温度：<span style="font-weight: bold;">{{ weather.temperature }}°C</span></div>
    <div class="other">风向：{{weather.winddirection}}</div>
  </div>
</template>
<script>
import { queryAdcodeByIp } from "@/api/home.js";
export default {
  data() {
    return {
      weather: {},
    };
  },
  mounted() {
    this.queryAdcodeByIp();
  },
  methods: {
    queryAdcodeByIp() {
      queryAdcodeByIp().then((res) => {
        let { code, data } = res;
        if (code == "200") {
          this.weather = data[0];
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.web-info {
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .tianqi {
    height: 100px;
    font-size: 60px;
    color: #666666;
    text-align: center;
  }
  .other {
    width: 100%;
    text-align: left;
    text-indent: 20px;
    color: #666666;
    font-size: 12px;
    padding-bottom: 10px;
  }
}
</style>