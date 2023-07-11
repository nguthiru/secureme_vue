<template>
    <div class="data_entry_card card">
        <div class="data_entry_header">
            <div class="progress-indicator" style="width:200px">

            </div>
            <div class="header-content">
                <div class="row back-btn" @click="$router.back()">
                    <i class="fa fa-chevron-left"></i>
                    <p>Back</p>
                </div>
                <h4>Enter Criminal Details</h4>
                <p class="form-error">{{ auth_error }}</p>
            </div>
        </div>
        <div class="data_entry_body">
            <div class="row space-btn">

                <div class="form-container">
                    <label for="ID NUMBER">ID Number</label>
                    <input type="number" id="id_input" v-model="id" disabled>
                </div>

                <div class="form-container">
                    <label for="Mugshot">Image</label>
                    <input type="file" accept="image/*" id="file_input" @change="pictureChange">
                </div>
            </div>
            <div class="form-container">
                <label for="ID NUMBER">Government Names</label>
                <input type="text" id="name_input" v-model="name">
            </div>
            <div class="row space-btn">
                <div class="form-container">
                    <label for="Age">Date of Birth</label>
                    <input type="date" id="age_input" v-model="age">
                </div>
                <div class="form-container">
                    <label for="Height">Height (cms)</label>
                    <input type="number" id="height_input" v-model="height">
                </div>
            </div>


        </div>

        <div class="data_entry_footer">
            <button class="primary-btn" @click="next">
                <div class="row">
                    <p>Next (Crime Entry)</p>
                    <i class="fa fa-chevron-right"></i>
                </div>
            </button>
        </div>

    </div>
</template>

<script>
// import { useToast,} from 'vue-toastification'

// var toast = useToast();

export default {
    components: {
    },

    data() {
        return {
            id: null,
            name: null,
            height: null,
            age: null,
            preview_image: null,
            auth_error: null
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
    mounted() {
        this.assignFields()
    },
    methods: {
        //isValid function on id,name,height and age, they shouldnt be null and not ""
        isNullOrUndefined(value) {

            if (value == null || value === "") {
                return true
            }
            return false
        },

        isValid() {
            if (!this.isNullOrUndefined(this.id) && !this.isNullOrUndefined(this.name) && !this.isNullOrUndefined(this.age) && !this.isNullOrUndefined(this.height)) {
                return true
            }
            this.auth_error = "Fill in all fields"
            return false
        },
        next() {

            if (this.isValid()) {
                //Save all the data to localstorage
                let imageUrl = "https://images.unsplash.com/photo-1551086188-51852b2e719d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJpc29uZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"


                let criminal_data = {
                    idNumber: this.id,
                    name: this.name,
                    dateOfBirth: this.age,
                    height: this.height,
                    imageUrl: imageUrl
                }
                this.$store.dispatch('police/setCriminal',criminal_data)
                this.$emit('next')

            }
        },
        assignFields() {
            this.id = localStorage.getItem('id_num')
            this.name = localStorage.getItem('criminal_name')
            this.age = localStorage.getItem('criminal_age')
            this.height = localStorage.getItem('criminal_height')
            this.preview_image = localStorage.getItem('criminal_image')
        },
        pictureChange() {
            // console.log("HELLO")
            // // upload image
            // const image = e.target.files[0];
            // const reader = new FileReader();
            // reader.readAsDataURL(image);
            // reader.onload = e => {
            //     this.previewImage = e.target.result;
            //     console.log(this.previewImage);
            // };
        }
    },

}
</script>