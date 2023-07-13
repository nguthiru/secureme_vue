<template>
    <div class="analytics-page">
        <SideNav/>

        <RouterView/>
    </div>
</template>

<script>
import SideNav from '@/components/analytics/SideNav.vue';
export default{


    components:{
        SideNav
    }
}
</script>