<template>
    <div class="data_entry_card card">
        <div class="data_entry_header">
            <div class="progress-indicator" style="width:650px">

            </div>
            <div class="header-content">
                <div class="row back-btn" @click="$router.back()">
                    <i class="fa fa-chevron-left"></i>
                    <p>Back</p>
                </div>
                <h4>Set Criminal Associations</h4>
                <div class="criminal_preview">
                    <div class="row">
                        <img v-if="preview_image" :src="preview_image" alt="Profile_Image" class="profile-photo small"
                            @change="pictureChange">
                        <h4>{{ name }}</h4>
                    </div>
                </div>

                <div class="crime_preview">

                </div>
            </div>
        </div>
        <div class="data_entry_body">
            
            <div class="container">

                <p class="label">Accomplice </p>
                <div class="flex-wrap" id="crime_nature_container">
                    <div class="crime-card card fit-content default-padding" v-for="accomplice in accomplices" :key="accomplice.id">
                        {{ accomplice.name }}
                    </div>
                    <div class="row text-btn-container" @click="asideContent = 'accomplice'">
                        <i class="fa fa-plus"></i>
                        <button class="text-btn">Attach Accomplice</button>
                    </div>
                </div>
            </div>




        </div>

        <div class="data_entry_footer">
            <button class="primary-btn" @click="next">
                <p>View Summary</p>
            </button>
        </div>

    </div>

    <Teleport to="#police_aside" v-if="asideContent === 'accomplice'">
        <AccompliceSelector @attachAccomplice="attachAccomplice"/>
    </Teleport>
    <!-- <Teleport to="#police_aside" v-if="asideContent === 'victim'">
        <VictimSelector @victimAttach="victim" />
    </Teleport> -->
</template>

<script>
import AccompliceSelector from './AccompliceSelector.vue'
// import VictimSelector from './VictimSelector.vue'
export default {
    components: {
        AccompliceSelector
    },

    data() {
        return {
            id: null,
            name: null,
            height: null,
            age: null,
            preview_image: null,
            asideContent: null,
            victims: [],
            accomplices:[]
        }
    },
    computed: {
        getImageUrl() {
            if (this.preview_image != null) {
                return this.preview_image
            }
            return "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"
        }
    },
    methods: {
        next() {
            //save the accomplices as JSON to localStorage
            localStorage.setItem('accomplices',JSON.stringify(this.accomplices))
            this.$emit('next')
        },
        attachFields(){
            let accomplices_json = localStorage.getItem('accomplices')
            if(accomplices_json!=null){
                this.accomplices = JSON.parse(accomplices_json)
            }
            else{
                this.accomplices=[]
            }
        },
        attachAccomplice(accomplice){
            this.accomplices.push(accomplice)

        }

    },

    mounted(){
        this.attachFields()
    }
}
</script>