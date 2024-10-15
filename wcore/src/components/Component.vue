<template>
    <div class="tile pad-1 bg-primary">
        <code class="text-xsmall">wcore component</code>
        <pre>{{ state }}</pre>
    </div>
</template>
<script>
import dayjs from 'dayjs';
import { ref } from 'vue';
// @NOTE ВСЕГДА ЮЗАЙ АЛИАСЫ при импорте @see package.json 'wcore/utils' вместо относительных путей '../utils'
// относительные пути ломают module-federation!
import { getState } from 'wcore/utils';

export default {
    setup() {
        const date = dayjs().format();
        const msg = ref(date);
        return { msg, state: getState() };
    },
};
</script>
