<template>
    <div>{{ msg }}</div>
</template>
<script>
import dayjs from 'dayjs';
import { ref } from 'vue';
import { getState } from '../utils';

export default {
    setup() {
        const date = dayjs().format();
        const msg = ref(`${date} :: ${getState()}`);
        return { msg };
    },
};
</script>
