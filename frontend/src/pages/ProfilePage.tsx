import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    ChevronLeft,
    User,
    Mail,
    FileText,
    Activity,
    LogOut,
    Pencil,
    ShieldAlert,
    Loader2,
} from 'lucide-react';
import { userService } from '../services/userService';
import { type UserProfile } from '../types/user';
import { useModal } from '../contexts/useModalContext';

export default function ProfilePage() {
    const navigate = useNavigate();
    const { showModal } = useModal();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await userService.getProfile();
                setProfile(data);
            } catch (error) {
                console.error(error);
                showModal({
                    type: 'error',
                    title: 'Falha ao carregar',
                    description:
                        'Não foi possível carregar os dados.\n Por favor, verifique sua conexão',
                });
                navigate('/home');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [showModal, navigate]);

    const handleLogout = () => {
        // Precisa limpar o token de autenticação
        if (confirm('Deseja realmente sair do aplicativo?')) {
            navigate('/login');
        }
    };

    // Estado de carregamento
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 text-agro-blue">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    // Caso não consiga carregar
    if (!profile) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50">
                <p className="text-gray-500">
                    Não foi possível carregar os dados.
                </p>
                <button
                    onClick={() => navigate(0)}
                    className="text-agro-blue font-bold"
                >
                    Tentar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-10">
            {/* HEADER */}
            <div className="bg-agro-blue pb-20 pt-10 px-6 rounded-b-[3rem] shadow-lg">
                <div className="flex items-center justify-between mb-6 text-white">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-xl font-bold">Meu Perfil</h1>
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                        <Pencil size={20} />
                    </button>
                </div>

                {/* Foto e Saudação */}
                <div className="flex flex-col items-center gap-3">
                    <div className="p-1 bg-white rounded-full shadow-lg">
                        {/* <img
                            src={`https://ui-avatars.com/api/?name=${profile.avatar}&background=random&color=fff&size=128`}
                            alt="Foto de Perfil"
                            className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        /> */}
                    </div>
                    <div className="text-center text-white">
                        <h2 className="text-2xl font-bold">{profile.name}</h2>
                        <p className="opacity-90 text-sm">
                            Agricultor Associado
                        </p>
                    </div>
                </div>
            </div>

            <main className="px-6 -mt-10 flex flex-col gap-6">
                {/* SEÇÃO 1: DADOS PESSOAIS */}
                <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
                    <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                        <User size={14} /> Dados da Conta
                    </h3>

                    <div className="flex flex-col gap-5">
                        {/* Item: CPF */}
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-agro-blue rounded-xl">
                                <FileText size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">
                                    CPF
                                </p>
                                <p className="text-gray-700 font-bold">
                                    {profile.cpf || '---'}
                                </p>
                            </div>
                        </div>

                        {/* Divisor */}
                        <div className="border-b border-gray-100"></div>

                        {/* Item: E-mail */}
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-agro-blue rounded-xl">
                                <Mail size={20} />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400 font-medium">
                                    E-mail
                                </p>
                                <p className="text-gray-700 font-bold text-sm">
                                    {profile.email || '---'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 2: DADOS DE SAÚDE */}
                <section className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 relative overflow-hidden">
                    {/* Efeito decorativo */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>

                    <div className="relative z-10">
                        <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Activity size={14} /> Resumo de Saúde
                        </h3>

                        {/* Grupo: Condições Crônicas */}
                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                Condições Crônicas:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {/* Verifica se existe array, senão usa vazio */}
                                {profile.doencas &&
                                profile.doencas.length > 0 ? (
                                    profile.doencas.map((condition, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-red-50 text-red-600 rounded-lg text-sm font-bold border border-red-100 flex items-center gap-1"
                                        >
                                            <Activity size={14} /> {condition}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm">
                                        Nenhuma informada.
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Grupo: Alergias */}
                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                Alergias:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {profile.alergias &&
                                profile.alergias.length > 0 ? (
                                    profile.alergias.map((allergy, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-sm font-bold border border-orange-100 flex items-center gap-1"
                                        >
                                            <ShieldAlert size={14} /> {allergy}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-gray-400 text-sm">
                                        Nenhuma alergia registrada.
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BOTÃO DE SAIR */}
                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 p-4 rounded-2xl border-2 border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    Sair da Conta
                </button>
            </main>
        </div>
    );
}
