<template>
    <q-input
        class="col-md-4"
        outlined
        type="number"
    >
        <template v-if="prependIcon" v-slot:prepend>
            <q-icon :name="prependIcon" />
        </template>
    </q-input>
</template>

<script setup>
defineProps({
    prependIcon: {
        type: String,
        default: null
    }
});
</script>

