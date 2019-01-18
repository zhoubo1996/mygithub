<template>
  <div class="parent">
    <!-- <el-button type="primary" @click="getArticle">调用后台接口</el-button> -->
    <!-- <el-input v-model="inpContent"></el-input> -->
    <child></child>
  </div>
</template>

<script>
    import store from '@/store'
    import Child from '@/components/Child.vue'

    export default {
            data(){
                return{
                    inpContent:'Blog'
                }
            },
            methods:{
                getArticle(){
                    this.$http.get('/api/getArticle').then(res =>{
                        console.log("res",res);
                        this.inpContent = res.data.data;
                    })
                }
            },
        components:{
            "child":Child,
        }
    }
      
</script>

<style scoped>
.parent {
  background-color: #00bbff;
  height: 800px;
}
</style>
