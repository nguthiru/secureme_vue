<template>
    
    <div class="tiny-form auth-container" id="approval-form">
        <div class="form-header row">
            <button @click="tab=0"  class="tab_button" :class="{active: tab===0}">Police Request</button>
            <button @click="tab=1" class="tab_button" :class="{active: tab===1}">Analytics Request</button>
        </div>
        
        <PoliceApprovalForm v-if="tab===0"/>

        <AnalysisApprovalForm v-if="tab===1"/>
    </div>
</template>
<script>
import PoliceApprovalForm from '@/components/approval/PoliceForm.vue'
import AnalysisApprovalForm from '@/components/approval/AnalyticsForm.vue'
export default {

    data() {
        return {
            tab: 0
        }

    },
    components:{
        PoliceApprovalForm,
        AnalysisApprovalForm
    }
}

</script>