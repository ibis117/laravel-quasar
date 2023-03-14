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
import { api } from "boot/axios";

const props = defineProps({
    listOption : {
        type: Array,
        default: () => []
    },
    isAjax: {
        type: Boolean,
        default: false
    },
    ajaxUrl : {
        type: String,
        default: ''
    },
    onAjaxFilter: {
        type: Function,
        default: null
    }
})

watch(props.listOption,(val) => {
    optionList.value = val
});

const optionList = ref(props.listOption) ;

const options = ref(props.listOption)

onMounted(() => {
    if (props.isAjax) {
        apiCall('', true);
    }
})
const apiCall = (needle = '', initial = false) => {
    api.get(props.ajaxUrl, {
        params: {
            query: needle
        }
    }).then(res => {
        let result = [];
        if (props.onAjaxFilter != null) {
            result = props.onAjaxFilter(res.data)
        } else {
            result = res.data.data;
        }
        optionList.value = result;
        options.value = result;
    })
}

const optionFilter = (val , update, abort) => {
    update(() => {
            const needle = val.toLowerCase()
            if (!props.isAjax) {
                options.value = optionList.value.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
            } else {
                if (!!val) {
                    apiCall(needle);
                } else {
                    options.value = optionList.value.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
                }
            }

        },ref => {
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
