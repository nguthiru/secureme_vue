<template>
    <div class="crime-selector">
        <h3>Select Accomplice</h3>
        <div class="form-container">
            <div class="row">

                <input type="text" placeholder="Name or ID Number" v-model="search">
                <button class="primary-btn search-btn" @click="searchCriminals">

                    <i class="fa fa-search"></i>
                </button>
            </div>

        </div>

        <div class="column">

            <p class="caption">Search Results</p>
            <div class="list">
                <SearchCard v-for="search in search_results" :key="search.id" :search="search" @deselect="detach" @select="attach" :selected="accomplices.map(e=>e.id).includes(search.id)"/>
                    

                
            </div>
        </div>

        <div class="column">
            <div class="row-start" id="crime-info">
                <i class="fa fa-info"></i>
                <p id="crime-description">History: No Previous History</p>

            </div>

        </div>

    </div>
</template>

<script>
//remember to get existing associations and populate
import { useToast, } from 'vue-toastification'
import SearchCard from './SearchCard.vue';
var toast = useToast();
export default {
    components:{
        SearchCard
    },
    data() {
        return {
            search: null,
            search_results: [],
            selected: null,
        }
    },
    props:{
        accomplices:{
            required:true
        }
    },
    methods: {
        attach(e) {
            this.$emit('attachAccomplice', e)
        },
        detach(e){
            this.$emit('detachAccomplice',e)
        },
        searchCriminals() {
            console.log
            this.$axios.get('police/criminal/search/', {
                params: {
                 'q': this.search
                }
            }).then(res => {
                this.search_results = res.data
            }).catch(() => {
                toast.warning("No results found")
            })
        }
    }

}
</script>