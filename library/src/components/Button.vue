<template>
    <button class="btn btn-primary" @click="increment">counter: {{ count }}</button>
</template>
<script>
import { ref } from 'vue';

export default {
    setup() {
        const count = ref(0);
        const increment = () => count.value++;
        return { count, increment };
    },
};
</script>
