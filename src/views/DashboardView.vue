<template>
    You are at the dashboard
</template>

<script>
import { mapGetters} from 'vuex';


export default {
    computed:{
        ...mapGetters(['isAuthenticated','isApproved','getUser'])
        },
    
    mounted(){
        if(this.isAuthenticated && !this.isApproved){
            // will redirect to respective user dashboard
            this.$router.replace({name:'approval_request'});
        }
        
        if(this.getUser.user_type==='police'){
            this.$router.replace({name:'police_view'})
        }
        // if(this.getUser.user_type==='analytics'){
            
        // }
    }
}
</script>