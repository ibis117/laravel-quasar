<template>
    <q-input
        class="col-md-4"
        outlined
        type="text"
    >
        <template v-if="prependIcon" v-slot:prepend>
            <q-icon :name="prependIcon" />
        </template>
        <template v-if="appendIcon" v-slot:append>
            <q-icon :name="appendIcon" />
        </template>
    </q-input>
</template>

<script setup>
defineProps({
    prependIcon: {
        type: String,
        default: null
    },
    appendIcon: {
        type: String,
        default: null
    }
});
</script>
