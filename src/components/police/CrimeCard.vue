<template>
    <div class="crime-card card fit-content default-padding" @click="showDetach = !showDetach">
        <div class="row">

            {{ crime.name }}

        </div>
        <div class="crime-card-detach" v-show="showDetach" >
            <div class="row" @click="detachCrime">
                <div class="small-icon" >
                    <i class="fa fa-times" style="margin-left: 1em; cursor: pointer;"></i>
                </div>
                Detach
            </div>
        </div>
    </div>
</template>

<script>

export default {

    name: 'CrimeCard',
    data() {
        return {
            showDetach: false
        }
    },
    props: {
        crime: {
            type: Object,
            required: true
        }
    },
    methods: {
        detachCrime() {
            console.log('clicked')
            this.$emit('detachCrime',this.$props.crime)
        }
    }

}
</script>