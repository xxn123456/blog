<template>
    <div class="home">
         <img class="logo" src="http://upload.shutiaogege.top/blog/logo.jpg" alt="">
         <div class="des">微信小程序敬请期待，请用电脑访问http://blog.shutiaogege.top/</div>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.home{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo{
        margin-top: 100px;
        width: 100px;
        height: 100px;
        margin-bottom: 40px;
    }
    .des{
        width: 100%;
        text-align: center;
        font-weight: 550;
        font-size: 18px;
    }
}
</style>