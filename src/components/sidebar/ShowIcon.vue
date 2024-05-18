<template>
  <button>
    <Icon />
  </button>
</template>
  
<script setup>
  import { defineAsyncComponent } from 'vue';

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  });
  
  const Icon = defineAsyncComponent(() =>
    import (`@/assets/sidebar/${props.name}.svg`)
  );

</script>