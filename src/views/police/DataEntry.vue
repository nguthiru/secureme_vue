<template>
    <div class="data_entry_page">

        <CriminalEntryID v-if="getCurrentSection==1" @next="goToSection(2)"/>
        <CriminalEntry v-if="getCurrentSection==2" @next="goToSection(3)"/>
        <CrimeEntry v-if="getCurrentSection==3" @next="goToSection(4)"/>
        <AssociationEntry v-if="getCurrentSection==4" @next="goToSection(5)"/>
    </div>
</template>

<script>
import CriminalEntryID from '@/components/police/IDEntry.vue'
import CriminalEntry from '@/components/police/CriminalEntry.vue'
import CrimeEntry from '@/components/police/CrimeEntry.vue'
import AssociationEntry from '@/components/police/AssociationEntry.vue'
export default {
    components:{
        CriminalEntryID,
        CriminalEntry,
        CrimeEntry,
        AssociationEntry
    },

    computed:{

        getCurrentSection(){
            let urlPage = this.$route.query.page;
            console.log(urlPage)
            if(urlPage===1 || urlPage===null || urlPage===undefined){
                return 1;
            }
            else if(urlPage>5){
                return 404
            }
            return  urlPage;
        }
    },
    methods:{
        goToSection(num){
            this.$router.push(`?page=${num}`)
        }
    },
    data(){
        return {
            section:1
        }
    },
    name: 'DataEntry',
    props: {
        
    }
}

</script>