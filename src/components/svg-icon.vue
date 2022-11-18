<script setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const iconClass = computed(() => `icon-${props.name.replace('/', '-')}`)
</script>

<template>
  <svg :class="['svg-icon', iconClass]" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style lang="postcss">
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
}
</style>
