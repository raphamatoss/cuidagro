import {
    User,
    FileText,
    Calendar,
    Mail,
    Phone,
    Lock,
    ArrowRight,
    ChevronLeft,
    Tractor,
    Stethoscope,
    HeartHandshake,
    Badge,
} from 'lucide-react';
import LogoCuidagro from '../assets/logo';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    registerSchema,
    type RegisterFormData,
} from '../features/auth/registerSchema';
import { maskCPF, maskPhone } from '../utils/masks';
import { api } from '../services/api';
import { useModal } from '../contexts/useModalContext';

// Configuração visual dos Cards
const ROLES = [
    {
        id: 'AGRICULTOR',
        label: 'Agricultor',
        icon: Tractor,
        style: 'border-green-200 bg-green-50 text-green-600 ring-green-500',
    },
    {
        id: 'AGENTE_SAUDE',
        label: 'Agente',
        icon: HeartHandshake,
        style: 'border-orange-200 bg-orange-50 text-orange-600 ring-orange-500',
    },
    {
        id: 'MEDICO',
        label: 'Médico',
        icon: Stethoscope,
        style: 'border-blue-200 bg-blue-50 text-blue-600 ring-blue-500',
    },
] as const;

export default function RegisterPage() {
    const navigate = useNavigate();
    const { showModal } = useModal();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: undefined, // Começa sem seleção para forçar o usuário a escolher
        },
    });

    // "Vigia" o valor do cargo em tempo real
    const selectedRole = useWatch({
        control,
        name: 'role',
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { confirmPassword, role, professionalId, ...rest } = data;

            // Prepara payload para o Java (Mapeando os campos)
            const payload = {
                ...rest,
                userRole: role,
                professionalId: role !== 'AGRICULTOR' ? professionalId : null,
            };

            console.log('Enviando para o backend:', payload);

            await api.post('users/register', payload);

            showModal({
                type: 'success',
                title: 'Bem-vindo(a)!',
                description:
                    'Cadastro realizado com sucesso. Faça login para continuar.',
            });
            navigate('/login');
        } catch (error) {
            console.error(error);
            showModal({
                type: 'error',
                title: 'Erro ao cadastrar',
                description: 'Verifique seus dados e tente novamente.',
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-agro-blue">
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
                >
                    <ChevronLeft size={32} />
                </button>
            </div>

            <header className="relative flex flex-col items-center justify-center p-4 mx-auto mt-8 mb-4">
                <div className="flex flex-col items-center justify-center mb-2 gap-4">
                    <LogoCuidagro className="h-20 w-20 p-3 bg-agro-blue-light/10 rounded-2xl shadow-xl" />
                    <h1 className="text-3xl font-bold tracking-tight text-white font-[SN_Pro]">
                        CUID<span className="text-agro-green">AGRO</span>
                    </h1>
                </div>
                <p className="text-sm text-blue-100 opacity-90">
                    Crie sua conta gratuitamente
                </p>
            </header>

            <main className="flex flex-1 flex-col items-center w-full px-4 pb-10">
                <div className="w-full max-w-sm rounded-2xl bg-agro-blue-light p-6 shadow-xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        {/* --- SELEÇÃO DE CARGO --- */}
                        <div className="mb-2">
                            <label className="text-[1rem] font-bold text-gray-700 mb-2 block ml-1">
                                Qual é o seu perfil?
                            </label>

                            {/* Input escondido para registrar o erro do Zod */}
                            <input type="hidden" {...register('role')} />

                            <div className="grid grid-cols-3 gap-3">
                                {ROLES.map((roleItem) => {
                                    const isSelected =
                                        selectedRole === roleItem.id;
                                    return (
                                        <button
                                            key={roleItem.id}
                                            type="button" // type button para não enviar o form
                                            onClick={() =>
                                                setValue('role', roleItem.id, {
                                                    shouldValidate: true,
                                                })
                                            }
                                            className={`
                                                flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border-2 transition-all active:scale-95
                                                ${
                                                    isSelected
                                                        ? `${roleItem.style} border-current shadow-md`
                                                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                                                }
                                            `}
                                        >
                                            <roleItem.icon
                                                size={24}
                                                strokeWidth={
                                                    isSelected ? 2.5 : 2
                                                }
                                            />
                                            <span className="text-sm font-bold text-center leading-tight">
                                                {roleItem.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                            {errors.role && (
                                <span className="text-red-500 text-xs mt-1 ml-1">
                                    {errors.role.message}
                                </span>
                            )}
                        </div>

                        {/* --- DADOS PESSOAIS --- */}
                        <h2 className="text-center text-sm font-bold text-gray-500 uppercase tracking-widest mt-2 mb-1">
                            Seus Dados
                        </h2>

                        <Input
                            id="name"
                            label="Nome Completo"
                            placeholder="Seu nome"
                            icon={User}
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Controller
                            control={control}
                            name="cpf"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="cpf"
                                    label="CPF"
                                    placeholder="000.000.000-00"
                                    icon={FileText}
                                    error={errors.cpf?.message}
                                    onChange={(e) =>
                                        field.onChange(maskCPF(e.target.value))
                                    }
                                />
                            )}
                        />

                        <Input
                            id="birthDate"
                            label="Data de Nascimento"
                            icon={Calendar}
                            type="date"
                            error={errors.birthDate?.message}
                            {...register('birthDate')}
                        />

                        <Controller
                            control={control}
                            name="phone"
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="phone"
                                    label="Celular"
                                    placeholder="(00) 0 0000-0000"
                                    icon={Phone}
                                    type="tel"
                                    error={errors.phone?.message}
                                    onChange={(e) =>
                                        field.onChange(
                                            maskPhone(e.target.value),
                                        )
                                    }
                                />
                            )}
                        />

                        <Input
                            id="email"
                            label="E-mail"
                            placeholder="seu@email.com"
                            icon={Mail}
                            type="email"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        {/* --- CAMPO CONDICIONAL: REGISTRO PROFISSIONAL --- */}
                        {selectedRole && selectedRole !== 'AGRICULTOR' && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <Input
                                    id="professionalId"
                                    label={
                                        selectedRole === 'MEDICO'
                                            ? 'CRM (Registro Médico)'
                                            : 'Matrícula ou COREN'
                                    }
                                    placeholder="Número do registro"
                                    icon={Badge}
                                    className="border-agro-blue/50 bg-blue-50/30"
                                    error={errors.professionalId?.message}
                                    {...register('professionalId')}
                                />
                                <p className="text-[10px] text-agro-blue ml-2 mt-1 font-medium">
                                    * Obrigatório para validação profissional.
                                </p>
                            </div>
                        )}

                        <div className="my-1 border-t border-gray-200"></div>

                        <Input
                            id="password"
                            label="Crie uma Senha"
                            placeholder="******"
                            icon={Lock}
                            type="password"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Input
                            id="confirmPassword"
                            label="Confirme a Senha"
                            placeholder="******"
                            icon={Lock}
                            type="password"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-agro-blue text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Cadastrando...' : 'Criar Conta'}
                            {!isSubmitting && (
                                <ArrowRight className="h-5 w-5" />
                            )}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Já tem uma conta? <br />
                        <span
                            onClick={() => navigate('/login')}
                            className="font-bold text-agro-blue cursor-pointer hover:underline hover:text-agro-blue/80"
                        >
                            Faça Login
                        </span>
                    </p>
                </div>
            </main>
        </div>
    );
}
