import { Mail, Lock, ArrowRight } from 'lucide-react';
import LogoCuidagro from '../assets/logo';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../features/auth/loginSchema';
import { useModal } from '../contexts/useModalContext';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const { signIn } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    // Função que será chamada quando os dados forem válidos
    const onSubmit = async (data: LoginFormData) => {
        try {
            console.log('Dados prontos para o back-end:', data);

            await signIn(data);

            navigate('/home');
        } catch (error) {
            console.error(error);
            const msgErro =
                (error as { response?: { status?: number } })?.response?.status === 403 || (error as { response?: { status?: number } })?.response?.status === 401
                    ? 'E-mail ou senha incorretos.'
                    : 'Erro ao conectar com o servidor.';

            showModal({
                type: 'error',
                title: 'Falha ao Entrar',
                description: msgErro,
            });
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-agro-blue pb-8">
            <header className="relative flex flew-col justify-center items-center p-4 flex-col mx-auto mt-10 mb-5">
                <div className="flex flex-col items-center justify-center mb-2 gap-4">
                    <LogoCuidagro className="h-25 w-25 p-4 bg-agro-blue-light/10 rounded-2xl shadow-xl" />
                    <h1 className="text-4xl font-bold tracking-tight text-white font-[SN_Pro]">
                        CUID<span className="text-agro-green">AGRO</span>
                    </h1>
                </div>

                <p className="text-sm text-blue-100 opacity-90">
                    Saúde e segurança no campo
                </p>
            </header>

            <main className="flex flex-col items-center mx-3">
                <div className="w-full max-w-sm rounded-2xl bg-agro-blue-light p-8 shadow-xl">
                    <h2 className="mb-6 text-center text-lg font-bold text-gray-800">
                        Acesse sua conta
                    </h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-6"
                    >
                        <Input
                            id="email"
                            label="E-mail"
                            placeholder="Digite seu e-mail"
                            icon={Mail}
                            type="email"
                            error={errors.login?.message}
                            {...register('login')}
                        />
                        <Input
                            id="password"
                            label="Senha"
                            placeholder="Digite sua senha"
                            icon={Lock}
                            type="password"
                            error={errors.senha?.message}
                            {...register('senha')}
                        />
                        {/* Link de Esqueci a Senha */}
                        <div className="text-right">
                            <a
                                href="#"
                                className="text-sm font-semibold text-agro-blue hover:underline active:text-agro-blue/70"
                            >
                                Esqueceu a senha?
                            </a>
                        </div>
                        {/* Botão Principal */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className=" flex h-14 w-full items-center justify-center gap-2 rounded-full bg-agro-blue text-lg font-bold text-white shadow-md transition-transform active:scale-95 active:bg-agro-blue/90"
                        >
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                            {!isSubmitting && (
                                <ArrowRight className="h-5 w-5" />
                            )}
                        </button>
                    </form>
                    <p className="flex flex-col gap-1 mt-8 text-center text-sm text-gray-500 ">
                        Ainda não tem cadastro?
                        <span
                            onClick={() => navigate('/register')}
                            className="text-sm font-bold text-agro-blue cursor-pointer hover:text-agro-blue/80 transition-colors active:text-agro-blue/70 hover:underline"
                        >
                            Cadastre-se
                        </span>
                    </p>
                </div>
            </main>
        </div>
    );
}
