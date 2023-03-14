<template>
    <q-dialog>
        <q-card :style="`width: ${width}%;max-width: 80vw;`">
            <q-card-section class="row justify-between">
                <h5 class="modal__title">
                    <slot name="title" />
                </h5>
                <q-btn v-close-popup color="red" flat icon="close" round />
            </q-card-section>

            <q-card-section class="q-pt-none">
                <slot />
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
const props = defineProps({
    width: {
        type: Number,
        default: 80
    }
});
</script>

<style scoped>
.modal__title {
    margin: 0;
    font-weight: 400;
    font-size: 20px;
    line-height: 26px;
    padding-left: 16px;
    color: #000000;
}
</style>
