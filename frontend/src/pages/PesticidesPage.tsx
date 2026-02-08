import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Search,
    FlaskConical,
    Info,
    CheckCircle2,
    Circle,
    Send,
} from 'lucide-react';

import type { Pesticide } from '../types/pesticide';
import { pesticideService } from '../services/pesticideService';
import { Input } from '../components/Input';

export default function PesticidesPage() {
    const navigate = useNavigate();

    // Estados
    const [pesticides, setPesticides] = useState<Pesticide[]>([]);
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [otherPesticide, setOtherPesticide] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Busca dados ao carregar a tela
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await pesticideService.getAll();
                console.log("Dados vindos da API:", data);
                setPesticides(data);
            } catch (error) {
                console.error(error);
                alert('Erro ao carregar lista de agrotóxicos');
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    // Lógica de Seleção (Toggle) mudei para usar nome ao invés de id
    const togglePesticide = (name: string) => {
        setSelectedNames((prev) =>
            prev.includes(name)
                ? prev.filter((item) => item !== name)
                : [...prev, name],
        );
    };

    // Filtragem pelo nome
    const filteredList = pesticides.filter((p) =>
        p.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Envio do Formulário
    const handleSubmit = async () => {
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Selecionados:', selectedNames, 'Outro:', otherPesticide);

        alert('Dados enviados com sucesso!');
        navigate('/home');
    };

    return (
        <div className="flex min-h-screen flex-col bg-white pb-28">
            {/* HEADER */}
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft size={24} className="text-gray-600" />
                    </button>

                    <div>
                        <p className="text-gray-500">Agrotóxicos</p>
                        <h1 className="text-lg font-bold text-gray-700">
                            Quais produtos você utiliza?
                        </h1>
                    </div>
                </div>

                {/* BARRA DE BUSCA */}
                <div className="relative">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Buscar agrotóxico..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-agro-blue/60 transition-all"
                    />
                </div>
            </header>

            <main className="p-6 flex flex-col gap-4">
                {isLoading ? (
                    <p className="text-center text-gray-400 mt-10">
                        Carregando catálogo...
                    </p>
                ) : (
                    <>
                        <div className="flex flex-col gap-3">
                            {filteredList.map((item) => {
                                const isSelected = selectedNames.includes(item.nome);

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => togglePesticide(item.nome)}
                                        className={`
                                            flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all
                                            ${
                                                isSelected
                                                    ? 'bg-blue-50 border-agro-blue/80 shadow-sm'
                                                    : 'bg-white border-gray-100 hover:border-blue-200'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Ícone de Checkbox */}
                                            <div
                                                className={
                                                    isSelected
                                                        ? 'text-agro-blue'
                                                        : 'text-gray-400'
                                                }
                                            >
                                                {isSelected ? (
                                                    <CheckCircle2 size={24} />
                                                ) : (
                                                    <Circle size={24} />
                                                )}
                                            </div>

                                            <div className="flex flex-row items-center gap-2">
                                                <span
                                                    className={`font-bold block text-[1rem] ${
                                                        isSelected
                                                            ? 'text-agro-blue'
                                                            : 'text-gray-700'
                                                    }`}
                                                >
                                                    {item.nome}
                                                </span>

                                                
                                                
                                            </div>
                                        </div>

                                        {/* Botão de Info */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(
                                                    `Produto: ${item.nome}\nClasse: ${item.classe}`,
                                                );
                                            }}
                                            className="p-2 text-gray-700 hover:text-agro-blue"
                                        >
                                            <Info size={20} />
                                        </button>
                                    </div>
                                );
                            })}

                            {/* Feedback se a busca não encontrar nada */}
                            {filteredList.length === 0 && (
                                <div className="text-center py-8 text-gray-400">
                                    <FlaskConical
                                        size={48}
                                        className="mx-auto mb-2 opacity-20"
                                    />
                                    <p>Nenhum produto encontrado.</p>
                                </div>
                            )}
                        </div>

                        {/* CAMPO "OUTROS" */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <Input
                                id="other"
                                label="Outro produto não listado:"
                                placeholder="Digite o nome..."
                                value={otherPesticide}
                                onChange={(e) =>
                                    setOtherPesticide(e.target.value)
                                }
                            />
                        </div>
                    </>
                )}
            </main>

            {/* BOTÃO DE ENVIAR */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-30">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-800 disabled:opacity-70"
                >
                    {isSubmitting ? 'Enviando...' : 'Enviar Dados'}
                    {!isSubmitting && <Send size={20} />}
                </button>
            </div>
        </div>
    );
}
