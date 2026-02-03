import { useState } from 'react';
import type { RegisterForm, RegisterErrors } from '../types/register';
import { registerValidators } from '../validators';

export const useRegisterForm = () => {
    const [form, setForm] = useState<RegisterForm>({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<RegisterErrors>({});

    const handleChange = (field: keyof RegisterForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const validateField = (field: keyof RegisterForm) => {
        const error = registerValidators[field](form[field], form);
        setErrors((prev) => ({ ...prev, [field]: error || undefined }));
    };

    const validateForm = () => {
        const newErrors: RegisterErrors = {};
        (Object.keys(form) as (keyof RegisterForm)[]).forEach((field) => {
            const error = registerValidators[field](form[field], form);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        form,
        errors,
        handleChange,
        validateField,
        validateForm,
    };
};
