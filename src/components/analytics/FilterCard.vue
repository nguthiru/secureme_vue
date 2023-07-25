<template>
    <div class="filter-card card" :class="{ 'filter-active': isActive }" 
        @click="$emit('filter',crime)">{{ crime.name }}</div>
</template>

<script>

export default{

    name: "FilterCard",
    props:{
        isActive:{
            type:Boolean,
            default:false
        },
        crime:{
            required: true
        }
    }
}
</script>