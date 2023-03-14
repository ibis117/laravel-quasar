import {defineStore} from "pinia";
import {api} from "../api/axios";


const API_URL = '/api'
export const useBrandStore = defineStore('brand', {
    state: () => ({
        brand: {},
        brands: [],
        pagination: {
            sortBy: "desc",
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: 10
        },
        isLoading: false,
        selected: [],
        filters: {},
    }),

    getters: {

    },

    actions: {
        list() {
            this.isLoading = true;
            return api.get(`${API_URL}/brands`, {
                params: {
                    page: this.pagination.page,
                    rowsPerPage: this.pagination.rowsPerPage,
                    ...this.filters
                }
            })
                .then(res => {
                    const data = res.data;
                    this.brands = data.data
                    this.isLoading = false;

                    this.pagination = {
                        sortBy: "desc",
                        descending: false,
                        page: data.meta.current_page,
                        rowsPerPage: data.meta.per_page,
                        rowsNumber: data.meta.total
                    }
                }).catch(err => {
                    this.isLoading = false
                })
        },

        create(formData = null) {
            const data = formData ?? this.brand;
            return api.post(`${API_URL}/brands`, data)
        },

        update(id, formData = null, isMultipartForm = false) {
            formData.append('_method', 'PUT')
            const data = formData ?? this.brand;
            if (isMultipartForm) {
                return api.post(`${API_URL}/brands/${id}`, data, {
                    headers: {
                        "Content-Type" : "multipart/form-data"
                    }
                })
            }
            return api.post(`${API_URL}/brands/${id}`, data)
        },

        show(id) {
            return api.get(`${API_URL}/brands/${id}`, this.brand)
        },

        delete(id) {
            return api.delete(`${API_URL}/brands/${id}`)
        },

        setDefaultBrand() {
            this.brand = {
                brand_name: '',
                brand_code: ''
            };
        },

        setBrand(brand) {
            this.brand = brand;
        }

    }
})
