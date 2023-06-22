<template>
  <nav-bar/>
  <router-view />
</template>

<style lang="scss">
@import '@/styles/styles.scss';
</style>
<script>
import NavBar from '@/components/navigation/NavBar.vue';
export default{
    components:{
        NavBar
    },

    mounted(){
      this.$store.dispatch('populateUser');
    }
}



</script>