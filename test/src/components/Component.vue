<template>
    <div class="tile pad-1 bg-primary">
        <pre>{{ state }}</pre>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { ref } from 'vue';
import { getState } from 'test/utils';

export default {
    setup() {
        const date = dayjs().format();
        const msg = ref(date);
        return { msg, state: getState() };
    },
};
</script>
