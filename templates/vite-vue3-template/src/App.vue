<template>
  <div class="flex-c text-[20px] text-[pink]">hello</div>
</template>
<script setup lang="ts">
  import useStore from '@/store';
  const { login } = useStore();
  console.log(login.firstLogin);
</script>
<style lang="scss" scoped></style>
