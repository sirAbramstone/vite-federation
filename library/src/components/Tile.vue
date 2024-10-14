<template>
    <div class="tile text-left u-select-none">
        <div class="tile-body cursor-pointer" @click="onClick">
            <h2>
                <slot name="header">Header</slot>
            </h2>
            <slot>{{ msg }}</slot>
            <PackageComponentAsync></PackageComponentAsync>
        </div>
    </div>
</template>
<script>
import { ref, defineAsyncComponent } from 'vue';
import { reverse } from 'lodash';
import { getState } from 'test/utils';
import { foo, bar } from 'test';

const PackageComponentAsync = defineAsyncComponent(() => import('test/components').then((m) => m.Component));

export default {
    components: { PackageComponentAsync },
    setup() {
        const msg = ref(`Lorem ipsum dolor sit amet consectetur adipisicing elit. ${foo}:${bar} | ${getState()}`);
        const onClick = () => {
            msg.value = reverse(msg.value.split('')).join('');
        };
        return { msg, onClick };
    },
};
</script>
