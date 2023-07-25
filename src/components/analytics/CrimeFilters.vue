<template>
    <div class="crime-filters">
        <div class="row">
            <FilterCard v-for="crime in crimes" :key="crime.id" :crime="crime" :isActive="selectedFilters.includes(crime)" @filter="clickFilter" />
        </div>
    </div>
</template>

<script>
import FilterCard from './FilterCard.vue'
export default {
    components:{
        FilterCard
    },
    name: 'CrimeFilters',
    computed:{
        
    },

    data() {
        return {
            crimes: [],
            selectedFilters: [],
        }
    },

    methods: {
        getCrimes() {
            this.$axios.get('police/crime').then(res => {
                this.crimes = res.data

            }).catch(() => {
            })
        },
        clickFilter(e){
            if(this.selectedFilters.includes(e)){
                this.selectedFilters= this.selectedFilters.filter(c=>c.id!=e.id)
            }
            else{

                this.selectedFilters.push(e)
            }
            this.$emit('filter',this.selectedFilters)
        },
        isFilterActive(e){
            return this.selectedFilters.includes(e)
        }


    },
    mounted(){
        this.getCrimes()
    }

}
</script>