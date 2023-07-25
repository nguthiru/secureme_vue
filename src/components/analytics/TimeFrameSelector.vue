<template>
    <Teleport to="#app">
        <div class="popup">
            <div class="popup-header">
                <h4>Select A Timeframe</h4>
            </div>
            <div class="popup-body">
                <div class="form-container">
                    <label for="">Start Date</label>
                    <input type="date" name="" id="" v-model="startDate">
                </div>
                <div class="form-container">
                    <label for="">End Date</label>
                    <input type="date" name="" id="" v-model="endDate">
                </div>
            </div>
            <div class="popup-footer">
                <button class="primary-btn" @click="selectArea">Select This Timeframe</button>
            </div>
        </div>

    </Teleport>
</template>

<script>

export default{

    data(){
        return {
            startDate: null,
            endDate: null
        }
    },
    methods:{
        selectArea(){
            this.$emit('selectTime',this.startDate,this.endDate)
        }
    }
}
</script>