<template>
    <div class="crime-selector">
        <h3>Select Crime</h3>

        <select name="crime_select" id="crime_select" v-model="selectedCrime">
            <option v-for="crime in crimes" :value="crime.id" :key="crime.id">{{ crime.name }}</option>
        </select>

        <div class="column" v-if="_selectedCrime">
            <div class="row-start" id="crime-info">
                <i class="fa fa-info"></i>
                <p id="crime-description">{{_selectedCrime.description}}</p>

            </div>

        </div>

        <button class="primary-btn" @click="attach"> Attach</button>
    </div>
</template>

<script>
import { useToast,} from 'vue-toastification'

var toast = useToast();
export default{

    name: 'CrimeSelector',

    data(){
        return {
            crimes:[],
            selectedCrime:null
        }
    },
    computed:{
        _selectedCrime(){
            if(this.selectedCrime==null){
                return null
            }
            return this.crimes.find(crime=>crime.id==this.selectedCrime)
        }
    },
    methods:{
        attach(){
            this.$emit('crimeAttach',this._selectedCrime)
        },
        populateCrimes(){
            //populate crimes from the server
            this.$axios.get('police/crime').then(res=>{
                console.log(res)
                this.crimes=res.data
                this.selectedCrime=this.crimes[0].id

            }).catch(()=>{
                toast.warning("Could not fetch crimes from server")
            })
        }
    },
    mounted(){
        this.populateCrimes()
    }
}

</script>