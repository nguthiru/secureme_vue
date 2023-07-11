<template>
    <div class="search-card" :class="{'search-card-selected':selected}" @click="select">
        <img :src="search.image_url" alt="" class="profile-photo small">
        <p>

            {{ search.name }}
        </p>

        <div class="select-indicator" :class='{"select-indicator-inactive":!selected,"select-indicator-active":selected}'>

        </div>
    </div>
</template>

<script>
export default{

    props: {
        search: {
            type: Object,
            required: true
        },
        selected: {
            type:Boolean,
            default: false
        }
    },
    methods: {
        select() {
            if(this.$props.selected==false){

                this.$emit('select', this.search)
            }
            else{
                this.$emit('deselect',this.search)
            }
        }
    }
}

</script>

