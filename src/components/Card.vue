<script setup lang="ts">
import { computed, defineProps } from "vue";

interface CardProps {
  img?: string;
  author_avatar?: string;
  author?: string;
  posted_date?: string;
  card_class?: string;
  title?: string;
  body?: string;
}

const props = defineProps<CardProps>();
const { img, author_avatar, author, posted_date, card_class, title, body } =
  props;

const cardClass = computed(() => {
  if (card_class) {
    return ["card", "px-4"].concat(card_class).join(" ");
  }

  return "card px-4";
});
</script>

<template>
  <div :class="cardClass">
    <slot name="header">
      <div class="flex items-center flex-wrap gap-2 pt-2">
        <img
          class="rounded-full max-w-[20px] max-h-[20px] basis-[20px]"
          :src="author_avatar"
          loading="lazy"
          alt="author_avatar"
        />
        <div class="text-[12px] text-[#F5805F] font-semibold">{{ author }}</div>
        <div class="text-[12px] text-[#93ABBA] font-semibold">
          posted on : <span>{{ posted_date }}</span>
        </div>
      </div>
      <hr class="-mx-4 my-2 text-[#C3DFF0]" />
    </slot>

    <slot>
      <div class="pb-2 flex items-start gap-5 flex-wrap">
        <img
          class="w-full h-full max-w-[200px] max-h-[200px] basis-[200px]"
          :src="img"
          loading="lazy"
          alt="post-image"
        />

        <section class="flex-1" id="post-detail">
          <h2 class="font-bold">{{ title }}</h2>
          <p class="mt-2 font-normal">{{ body }}</p>
        </section>
      </div>
    </slot>
  </div>
</template>
