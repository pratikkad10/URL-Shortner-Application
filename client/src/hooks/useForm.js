import { useState } from 'react';

// This is a custom hook to manage form state.
export const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData(initialState);
    };

    return { formData, handleChange, setFormData, resetForm };
};
