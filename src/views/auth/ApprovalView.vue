
<template>
    <div class="auth-page">
        <div class="auth-container-header">
            <div class="column">
                <img class ="medium_image" id="pending_approval_image" src="@/assets/pending_approval.svg" alt="Pending approval">
                <h3>
                    Your account is not yet approved

                </h3>
            </div>
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