<template>
    <div class="crime-selector">
        <h3>Select Accomplice</h3>
        <div class="form-container">
            <div class="row">

                <input type="text" placeholder="Name or ID Number">
                <button class="primary-btn search-btn">

                        <i class="fa fa-search"></i>
                </button>
            </div>

        </div>

        <div class="column">

            <p class="caption">Search Results</p>
            <div class="list">
                <div class="search-card" v-for="search in search_results" :key="search.id">
                    <img :src="search.image " alt="" class="Profile Photo">
                    {{ search.name }}

                </div>
            </div>
        </div>

        <div class="column">
            <div class="row-start" id="crime-info">
                <i class="fa fa-info"></i>
                <p id="crime-description">History: No Previous History</p>

            </div>

        </div>

        <button class="primary-btn" @click="attach"> Attach</button>
    </div>
</template>

<script>
//remember to get existing associations and populate
export default{

    data(){
        return {
            search_results:[],
            selected:null,
            associations:[]
        }
    },

    attach(){
        this.$emit('attachAccomplice',this.selected)
    }
    
}
</script>