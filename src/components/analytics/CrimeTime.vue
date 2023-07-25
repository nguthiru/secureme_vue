<template>
        <CrimeSelector @selectCrime="selectCrime" v-if="selectedPopup==='crime'"/>
    <div class="crime-weekly-analysis">
        <div class="select-station row" @click="selectedPopup='crime'">
            <p v-if="selectedCrime===null || selectedCrime===''">Select Crime</p>
            <p v-else>{{ selectedCrime.name }}</p>
            <i class="fa fa-chevron-down"></i>
        </div>

        <div class="time-container">
            <WeeklyCrime :crime="selectedCrime" v-if="selectedCrime!=null"/>
            <p v-else>Select a crime to get started</p>
        </div>
        <div class="time-container">
            <DailyCrime :crime="selectedCrime" v-if="selectedCrime!=null"/>

        </div>
    </div>




    
</template>

<script>
import CrimeSelector from './CrimeSelector.vue';
import WeeklyCrime from './WeeklyCrime.vue';
import DailyCrime from './DailyCrime.vue';
export default{

    components:{
        CrimeSelector,
        WeeklyCrime,
        DailyCrime
    },
    data(){
        return{
            selectedCrime:null,
            selectedPopup:"",
            showCrimeSelector:false
        }
    },
    methods:{
        selectCrime(e){
            this.selectedCrime=e
            this.selectedPopup=""
        }
    }
}
</script>