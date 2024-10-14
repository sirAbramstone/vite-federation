<template>
    <div>
        <h3>FACADE</h3>
        <UiButton></UiButton>
        <UiTile></UiTile>
    </div>
</template>
<script>
import UiButton from './components/Button.vue';
import UiTile from './components/Tile.vue';

export default {
    components: { UiButton, UiTile },
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
