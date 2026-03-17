import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, Circle, Send, Loader2 } from 'lucide-react';
import { useModal } from '../contexts/useModalContext';
import { useAuth } from '../contexts/AuthContext';
import { symptomService } from '../services/symptomService';
import type { Sintoma } from '../types/symptom';

export default function SymptomsPage() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const { user } = useAuth();

    const [availableSymptoms, setAvailableSymptoms] = useState<Sintoma[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        async function fetchSymptoms() {
            try {
                const data = await symptomService.getAll();
                setAvailableSymptoms(data);
            } catch (error) {
                console.error('Erro ao carregar sintomas', error);
                showModal({
                    type: 'error',
                    title: 'Erro de conexão',
                    description:
                        'Não foi possível carregar a lista de sintomas.',
                });
            } finally {
                setIsLoading(false);
            }
        }
        fetchSymptoms();
    }, [showModal]);

    const toggleSymptom = (name: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name],
        );
    };

    const handleSubmit = async () => {
        if (!user?.cpf) {
            showModal({
                type: 'error',
                title: 'Erro',
                description: 'Usuário não identificado.',
            });
            return;
        }

        if (selectedSymptoms.length === 0) {
            showModal({
                type: 'warning',
                title: 'Atenção',
                description: 'Por favor, selecione pelo menos um sintoma.',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const sintomasPayload = selectedSymptoms.map((nome) => ({
                sintoma: nome,
            }));

            const payload = {
                cpf: user.cpf,
                sintomas: sintomasPayload,
            };

            console.log('Enviando para análise:', payload);

            const diagnosisResult = await symptomService.sendForm(payload);

            console.log('Diagnóstico recebido:', diagnosisResult);

            showModal({
                type: 'success',
                title: 'Análise Concluída',
                description:
                    'Seu relatório parcial foi gerado pela Inteligência Artificial.',
                onConfirm: () =>
                    navigate('/diagnosis', { state: diagnosisResult }),
            });
        } catch (error) {
            console.error(error);
            showModal({
                type: 'error',
                title: 'Erro na Análise',
                description:
                    'Não foi possível gerar o diagnóstico. Tente novamente.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-28">
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <p className="text-xs text-gray-500">Check-in de Saúde</p>
                    <h1 className="text-[1rem] font-bold text-gray-800">
                        O que você está sentindo?
                    </h1>
                </div>
            </header>

            <main className="p-4 flex flex-col gap-6">
                {isLoading ? (
                    <div className="flex justify-center mt-10">
                        <Loader2
                            className="animate-spin text-agro-blue"
                            size={32}
                        />
                    </div>
                ) : (
                    <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-sm uppercase tracking-wide mb-4 text-gray-500">
                            Sintomas Disponíveis
                        </h2>

                        <div className="flex flex-col gap-3">
                            {availableSymptoms.length > 0 ? (
                                availableSymptoms.map((item, index) => {
                                    const isSelected =
                                        selectedSymptoms.includes(item.sintoma);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() =>
                                                toggleSymptom(item.sintoma)
                                            }
                                            className={`
                                            relative flex items-center gap-4 p-4 rounded-xl text-left transition-all border
                                            ${
                                                isSelected
                                                    ? 'bg-blue-50 border-agro-blue/60 shadow-inner'
                                                    : 'bg-white border-gray-100 hover:border-gray-300'
                                            }
                                        `}
                                        >
                                            <div
                                                className={`mt-0.5 transition-colors ${isSelected ? 'text-agro-blue' : 'text-gray-300'}`}
                                            >
                                                {isSelected ? (
                                                    <CheckCircle2
                                                        size={24}
                                                        fill="var(--color-agro-blue-light)"
                                                    />
                                                ) : (
                                                    <Circle size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <span
                                                    className={`block font-semibold ${isSelected ? 'text-agro-blue' : 'text-gray-700'} text-sm`}
                                                >
                                                    {item.sintoma}
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="text-center text-gray-400">
                                    Nenhum sintoma cadastrado no sistema.
                                </p>
                            )}
                        </div>
                    </section>
                )}
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-30">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || isLoading}
                    className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        'Analisando...'
                    ) : (
                        <>
                            Gerar Diagnóstico <Send size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
