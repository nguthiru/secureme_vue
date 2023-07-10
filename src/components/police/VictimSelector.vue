<template>
    <div class="crime-selector">
        <h3>Add Victim</h3>
        <div class="form-container">
            <label for="">Gender</label>
            <select name="crime_select" id="crime_select" v-model="selectedGender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </div>

        

        <button class="primary-btn" @click="victimAttach"> Attach Victim</button>
    </div>
</template>

<script>
export default{

    data(){
        return {
            selectedGender: "Male",
        }
    },

    methods:{
        victimAttach(){
            this.$emit('victimAttach',this.selectedGender)
        }
    }
}

</script>