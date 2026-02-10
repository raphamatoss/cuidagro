import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Save,
    Activity,
    Ruler,
    Weight,
    Loader2,
} from 'lucide-react';
import { Input } from '../components/Input';
import { useModal } from '../contexts/useModalContext';
import { useAuth } from '../contexts/AuthContext';
import { healthService } from '../services/healthService';
import type { Disease } from '../types/health';

export default function MyHealthPage() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const { user } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [selectedDiseaseNames, setSelectedDiseaseNames] = useState<string[]>(
        [],
    );

    const [availableDiseases, setAvailableDiseases] = useState<Disease[]>([]);

    useEffect(() => {
        async function loadOptions() {
            try {
                const list = await healthService.getAvailableDiseases();
                setAvailableDiseases(list);
            } catch (error) {
                console.error('Erro ao carregar opções', error);
                showModal({
                    type: 'error',
                    title: 'Erro',
                    description:
                        'Erro ao carregar opções de doenças. Tente novamente mais tarde.',
                });
            } finally {
                setIsLoading(false);
            }
        }
        loadOptions();
    }, [showModal]);

    const toggleItem = (item: string) => {
        setSelectedDiseaseNames((prev) =>
            prev.includes(item)
                ? prev.filter((i) => i !== item)
                : [...prev, item],
        );
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (!user?.cpf) {
            showModal({
                type: 'error',
                title: 'Erro',
                description: 'Usuário não identificado.',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const doencasPayload = selectedDiseaseNames.map((name) => ({
                nome: name,
            }));

            const payload = {
                cpf: user.cpf,
                peso: parseFloat(weight.replace(',', '.')) || 0,
                altura: parseFloat(height.replace(',', '.')) || 0,
                doencas: doencasPayload,
            };

            console.log('Enviando:', payload);

            await healthService.saveHealthData(payload);

            showModal({
                type: 'success',
                title: 'Dados Salvos!',
                description: 'Suas informações foram registradas com sucesso.',
                onConfirm: () => navigate('/home'),
            });
        } catch (error) {
            console.error(error);
            showModal({
                type: 'error',
                title: 'Erro ao Salvar',
                description:
                    'Não foi possível salvar os dados. Tente novamente.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 text-agro-blue">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-24">
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-gray-800">
                        Minha Saúde
                    </h1>
                    <p className="text-xs text-gray-700">
                        Mantenha seu perfil clínico atualizado
                    </p>
                </div>
            </header>

            <form className="p-4 flex flex-col gap-6">
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Activity className="text-agro-blue" size={20} />
                        Doenças diagnosticadas
                    </h2>

                    <div className="flex flex-col gap-3">
                        {availableDiseases.length > 0 ? (
                            availableDiseases.map((doenca) => {
                                const isSelected =
                                    selectedDiseaseNames.includes(doenca.nome);
                                return (
                                    <label
                                        key={doenca.nome}
                                        className={`
                                        flex items-center gap-3 p-3 border rounded-xl hover:bg-blue-50 cursor-pointer transition-all
                                        ${isSelected ? 'bg-blue-100/80 border-blue-200 shadow-sm' : 'bg-white border-gray-100'}
                                    `}
                                    >
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-agro-blue rounded focus:ring-agro-blue"
                                            checked={isSelected}
                                            onChange={() =>
                                                toggleItem(doenca.nome)
                                            }
                                        />
                                        <span
                                            className={`font-medium ${isSelected ? 'text-agro-blue' : 'text-gray-600'}`}
                                        >
                                            {doenca.nome}
                                        </span>
                                    </label>
                                );
                            })
                        ) : (
                            <p className="text-gray-400 text-sm">
                                Nenhuma doença cadastrada no sistema.
                            </p>
                        )}
                    </div>
                </section>

                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Weight className="text-agro-blue" size={20} />
                        Medidas Corporais
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="weight"
                            label="Peso (kg)"
                            placeholder="Ex: 70.5"
                            type="number"
                            step="0.1"
                            icon={Weight}
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                        <Input
                            id="height"
                            label="Altura (m)"
                            placeholder="Ex: 1.75"
                            type="number"
                            step="0.01"
                            icon={Ruler}
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                    </div>
                </section>
            </form>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-30">
                <button
                    onClick={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-800 disabled:opacity-70"
                >
                    {isSubmitting ? 'Enviando...' : 'Salvar Dados'}
                    {!isSubmitting && <Save size={20} />}
                </button>
            </div>
        </div>
    );
}
