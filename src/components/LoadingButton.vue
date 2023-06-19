<template>
    <button>
        <Loader v-if="load" />
        <slot v-else>

        </slot>
    </button>
</template>

<script>
import Loader from './LoadingSpinner'

export default {
    name: "LoadingButton ",
    components: {
        Loader
    },
    props: ['load']
}

</script>