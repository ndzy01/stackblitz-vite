<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const val = ref('');
const className = ref(
  (globalThis.sessionStorage.getItem('flag') || '') === 'ndzy'
    ? 'hide'
    : 'show',
);
const isShow = (show = 'show') => {
  const ele1 = document.getElementsByClassName('sidebar');
  const ele2 = document.getElementsByClassName('navbar');

  if (ele1 && ele1[0]) {
    ele1[0].setAttribute('class', `${show} sidebar`);
  }

  if (ele2 && ele2[0]) {
    ele2[0].setAttribute('class', `${show} navbar`);
  }
};
watch(val, (a) => {
  globalThis.sessionStorage.setItem('flag', a);

  if (a === 'ndzy') {
    className.value = 'hide';
    isShow('show');
  } else {
    className.value = 'show';
    isShow('hide');
  }
});
onMounted(() => {
  if ((globalThis.sessionStorage.getItem('flag') || '') === 'ndzy') {
    isShow('show');
  } else {
    isShow('hide');
  }
});
</script>

<template>
  <a-input :class="className" v-model:value="val" placeholder="请输入密码" />
</template>
