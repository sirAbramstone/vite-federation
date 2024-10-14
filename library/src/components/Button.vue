<template>
    <div>
        <button class="btn btn-primary" @click="increment">counter: {{ count }}</button>
        {{ now }} {{ state }}
        <PackageComponent></PackageComponent>
    </div>
</template>
<script>
import { ref } from 'vue';
import { foo, bar } from 'test';
import { now, getState } from 'test/utils';
import { getState as getStatePseudoPackage } from '@test/utils';
import { Component as PackageComponent } from 'test/components';

export default {
    components: { PackageComponent },
    setup() {
        const count = ref(0);
        const increment = () => count.value++;
        return { count, increment, now: now(), state: [getStatePseudoPackage(), getState()], foo, bar };
    },
};
</script>
