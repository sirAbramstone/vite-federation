<template>
    <div class="tile text-left u-select-none">
        <div class="tile-body cursor-pointer" @click="onClick">
            <h2>
                <slot name="header">Header</slot>
            </h2>
            <slot>{{ msg }}</slot>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { reverse } from 'lodash';

export default {
    setup() {
        const msg = ref('Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, nihil.');
        const onClick = () => {
            msg.value = reverse(msg.value.split('')).join('');
        };
        return { msg, onClick };
    },
};
</script>
