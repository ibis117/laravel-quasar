export function useFormData() {
    const buildFormData = (formData, data, parentKey) => {
        if (
            data &&
            typeof data === 'object' &&
            !(data instanceof Date) &&
            !(data instanceof File)
        ) {
            Object.keys(data).forEach(key => {
                buildFormData(
                    formData,
                    data[key],
                    parentKey ? `${parentKey}[${key}]` : key
                )
            })
        } else {
            const value = data == null ? '' : data
            formData.append(parentKey, value)
        }
        return formData;
    }

    const convertToFormData = (data) => {
        const formData = new FormData();
        return  buildFormData(formData, data);
    };

    return {convertToFormData, buildFormData}

}
