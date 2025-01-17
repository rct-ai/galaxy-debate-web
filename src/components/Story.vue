<script setup>
import { computed, ref, watch } from 'vue'
import { Keyboard, Lazy } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import vbsButton from './vbs-button.vue'
import svgIcon from './svg-icon.vue'

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
const startCount = computed(() => props.data[0]?.index || 0)

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

watch(
  () => props.current,
  () => {
    swiperRef.value.slideTo(props.current - props.data[0]?.index, 0)
  }
)

watch(
  () => props.data,
  (value, old) => {
    if (value?.length !== old?.length) return

    const diff = value[0]?.index - old[0]?.index || 0
    if (diff > 0) {
      if (diff < props.data.length) {
        swiperRef.value.slideTo(currentSlideIndex.value - diff, 0)
      } else {
        swiperRef.value.slideTo(0, 0)
      }
    }
  }
)
</script>

<template>
  <div class="soul-story">
    <div class="soul-story-content">
      <swiper
        class="swiper-custom"
        :space-between="50"
        @slide-change="handleSlideChange"
        @swiper="(swiper) => (swiperRef = swiper)"
        :modules="[Keyboard, Lazy]"
        :lazy="{ loadPrevNext: true }"
        :keyboard="{ enable: true }"
      >
        <swiper-slide v-for="item in data" :key="item.index">
          <div class="single-image-slide">
            <img
              class="item-image swiper-lazy"
              :data-src="item.link"
              src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              alt=""
            />
            <div class="item-text">
              {{ item.text }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="flex justify-center">
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
          {{ startCount + currentSlideIndex + 1 }}/{{ startCount + data.length }}
        </div>
        <vbs-button
          size="toolbar"
          clip="br-clip"
          :disabled="currentSlideIndex >= data.length - 1"
          @click="handleSlideButtonClick(1)"
        >
          <template v-if="currentSlideIndex >= data.length - 1">
            To be continue
          </template>
          <template v-else>
            Next
            <svg-icon name="arrow/right" />
          </template>
        </vbs-button>
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
.soul-story {
  padding: 10px 20px 10px;
  @apply flex flex-col h-full;

  .single-image-slide {
    @apply flex flex-col items-center justify-center h-full;

    .item-image {
      object-fit: cover;
      object-position: top;
      aspect-ratio: 16 / 9;
      width: 100%;
      background-color: #202020;
    }
    .item-text {
      text-align: center;
      padding-top: 8px;
      font-size: 18px;
      line-height: 1.5;
      font-family: Patrickhand;
    }
  }

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
    width: 400px;
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
