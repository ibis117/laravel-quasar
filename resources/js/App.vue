<template>
    <router-view />
</template>

<script setup>

import {useAuthStore} from "./store/auth-store";

const authStore = useAuthStore();

authStore.profile()

</script>

<style scoped>

</style>
