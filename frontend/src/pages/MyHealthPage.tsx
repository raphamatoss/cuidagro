import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Save, Activity, Ruler, Weight } from 'lucide-react';
import { Input } from '../components/Input';
import { diseaseService } from '../services/diseaseService';
import type { Doencas } from '../types/disease';

export default function MyHealthPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Estados para os dados do formulário
    const [diseases, setDiseases] = useState<string[]>([]);
    const [availableDiseases, setAvailableDiseases] = useState<Doencas[]>([]);
    const [allergies, setAllergies] = useState<string[]>([]);
    const [hasMedAllergy, setHasMedAllergy] = useState<string | null>(null); // 'sim' ou 'nao'

    // Carregar doenças da API
    useEffect(() => {
        const fetchDoencas = async () => {
            try {
                const data = await diseaseService.getAll();
                setAvailableDiseases(data);
            } catch (error) {
                console.error('Erro ao carregar doenças', error);
            }
        };

        fetchDoencas();
    }, []);

    // Função auxiliar para marcar/desmarcar itens
    const toggleItem = (
        list: string[],
        setList: React.Dispatch<React.SetStateAction<string[]>>,
        item: string,
    ) => {
        if (list.includes(item)) {
            setList(list.filter((i) => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simula salvamento
        await new Promise((resolve) => setTimeout(resolve, 1500));

        alert('Dados de saúde atualizados com sucesso!');
        navigate('/home');
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
            {/* HEADER */}
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

            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-6">
                {/* SEÇÃO 1: DOENÇAS CRÔNICAS */}
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Activity className="text-agro-blue" size={20} />
                        Doenças que possui
                    </h2>

                    <div className="flex flex-col gap-3">
                        {availableDiseases.map((doenca) => {
                            const isSelected = diseases.includes(doenca.nome);

                            return (
                                <label
                                    key={doenca.nome}
                                    className={`
                                        flex items-center gap-3 p-3 border rounded-xl hover:bg-blue-50 cursor-pointer transition-all
                                        ${
                                            isSelected
                                                ? 'bg-blue-100/80 border-blue-200 shadow-sm'
                                                : 'bg-white border-gray-100 hover:bg-gray-50'
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-agro-blue rounded focus:ring-agro-blue"
                                        checked={isSelected}
                                        onChange={() =>
                                            toggleItem(
                                                diseases,
                                                setDiseases,
                                                doenca.nome,
                                            )
                                        }
                                    />
                                    <span
                                        className={`font-medium ${isSelected ? 'text-agro-blue' : 'text-gray-600'}`}
                                    >
                                        {doenca.nome}
                                    </span>
                                </label>
                            );
                        })}

                        {/* Campo "Outra" */}
                        <div className="mt-2 ">
                            <Input
                                label="Outra doença (se houver):"
                                placeholder="Digite aqui..."
                                id="other_disease"
                                className="h-10 text-sm"
                            />
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 2: DADOS CORPORAIS */}
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4">
                        Medidas Corporais
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            id="weight"
                            label="Peso (kg)"
                            placeholder="00,0"
                            type="number"
                            step="0.1"
                            icon={Weight}
                        />
                        <Input
                            id="height"
                            label="Altura (m)"
                            placeholder="1,00"
                            type="number"
                            step="0.01"
                            icon={Ruler}
                        />
                    </div>
                </section>

                {/* SEÇÃO 3: ALERGIAS */}
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4">Alergias</h2>

                    <div className="mb-6">
                        <p className="text-sm font-semibold text-gray-700 mb-2">
                            Alérgico a medicamentos?
                        </p>
                        <div className="flex gap-4">
                            <label
                                className={`
                                    flex-1 py-3 text-center rounded-xl border cursor-pointer font-bold transition-all shadow-sm
                                    ${
                                        hasMedAllergy === 'Sim'
                                            ? 'bg-green-50 border-green-500 text-green-700 ring-1 ring-green-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="med_allergy"
                                    value="Sim"
                                    className="hidden"
                                    onChange={() => setHasMedAllergy('Sim')}
                                />
                                Sim
                            </label>

                            <label
                                className={`
                                    flex-1 py-3 text-center rounded-xl border cursor-pointer font-bold transition-all shadow-sm
                                    ${
                                        hasMedAllergy === 'Não'
                                            ? 'bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500'
                                            : 'bg-gray-50 border-gray-200 text-gray-400 hover:bg-gray-100'
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="med_allergy"
                                    value="Não"
                                    className="hidden"
                                    onChange={() => setHasMedAllergy('Não')}
                                />
                                Não
                            </label>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 my-4"></div>

                    <p className="text-sm font-semibold text-gray-700 mb-3">
                        Intolerância alimentar:
                    </p>

                    <div className="flex flex-col gap-3">
                        {[
                            'Lactose',
                            'Glúten',
                            'Frutos do Mar',
                            'Amendoim',
                            'Ovos',
                        ].map((food) => {
                            const isSelected = allergies.includes(food);
                            return (
                                <label
                                    key={food}
                                    className={`
                                        flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all
                                        ${
                                            isSelected
                                                ? 'bg-blue-100/80 border-blue-200 shadow-sm'
                                                : 'bg-white border-gray-100 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-agro-blue rounded focus:ring-agro-blue"
                                        checked={isSelected}
                                        onChange={() =>
                                            toggleItem(
                                                allergies,
                                                setAllergies,
                                                food,
                                            )
                                        }
                                    />
                                    <span
                                        className={`font-medium ${isSelected ? 'text-agro-blue' : 'text-gray-600'}`}
                                    >
                                        {food}
                                    </span>
                                </label>
                            );
                        })}

                        <div className="mt-2">
                            <Input
                                id="other_food"
                                label="Outro alimento:"
                                placeholder="Ex: Leite de soja..."
                                className="h-10 text-sm"
                            />
                        </div>
                    </div>
                </section>

                <div className="h-4"></div>
            </form>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-30">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                    {!isSubmitting && <Save size={20} />}
                </button>
            </div>
        </div>
    );
}