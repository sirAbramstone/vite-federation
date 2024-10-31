<template>
    <div class="tile pad-1 bg-primary">
        <code class="text-xsmall">shared component</code>
        <pre>{{ state }}</pre>
    </div>
</template>
<script>
import { getState } from 'shared/utils';

export default {
    setup() {
        return { state: getState() };
    },
};
</script>
