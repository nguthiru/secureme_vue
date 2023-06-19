<template>
    <div>
      <input
        v-for="index in length"
        :key="index"
        v-model="pinCode[index - 1]"
        type="text"
        class="pin-input"
        maxlength="1"
        @input="handleInput"
      >
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      length: {
        default:4,
        type: Number,
        required: true
      },
      onComplete: {
        type: Function,
        default: () => {}
      },
      onChange: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {
        pinCode: []
      };
    },
    watch: {
      value: {
        immediate: true,
        handler(newValue) {
            console.log(newValue)
          if (newValue.length === this.$props.length) {
            this.onComplete(newValue);
          }
          this.pinCode = newValue.split('');
        }
      },
      pinCode: {
        handler(newPinCode) {
          const formattedPinCode = newPinCode.join('');
          this.$emit('input', formattedPinCode);
          this.onChange(formattedPinCode);
          if (formattedPinCode.length === this.length) {
            this.onComplete(formattedPinCode);
          }
        },
        deep: true
      }
    },
    methods: {
      handleInput(event) {
        const inputIndex = event.target.getAttribute('data-index');
        if (event.target.value.length > 1) {
          this.pinCode[inputIndex] = event.target.value[0];
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .pin-input {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    text-align: center;
  }
  </style>
  