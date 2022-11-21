<script setup>
import { onMounted, ref } from 'vue'
import Story from '@/components/Story.vue'
import { ElMessage } from 'element-plus'

const serverUrl = import.meta.env.VITE_HTTP_URL

const data = ref([])
const current = ref(0)

const loopUpdate = () => {
  fetch(`${serverUrl}/comic`)
    .then((r) => r.json())
    .then((res) => {
      data.value = res?.data?.panels || []
      setTimeout(loopUpdate, 10000)
    })
    .catch((e) => {
      console.error(e)
      ElMessage(e?.message || 'UNKOWN ERROR')
    })
}

onMounted(() => {
  fetch(`${serverUrl}/comic`)
    .then((r) => r.json())
    .then((res) => {
      data.value = res?.data?.panels || []
      current.value = res?.data?.currentIndex || 0
      loopUpdate()
    })
    .catch((e) => {
      console.error(e)
      ElMessage(e?.message || 'UNKOWN ERROR')
    })
})
</script>

<template>
  <div class="desktop" v-loading="!data.length">
    <div class="relative">
      <div class="desktop__phone">
        <Story :data="data" :current="current" />
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.desktop {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #000;
}
.desktop__phone {
  padding: 0;
  /* border: 8px solid #333; */
  border-radius: 32px;
  overflow: hidden;
  width: 800px;
  height: 100vh;
}
</style>
