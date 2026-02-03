export type RegisterForm = {
    name: "";
    cpf: "";
    email: "";
    phone: "";
    birthDate: "";
    password: "";
    confirmPassword: "";
};

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>

export type Validator = (
    value: string,
    form: RegisterForm
) => string | null;