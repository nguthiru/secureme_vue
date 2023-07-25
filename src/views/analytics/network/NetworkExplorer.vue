<template>
    <div class="network-explorer">
        <div class="analytics-container">

            <div class="search-form container">

                <h4 class="section-title">Search Criminal</h4>

                <div class="form-container">
                    <label for="Search"> Search Criminal By Name</label>
                    <input type="text" v-model="search">
                </div>
                <div class="form-container">
                    <button class="primary-btn" @click="searchCriminal">Search</button>
                </div>
            </div>

            <div class="search-results card container">
                <h4 class="section-title">Search Results</h4>
                    <div class="row search-card" v-for="_search in searchResults"
                    :key="_search.idNumber" @click="searchCardClick(_search)">
                        <img :src="_search.imageUrl" alt="" class="profile-photo small">
                        <p class="detail_content" style="color:black; font-size: small; font-weight: 500;">
                            {{ _search.name }}

                        </p>
                    </div>
            </div>

        </div>
    </div>
</template>

<script>
import { useToast, } from 'vue-toastification'
var toast = useToast();

export default {
    data() {
        return {
            search: null,
            searchResults: []
        }
    },

    methods: {
        searchCriminal() {
            this.$axios.get('police/criminal/search/', {
                params: {
                    'q': this.search
                }
            }).then(res => {
                this.searchResults = res.data
            }).catch(() => {
                toast.warning("No results found")
            })
        },
        searchCardClick(e){
            this.$router.push({name:'network_explorer_detail', params:{id:e.idNumber}})
        }
    }
}

</script>