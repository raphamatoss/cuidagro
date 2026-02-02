import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2, Circle, Send } from 'lucide-react';

// Definição dos Dados
const symptomGroups = [
    {
        category: 'Pele (Contato)',
        color: 'bg-blue-50 text-blue-700',
        items: [
            {
                id: 'skin_irritation',
                label: 'Irritação / Vermelhidão',
                description: 'Pele quente, dolorosa ou inchada',
            },
            {
                id: 'skin_dry',
                label: 'Desidratação / Secura',
                description: 'Pele descascando ou esbranquiçada',
            },
            {
                id: 'skin_allergy',
                label: 'Alergia / Coceira',
                description: 'Brotoejas ou manchas',
            },
        ],
    },
    {
        category: 'Respiração',
        color: 'bg-green-50 text-green-700',
        items: [
            {
                id: 'resp_nose',
                label: 'Ardência no nariz/boca',
                description: '',
            },
            { id: 'resp_cough', label: 'Tosse seca ou cheia', description: '' },
            {
                id: 'resp_chest',
                label: 'Dor no peito',
                description: 'Dificuldade para respirar fundo',
            },
        ],
    },
    {
        category: 'Digestão (Boca/Estômago)',
        color: 'bg-orange-50 text-orange-700',
        items: [
            { id: 'dig_nausea', label: 'Náuseas ou Vômitos', description: '' },
            { id: 'dig_stomach', label: 'Dor de estômago', description: '' },
            { id: 'dig_diarrhea', label: 'Diarreia', description: '' },
        ],
    },
    {
        category: 'Geral / Prolongada',
        color: 'bg-purple-50 text-purple-700',
        items: [
            { id: 'gen_headache', label: 'Dor de cabeça', description: '' },
            {
                id: 'gen_weakness',
                label: 'Fraqueza / Cansaço',
                description: '',
            },
            {
                id: 'gen_cramps',
                label: 'Câimbras ou Tremores',
                description: '',
            },
        ],
    },
];

export default function SymptomsPage() {
    const navigate = useNavigate();
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Lógica para marcar/desmarcar (Toggle)
    const toggleSymptom = (id: string) => {
        setSelectedSymptoms(
            (prev) =>
                prev.includes(id)
                    ? prev.filter((item) => item !== id) // Remove se já existe
                    : [...prev, id], // Adiciona se não existe
        );
    };

    const handleSubmit = async () => {
        if (selectedSymptoms.length === 0) {
            alert(
                'Por favor, selecione pelo menos um sintoma ou volte para a home.',
            );
            return;
        }

        setIsSubmitting(true);
        // Simulação de envio para API
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Sintomas enviados:', selectedSymptoms);
        setIsSubmitting(false);

        const nameSymptoms = selectedSymptoms.map((id) => {
            for (const group of symptomGroups) {
                const found = group.items.find((item) => item.id === id);
                if (found) {
                    return {
                        id: found.id,
                        label: found.label,
                        category: group.category
                    };
                }
            }
            return { id, label: id };
        });

        const diagnosticResult = {
            symptoms: nameSymptoms,
            possiblePesticides: ["Glifosato", "Paraquat"],
            recommendations: [
                "Evitar exposição imediata ao produto",
                "Lavar as mãos e a pele com água corrente",
                "Procurar atendimento médico"
            ]
        };



        alert('Check-in realizado! Seu médico receberá o relatório.');
        navigate('/diagnosis', { state: diagnosticResult });
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-28">
            {/* HEADER FIXO */}
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
                        O que você está sentindo agora?
                    </h1>
                </div>
            </header>

            {/* LISTA DE SINTOMAS */}
            <main className="p-4 flex flex-col gap-6">
                {symptomGroups.map((group) => (
                    <section
                        key={group.category}
                        className="bg-white rounded-xl pb-4 shadow-sm border border-gray-100"
                    >
                        {/* Título da Categoria*/}
                        <h2
                            className={`font-bold text-sm uppercase tracking-wide mb-4 p-4 rounded-t-lg w-full ${group.color}`}
                        >
                            {group.category}
                        </h2>

                        <div className="flex flex-col gap-3 px-3">
                            {group.items.map((item) => {
                                const isSelected = selectedSymptoms.includes(
                                    item.id,
                                );

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => toggleSymptom(item.id)}
                                        className={`
											relative flex items-center gap-4 p-4 rounded-xl text-left transition-all border
											${
                                                isSelected
                                                    ? 'bg-blue-50 border-agro-blue/60 shadow-inner'
                                                    : 'bg-white border-gray-100 hover:border-gray-300'
                                            }
										`}
                                    >
                                        {/* Ícone de Checkbox */}
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
                                                className={`block font-semibold ${isSelected ? 'text-agro-blue' : 'text-gray-700'} text-smg`}
                                            >
                                                {item.label}
                                            </span>
                                            {item.description && (
                                                <span className="text-xs text-gray-400 mt-1 block">
                                                    {item.description}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        'Enviando...'
                    ) : (
                        <>
                            Enviar relatório <Send size={20} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
