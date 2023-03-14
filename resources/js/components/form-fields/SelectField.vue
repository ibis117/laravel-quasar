<template>
    <q-select
        use-input
        clearable
        hide-selected
        fill-input
        input-debounce="500"
        @filter="optionFilter"
        emit-value
        map-options
        option-value="id"
        option-label="name"
        :options="options"
    >
        <template v-slot:no-option>
            <q-item>
                <q-item-section class="text-grey">
                    No results
                </q-item-section>
            </q-item>
        </template>
    </q-select>

</template>

<script setup>

import {onMounted, ref, watch} from "vue";

const props = defineProps({
    listOption: {
        type: Array,
        default: () => []
    },

    filterBy: {
        type: String,
        default: 'name'
    }
})

const options = ref(props.listOption)

const optionFilter = (val, update, abort) => {
    update(() => {
            const needle = val.toLowerCase()
            options.value = props.listOption.filter(v => v[props.filterBy].toLowerCase().indexOf(needle) > -1)
        }, ref => {
            if (val !== '' && ref.options.length > 0) {
                ref.setOptionIndex(-1) // reset optionIndex in case there is something selected
                ref.moveOptionSelection(1, true) // focus the first selectable option and do not update the input-value
            }
        }
    )
}

</script>


<style scoped>

</style>
