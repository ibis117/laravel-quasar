<template>
    <div class="q-pa-md">

        <q-form
            class="row q-col-gutter-md"
            @submit="onSubmit"
        >
            <text-field
                v-model="brand.name"
                label="Name"
                class="col-md-12"
                lazy-rules
                :rules="[rules.required]"
            />

            <text-area-field
                v-model="brand.description"
                label="Description"
                class="col-md-12"
                lazy-rules
            />

            <div class="col-md-12">
                <q-img v-if="brand.image"
                       :src="brand.image"
                       spinner-color="white"
                       style="height: 140px; max-width: 150px"
                       fit="fill"
                />
            </div>

            <q-file outlined v-model="brand.image" label="Label" class="col-md-12">
                <template v-slot:append>
                    <q-icon name="attachment" color="primary" />
                </template>
            </q-file>

            <div class="col-md-12 row justify-end">
                <q-btn color="primary" label="Submit" type="submit" />
            </div>
        </q-form>

    </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { storeToRefs } from "pinia";
import {useValidation} from "../../composables/useValidation";
import {useBrandStore} from "../../store/brand-store";
import TextField from "../../components/form-fields/TextField.vue";
import TextAreaField from "../../components/form-fields/TextAreaField.vue";
import {useFormData} from "../../composables/useFormData";

const $q = useQuasar();

const {rules} = useValidation();

const {convertToFormData} = useFormData();

const props = defineProps({
    item:{
        type: Object,
        default: () =>{}
    },

    isNew: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits([
    'onSubmit'
])

const brandStore = useBrandStore();
const {brand} = storeToRefs(brandStore);

if (props.isNew) {
    brandStore.setDefaultBrand()
} else {
    brandStore.setBrand(props.item)
}

const onSubmit = () => {
    const formData = convertToFormData(brandStore.brand);
    if(props.isNew){
        brandStore.create(formData)
            .then(res => {
                emits('onSubmit')
            })
    } else {
        brandStore.update(brandStore.brand.id, formData, true)
            .then(res => {
                emits('onSubmit')
            })
    }
};


</script>
