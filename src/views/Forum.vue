<script lang="ts" setup>
import { computed, onBeforeMount, ref, render } from "vue";
import authorService from "../service/authors/index";
import postService from "../service/posts/index";
import { useRouter } from "vue-router";
import { Author, Post } from "../types/index";
import dayjs from "dayjs";

const router = useRouter();

const isLoading = ref<boolean>(false);

const allAuthors = ref<Author[]>([]);

const allPosts = ref<Post[]>([]);

const timeZone = ref<string>(
  new Intl.DateTimeFormat().resolvedOptions().timeZone.toString()
);

const renderPost = computed(() => {
  const authorsById = allAuthors.value.map((item: Author) => {
    return { id: item.id, name: item.name, avatar: item.avatar_url };
  });

  const mappedPost = allPosts.value.map((ele: Post) => {
    const author = authorsById.find(
      (item: { id: number; name: string; avatar: string }) =>
        item.id === ele.author_id
    );

    return { ...ele, author: author?.name, author_avatar: author?.avatar };
  });

  return mappedPost;
});

onBeforeMount(() => {
  isLoading.value = true;
  Promise.all([authorService.getAuthors, postService.getPosts])
    .then(([authors, posts]) => {
      console.log(authors);
      console.log(posts);
      allAuthors.value = authors as Author[];
      allPosts.value = posts as Post[];
    })
    .catch(() => router.push("/error"))
    .finally(() => (isLoading.value = false));
});
</script>

<template>
  <a-spin
    :spinning="isLoading"
    tip="Loading..."
    class="flex items-center justify-center min-h-device"
  >
    <div class="container sm:mx-auto my-4">
      <header class="mx-2 sm:mx-0">
        <h1 class="font-bold text-[24px]">MAQE Forum</h1>
        <p class="mt-2 text-[14px] font-normal">
          Your current timezone is: <span>{{ timeZone }}</span>
        </p>
      </header>

      <template v-for="(post, idx) in renderPost" :key="post.id">
        <card
          :card_class="idx === renderPost.length - 1 ? 'mb-[200px]' : ''"
          :author_avatar="post.author_avatar"
          :author="post.author"
          :posted_date="
            dayjs(post.created_at).format('dddd, MMMM DD, YYYY, HH:mm')
          "
          :img="post.image_url"
          :title="post.title"
          :body="post.body"
        />
      </template>
    </div>
  </a-spin>
</template>
