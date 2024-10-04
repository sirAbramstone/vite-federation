<template>
    <div class="alert alert-error alert-body text-small">
        {{ error }}
    </div>
</template>
<script>
export default {
    props: {
        error: {
            type: String,
            default: '',
        },
    },
};
</script>
