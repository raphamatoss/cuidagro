import { validateName } from './name.validator';
import { validateCPF } from './cpf.validator';
import { validateEmail } from './email.validator';
import { validatePhone } from './phone.validator';
import { validateBirthDate } from './birthDate.validator';
import {
    validatePassword,
    validateConfirmPassword,
} from './password.validator';

export const registerValidators = {
    name: validateName,
    cpf: validateCPF,
    email: validateEmail,
    phone: validatePhone,
    birthDate: validateBirthDate,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
};
