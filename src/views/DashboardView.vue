<template>
    You are at the dashboard
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    computed:{
        ...mapGetters(['isAuthenticated','isApproved'])
    },
    
    mounted(){
        if(this.isAuthenticated && !this.isApproved){
            // will redirect to respective user dashboard
            this.$router.replace({name:'approval_request'});
        }
        
    }
}
</script>