import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, AlertCircle, Phone } from 'lucide-react';

interface Symptom {
    id: string;
    label: string;
    category: string;
}

export default function DiagnosisPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // receberá dados da página de check-in
    const result = location.state as any;

    // se alguém acessar direto a página sem passar pelos sintomas
    if (!result) {
        navigate('/symptoms');
        return null;
    }

    // Desestruturando os dados recebidos
    const { symptoms, possiblePesticides, recommendations } = result;

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
            {}
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-gray-800">
                        Resultado do Diagnóstico
                    </h1>
                </div>
            </header>

            <main className="p-4 flex flex-col gap-6">
                {}
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Meu Diagnóstico
                    </h2>

                    <p className="text-gray-700 leading-relaxed mb-4">
                        Com base nos sintomas selecionados, existe possibilidade de exposição aos seguintes agrotóxicos:
                        <strong> {possiblePesticides.join(", ")}</strong>.
                    </p>

                    <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Sintomas informados:
                        </h3>

                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {symptoms.map((symptom: Symptom) => (
                                <li key={symptom.id}>{symptom.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {}
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="text-agro-blue" size={20} />
                        Recomendações
                    </h2>

                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {recommendations.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                        ))}
                    </ul>
                </section>

                {}
                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Phone className="text-agro-blue" size={20} />
                        Contato
                    </h2>

                    <div className="text-gray-700 space-y-2">
                        <p>
                            <strong>UBS:</strong> 3207-0044
                        </p>
                        <p>
                            <strong>Emergência:</strong> 192
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
