<template>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</template>
<script setup lang="ts">
  defineOptions({
    name: 'Demo',
  });

  const list = ref<number[]>([]);
  const loading = ref(false);
  const finished = ref(false);

  const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        list.value.push(list.value.length + 1);
      }

      // 加载状态结束
      loading.value = false;

      // 数据全部加载完成
      if (list.value.length >= 10) {
        finished.value = true;
      }
    }, 1000);
  };
</script>
<style lang="scss" scoped></style>
