<template>
    <div>
        <h3>FACADE</h3>
        <UiButton></UiButton>
        <UiTile></UiTile>
        <PackageComponent></PackageComponent>
    </div>
</template>
<script>
import { Component as PackageComponent } from 'test/components';
import UiButton from './components/Button.vue';
import UiTile from './components/Tile.vue';

export default {
    components: { UiButton, UiTile, PackageComponent },
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
