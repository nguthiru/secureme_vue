<template>
    <div class="crime-selector">
        <h3>Select Crime</h3>

        <select name="crime_select" id="crime_select" v-model="selectedCrime">
            <option v-for="crime in crimes" :value="crime.id" :key="crime.id">{{ crime.name }}</option>
        </select>

        <div class="column">
            <div class="row-start" id="crime-info">
                <i class="fa fa-info"></i>
                <p id="crime-description">{{_selectedCrime.description}}</p>

            </div>

        </div>

        <button class="primary-btn" @click="attach"> Attach</button>
    </div>
</template>

<script>
export default{

    name: 'CrimeSelector',

    data(){
        return {
            crimes:[
                {
                    id:1,
                    name:"Robbery With Violence",
                    description:"Robbery with violence is a crime where the perpetrator uses violence or intimidation to steal from a victim. This is a serious crime that can result in a lengthy prison sentence."
                },
                {
                    id:2,
                    name:"Fraud",
                    description: "Faking yourself to be someone else "
                }
            ],
            selectedCrime:1
        }
    },
    computed:{
        _selectedCrime(){
            return this.crimes.find(crime=>crime.id==this.selectedCrime)
        }
    },
    methods:{
        attach(){
            this.$emit('crimeAttach',this._selectedCrime)
        }
    }
}

</script>