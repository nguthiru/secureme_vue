<template>
    <Teleport to="#app">
        <div class="popup">
            <div class="popup-header">
                <h4>Select a crime</h4>
                <p class="caption">Select a crime for analysis</p>
            </div>
            <div class="popup-body">
                <select name="" id="" v-model="selectedCrime">
                    <option :value="crime.id" v-for="crime in crimes" :key="crime.id">{{ crime.name }}</option>

                </select>
            </div>
            <div class="popup-footer">
                <button class="primary-btn" @click="selectCrime">Select This Crime</button>
            </div>
        </div>

    </Teleport>
</template>

<script>
export default {

    data() {
        return {
            crimes: [],
            selectedCrime: null
        }
    },
    methods: {
        selectCrime() {
            if (this.selectedCrime != null) {
                let crime = this.crimes.find(e => e.id === this.selectedCrime)
                this.$emit('selectCrime', crime)
            }
    },
        getCrimes() {
            this.$axios.get('police/crime/').then(res => {
                this.crimes = res.data
                this.selectedCrime = this.crimes[0].id
            }).catch(e => {
                console.log(e)
            })
        }
    },

    mounted(){
        this.getCrimes()
    }
}


</script>