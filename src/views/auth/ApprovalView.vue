
<template>
    <div class="auth-page">
        <div class="auth-container-header">
            Ooops to proceed approve your account
        </div>
        <approval-form></approval-form>
        
    </div>
</template>
<script>
import ApprovalForm from '@/components/ApprovalForm.vue';
export default{
components:{
    ApprovalForm
}
}

</script>