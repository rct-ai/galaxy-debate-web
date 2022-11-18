<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    // 'primary', 'ghost'
    default: 'primary'
  },
  clip: {
    type: String,
    default: 'tl-clip br-clip'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const clipArg = computed(() => {
  const arg = [props.clip]
  if (props.type === 'ghost') {
    arg.push('border')
  }
  return arg.join(' ')
})
</script>

<template>
  <!-- iOS 需配置 touchstart 才能展现 :active 伪类效果 -->
  <button
    class="vbs-button"
    :class="[type, `size-${size}`]"
    :disabled="disabled"
    :data-augmented-ui="clipArg"
    @touchstart.native="() => {}"
  >
    <slot>Button</slot>
  </button>
</template>

<style lang="postcss" scoped>
.vbs-button {
  height: 40px;
  padding: 0 1em;
  background-color: var(--color-brand);
  font-size: 14px;
  color: black;
  transition: all 0.15s ease-in-out;
  --aug-tl: 7px;
  --aug-tr: 7px;
  --aug-bl: 7px;
  --aug-br: 7px;
  --aug-border-all: 0;
  &.size-small {
    height: 24px;
    font-size: 12px;
    --aug-tl: 5px;
    --aug-br: 5px;
  }
  --aug-border-all: 0;
  &.size-toolbar {
    height: 30px;
    padding-left: 17px;
    padding-right: 17px;
    font-size: 10px;
  }

  &:active {
    background-color: var(--color-brand-active);
  }

  &:disabled,
  &[disabled] {
    background-color: var(--color-brand-disabled);
  }
  &.ghost {
    background-color: transparent;
    color: var(--color-brand);
    --aug-border-all: 1px;
    --aug-border-bg: var(--color-brand);

    &:active {
      background-color: rgba(var(--color-brand-rgb), 0.15);
    }

    &:disabled,
    &[disabled] {
      opacity: 0.5;
      &:active {
        background-color: transparent;
      }
    }
  }
}
</style>
