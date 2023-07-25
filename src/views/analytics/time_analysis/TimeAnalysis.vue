<template>

    <div class="time-analysis-view">
        <StationTime/>
        <div class="crime-analysis-area">
            <CrimeTime/>
        </div>
        
    </div>
</template>

<script>
import StationTime from '@/components/analytics/StationTime.vue';
import CrimeTime from '@/components/analytics/CrimeTime.vue';
export default{
components:{
    StationTime,CrimeTime
}
}
</script>