import {ref} from "vue";


export function useCrud(store, afterListUpdate) {

    const showModal = ref(false);
    const isNew = ref(true);
    const item = ref(null);

    const items = ref([]);
    const onRequest = (props) => {
        const { page, rowsPerPage, sortBy, descending } = props.pagination;
        store.pagination.page = page;
        store.pagination.rowsPerPage = rowsPerPage;
        list()
    };

    const onAdd = () => {
        isNew.value = true;
        item.value = null;
        showModal.value = true;
    }

    const onEdit = (row) => {
        isNew.value = false;
        item.value = row
        showModal.value = true;
    }

    const onDelete = (id) => {
        store.delete(id)
            .then(res => {
                list()
            })
    }

    const list = () => {
        store.list()
            .then(res => {
                afterListUpdate()
            });
    }

    const onSubmit = () => {
        showModal.value = false;
        item.value = null;
        list()
    }

    const serverIndex = (row) => {
        const all = items.value;
        const rowsPerPage = store.pagination.rowsPerPage;
        const page = store.pagination.page;
        return (all.indexOf(row) + 1)+ (rowsPerPage * (page - 1))
    }

    const setItems = (rows) =>  {
        items.value = rows;
    }

    return { showModal, isNew, item, onRequest, onAdd, onEdit, onDelete, onSubmit, serverIndex, setItems, list }

}
