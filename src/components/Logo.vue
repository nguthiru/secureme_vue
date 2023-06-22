<template>

    <div class="logo-container">
        <img src="@/assets/logo.png" alt="SecureMe" class="logo">
        <p class="tagline" v-if="tagline">SecureMe</p>
    </div>
</template>

<style scoped>

.logo-container{
    display: flex;
    align-items: center;
}
.logo-container .tagline{
    margin-left: 0.5em;
    font-size: 1.1em;
    font-weight: bold;
}
.logo{
    width: 2.5em;
    height: 2.5em;
}
</style>

<script>

export default{
    name: 'logoIcon',
    props:{
        tagline: {
            default: true,
            type: Boolean
        }
    }
}

</script>