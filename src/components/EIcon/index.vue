<template>
  <i :class="iconClass"></i>
</template>

<script>
export default {
  name: 'e-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  }
}
</script>