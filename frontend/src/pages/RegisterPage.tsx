import { 
  User, 
  FileText, 
  Calendar, 
  Mail, 
  Phone, 
  Lock, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import LogoCuidagro from '../assets/logo';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../features/auth/registerSchema';

export default function RegisterPage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            console.log('Dados de cadastro:', data);
            
            // Simulação de delay de rede
            await new Promise((resolve) => setTimeout(resolve, 2000));

            alert("Cadastro realizado com sucesso!");
            navigate('/login'); // Redireciona para o login após sucesso
        } catch {
            alert(`Erro ao cadastrar.`);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-agro-blue">
            {/* Botão de Voltar */}
            <div className="absolute top-4 left-4">
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
                    <h2 className="mb-6 text-center text-lg font-bold text-gray-800">
                        Dados Pessoais
                    </h2>
                    
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        {/* Nome Completo */}
                        <Input
                            id="name"
                            label="Nome Completo"
                            placeholder="Seu nome"
                            icon={User}
                            type="text"
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        {/* CPF */}
                        <Input
                            id="cpf"
                            label="CPF"
                            placeholder="000.000.000-00"
                            icon={FileText}
                            type="text" // Futuramente aplicar máscara aqui
                            error={errors.cpf?.message}
                            {...register('cpf')}
                        />

                        {/* Data de Nascimento */}
                        <Input
                            id="birthDate"
                            label="Data de Nascimento"
                            placeholder=""
                            icon={Calendar}
                            type="date"
                            error={errors.birthDate?.message}
                            {...register('birthDate')}
                        />

                        {/* Telefone */}
                        <Input
                            id="phone"
                            label="Celular (WhatsApp)"
                            placeholder="(00) 00000-0000"
                            icon={Phone}
                            type="tel"
                            error={errors.phone?.message}
                            {...register('phone')}
                        />

                        {/* E-mail */}
                        <Input
                            id="email"
                            label="E-mail"
                            placeholder="seu@email.com"
                            icon={Mail}
                            type="email"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div className="my-2 border-t border-gray-200"></div>

                        {/* Senha */}
                        <Input
                            id="password"
                            label="Crie uma Senha"
                            placeholder="******"
                            icon={Lock}
                            type="password"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        {/* Confirmar Senha */}
                        <Input
                            id="confirmPassword"
                            label="Confirme a Senha"
                            placeholder="******"
                            icon={Lock}
                            type="password"
                            error={errors.confirmPassword?.message}
                            {...register('confirmPassword')}
                        />

                        {/* Botão de Cadastro */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-agro-blue text-lg font-bold text-white shadow-md transition-transform active:scale-95 hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Salvando..." : "Criar Conta"}
                            {!isSubmitting && <ArrowRight className="h-5 w-5" />}
                        </button>
                    </form>
                    
                    <p className="mt-6 text-center text-sm text-gray-500">
                        Já tem uma conta? <br />
                        <span 
                            onClick={() => navigate('/login')}
                            className="font-bold text-agro-blue cursor-pointer hover:underline"
                        >
                            Faça Login
                        </span>
                    </p>
                </div>
            </main>
        </div>
    );
}