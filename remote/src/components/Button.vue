<template>
    <div>
        <button class="btn btn-primary" @click="increment">counter: {{ count }}</button>
        <pre>{{ state }}</pre>
        <PackageComponent></PackageComponent>
    </div>
</template>
<script>
import { ref } from 'vue';
import { now, getState } from 'shared/utils';
import { Component as PackageComponent } from 'shared/components';

export default {
    components: { PackageComponent },
    setup() {
        const count = ref(0);
        const increment = () => count.value++;
        return { count, increment, now: now(), state: getState() };
    },
};
</script>
