<template>
    Redirecting ...
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'isApproved', 'getUser'])
    },

    watch: {
        getUser(newVal) {
            if (newVal != null) {
                console.log(newVal)
                if (newVal.approved === true) {

                    if (newVal.user_type === 'police') {
                        this.$router.replace({ name: 'police_view' })
                    }
                    else if (newVal.user_type === 'analytics') {
                        this.$router.replace({ name: 'analytics_view' })
                    }
                }
                else {
                    this.$router.replace({ name: 'approval_request' })
                }

            }
        }
    },


}
</script>