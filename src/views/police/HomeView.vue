<template>
    <div id="police_app">
        <SideNav/>

        <div class="police_app_view">
            <RouterView/>
        </div>
        <aside id="police_aside">

        </aside>
    </div>
</template>

<script>
import SideNav from '@/components/police/SideNav.vue';
export default {
    name: 'police-home',
    components:{
        SideNav
    }
}
</script>