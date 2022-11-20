<script setup>
import { onMounted, ref } from 'vue'
import Story from '@/components/Story.vue'

const randomInt = (min, max) => Math.round(Math.random() * (max - min)) + min
const IMG_URL = 'http://iph.href.lu/640x480?fg=666666&bg=cccccc'

const current = 3
const data = ref([])
const raw = [
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: '/comic_example.jpg',
    text: 'The gaming industry is growing rapidly and there are many opportunities for innovation. I believe that gaming can open the door to a metaverse, and that by exploring different dimensions within games, we can develop a better understanding of the world around us.'
  },
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: IMG_URL,
    text: 'text'
  },
  {
    link: IMG_URL,
    text: 'text'
  }
]
raw.forEach((item) => (item.location = randomInt(1, 4)))
onMounted(() => {
  setTimeout(() => {
    data.value = raw
  }, 200)
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
