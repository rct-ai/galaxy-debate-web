<script setup>
import { computed, ref, watch } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import vbsButton from './vbs-button.vue'
import svgIcon from './svg-icon.vue'

const SLIDE_ITEM_SIZE = 2
const SLIDE_LAYOUT_LIST = ['two-row', 'two-row-skew-up', 'two-row-skew-down']

const TEXT_LOCATION_MAP = {
  1: 'top-left',
  2: 'top-right',
  3: 'bottom-right',
  4: 'bottom-left',
}

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  current: {
    type: Number,
    default: 1
  }
})

const currentSlideIndex = ref(0)
const storySlides = computed(() => {
  const slides = []
  props.data.map((item, i) => {
    const newItem = {
      ...item,
      textLayout: TEXT_LOCATION_MAP[item.location]
    }
    const slideIndex = Math.floor(i / SLIDE_ITEM_SIZE)
    let slide = slides[slideIndex]
    if (!slide) {
      slides[slideIndex] = slide = {
        layout: SLIDE_LAYOUT_LIST[slideIndex % SLIDE_LAYOUT_LIST.length],
        items: []
      }
    }
    slide.items.push(newItem)
  })
  return slides
})

const swiperRef = ref(null)

const handleSlideChange = (swiper) => {
  currentSlideIndex.value = swiper.activeIndex
}

const handleSlideButtonClick = (dir) => {
  if (dir > 0) {
    swiperRef.value.slideNext()
  } else {
    swiperRef.value.slidePrev()
  }
}

watch(() => props.data, () => {
  console.log(props.current)
  swiperRef.value.slideTo(props.current - 1)
})
</script>

<template>
  <div class="soul-story">
    <div class="soul-story-content">
      <swiper
        class="swiper-custom"
        :space-between="50"
        @slide-change="handleSlideChange"
        @swiper="(swiper) => (swiperRef = swiper)"
      >
        <swiper-slide v-for="(slide, i) in storySlides">
          <div :class="['slide', `layout-${slide.layout}`]">
            <div v-for="item in slide.items" class="slide-item">
              <img class="item-image" :src="item.link" />
              <div :class="['item-text', `layout-${item.textLayout}`]">
                {{ item.text }}
              </div>
            </div>
            <div v-if="slide.items.length < 2" class="slide-item flex items-center justify-center">
              To be continue...
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="soul-story-toolbar">
      <vbs-button
        size="toolbar"
        clip="bl-clip"
        :disabled="!currentSlideIndex"
        @click="handleSlideButtonClick(-1)"
      >
        <svg-icon name="arrow/left" />
        Prev
      </vbs-button>
      <div class="slide-indicator">
        {{ currentSlideIndex + 1 }}/{{ storySlides.length }}
      </div>
      <vbs-button
        size="toolbar"
        clip="br-clip"
        :disabled="currentSlideIndex >= storySlides.length - 1"
        @click="handleSlideButtonClick(1)"
      >
        <template v-if="currentSlideIndex >= storySlides.length - 1">To be continue</template>
        <template v-else>
          Next
          <svg-icon name="arrow/right" />
        </template>
      </vbs-button>
    </div>
  </div>
</template>

<style lang="postcss">
.soul-story {
  padding: 10px 20px 10px;
  @apply flex flex-col h-full;

  &-content {
    position: relative;
    @apply overflow-hidden flex-1;
  }

  .swiper-custom {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
    .swiper-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      transition-property: transform;
      box-sizing: content-box;
    }
    .swiper-slide {
      flex-shrink: 0;
      width: 100%;
      height: 100%;
      position: relative;
      transition-property: transform;
    }
  }
  .slide {
    @apply flex flex-col;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    &-item {
      position: relative;
      flex: 1;
      overflow: hidden;
      background: #202020;
    }

    .item-image {
      object-fit: cover;
      object-position: top;
      width: 100%;
      height: 100%;
    }

    .item-text {
      position: absolute;
      max-width: 270px;
      padding: 10px;
      font-weight: 400;
      font-size: 12px;
      line-height: 17px;
      color: var(--color-secondary-text);
      background: var(--color-primary);
      border: 1px solid var(--color-secondary);
      white-space: pre-line;

      /* 文字布局 */
      &.layout-top-left {
        left: 10px;
        top: 10px;
      }

      &.layout-top-right {
        right: 10px;
        top: 10px;
      }

      &.layout-bottom-right {
        right: 10px;
        bottom: 10px;
      }

      &.layout-bottom-left {
        left: 10px;
        bottom: 10px;
      }
    }

    /* Slide 子元素布局 */
    &.layout-two-row {
      /* gap: 10px; */
      .slide-item:first-child {
        margin-bottom: 10px;
      }
    }

    &.layout-two-row-skew-down,
    &.layout-two-row-skew-up {
      --skew-pct: 10%;

      .slide-item:first-child {
        .item-text[class*='layout-bottom'] {
          margin-bottom: 25px;
        }
      }
      .slide-item:last-child {
        margin-top: calc(-0.58 * var(--skew-pct));

        .item-text[class*='layout-top'] {
          margin-top: 25px;
        }
      }
    }

    &.layout-two-row-skew-up {
      .slide-item:first-child {
        clip-path: polygon(0 0, 100% 0%, 100% calc(100% - var(--skew-pct)), 0% 100%);
      }
      .slide-item:last-child {
        clip-path: polygon(0 var(--skew-pct), 100% 0%, 100% 100%, 0% 100%);
      }
    }

    &.layout-two-row-skew-down {
      .slide-item:first-child {
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 calc(100% - var(--skew-pct)));
      }
      .slide-item:last-child {
        clip-path: polygon(0 0, 100% var(--skew-pct), 100% 100%, 0 100%);
      }
    }
  }

  &-toolbar {
    @apply flex justify-between items-center;
    padding-top: 10px;

    .vbs-button {
      @apply flex items-center;
      min-width: 82px;
    }

    .svg-icon {
      font-size: 12px;
    }

    .icon-arrow-left {
      margin-right: 6px;
    }

    .icon-arrow-right {
      margin-left: 6px;
    }
  }
}
</style>
