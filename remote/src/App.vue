<template>
    <div>
        <h3>FACADE</h3>
        <UiButton></UiButton>
    </div>
</template>
<script>
import UiButton from './components/Button.vue';

export default {
    components: { UiButton },
};
</script>
<style>
html,
body {
    height: 100%;
}
#app {
    display: grid;
    height: 100vh;
    place-items: center;
}
</style>
