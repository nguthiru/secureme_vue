<template>
    <div class="form-container">
        <label :for="label">{{ label }}</label>
        <input :type="type"  :placeholder="placeholder">
        <p class="form-error" v-if="error"></p>
    </div>
</template>

<script>
export default{

    name: 'FormInput',
    props: [
    'error','label','placeholder','type'
    ],
    computed:{
      
    }
}

</script>