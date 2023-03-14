<template>
    <main-layout>
        <q-page padding>
            <div class="table-wrapper padding">
                <q-table
                    v-model:pagination="brandStore.pagination"
                    :columns="columns"
                    :loading="brandStore.isLoading"
                    :rows="brandStore.brands"
                    bordered
                    flat
                    row-key="id"
                    :title="title"
                    @request="onRequest"
                    v-model:selected="brandStore.selected"
                    selection="multiple"
                >
                    <template #top-right>
                        <div class="row q-gutter-x-sm">

                            <div v-if="brandStore.selected.length > 0">
                                <q-btn color="red" flat icon="delete" round size="16px" unelevated >
                                    <q-tooltip class="bg-primary">
                                        Delete All Selected
                                    </q-tooltip>
                                </q-btn>
                            </div>

                            <text-field
                                v-model="brandStore.filters.query"
                                append-icon="search"
                                borderless
                                style="width: 250px;"
                                debounce="300"
                                dense
                            />


                            <q-btn color="primary" flat icon="refresh" round size="16px" unelevated
                                   @click="list">
                                <q-tooltip class="bg-primary">
                                    Refresh
                                </q-tooltip>
                            </q-btn>

                            <q-btn color="primary" flat icon="add"  round size="16px" unelevated
                                   @click="onAdd">
                                <q-tooltip class="bg-primary">
                                    Add
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </template>

                    <template #body-cell-image="props">
                        <q-td key="image" :props="props">
                            <q-img v-if="props.row.image"
                                :src="props.row.image"
                                spinner-color="white"
                            />
                            <span v-else>
                                N/A
                            </span>
                        </q-td>
                    </template>

                    <template #body-cell-actions="props">
                        <q-td key="actions" :props="props">
                            <q-btn color="primary" flat icon="edit" round @click.stop="onEdit(props.row)">
                                <q-tooltip class="bg-primary">Edit</q-tooltip>
                            </q-btn>
                            <q-btn color="red" flat icon="delete" round @click.stop="onDelete(props.row.id)">
                                <q-tooltip class="bg-primary">Delete</q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>
                </q-table>

                <q-modal v-model="showModal">
                    <template #title>
                        {{ isNew ? "Add Brand" : "Update Brand" }}
                    </template>
                    <brand-form :is-new="isNew" :item="item" @onSubmit="onSubmit"/>
                </q-modal>
            </div>
        </q-page>
    </main-layout>
</template>

<script setup>
import {useQuasar} from "quasar";
import {watch} from "vue";
import {useCrud} from "../../composables/useCrud";
import {useBrandStore} from "../../store/brand-store";
import MainLayout from "../../layouts/MainLayout.vue";
import QModal from "../../components/QModal.vue";
import BrandForm from "./BrandForm.vue";
import TextField from "../../components/form-fields/TextField.vue";

const $q = useQuasar();
const columns = [
    {name: "id", align: "left", label: "#", field: row => serverIndex(row), sortable: false},
    {name: "name", align: "left", label: "Name", field: "name", sortable: true},
    {name: "image", align: "left", label: "Image", field: "image", sortable: false},
    {name: "description", align: "left", label: "Description", field: "description", sortable: true},
    {name: "actions", align: "left", label: "Actions", field: "actions", sortable: false}
];
const title = 'Brands';
const brandStore = useBrandStore();

const afterListUpdate = () => {
    setItems(brandStore.brands);
};

const {
    showModal,
    isNew,
    item,
    onRequest,
    onAdd,
    onEdit,
    onDelete,
    onSubmit,
    serverIndex,
    setItems,
    list
} = useCrud(brandStore, afterListUpdate);

list();


watch(brandStore.filters, (val) => {
    list();
});


</script>
