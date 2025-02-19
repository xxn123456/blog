<template>
    <div class="web-info">
       <div class="tianqi">晴</div>
       <div class="other">地区：杭州</div>
       <div class="other">温度：8°C</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            articleTotal:"-"
        }
    },
    methods:{

    }
}
</script>
<style lang="scss" scoped>
@keyframes loading {
  to {
    background-position-x: -20%;
  }
}
.web-info{
    width: 100%;
    height: 100%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tianqi{
        width: 100px;
        height: 100px;
        font-size: 60px;
        color: #666666;
        text-align: center;
    }
    .other{
        width: 100%;
        text-align: left;
        text-indent: 20px;
        color: #666666;
        font-size:12px;
    }
}
</style>