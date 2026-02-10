import { useNavigate, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    AlertCircle,
    Phone,
    FileText,
    AlertTriangle,
    Stethoscope,
} from 'lucide-react';
import type { DiagnosisResponse } from '../types/symptom';

export default function DiagnosisPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const result = location.state as DiagnosisResponse;

    if (!result) {
        navigate('/home'); 
        return null;
    }

    // Define cor baseada no risco
    const getRiskColor = (risk: string) => {
        const r = risk?.toLowerCase() || '';
        if (r.includes('alto') || r.includes('grave'))
            return 'bg-red-50 text-red-700 border-red-200';
        if (r.includes('médio') || r.includes('moderado'))
            return 'bg-orange-50 text-orange-700 border-orange-200';
        return 'bg-green-50 text-green-700 border-green-200';
    };

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <button
                    onClick={() => navigate('/home')}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ChevronLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-lg font-bold text-gray-800">
                        Diagnóstico IA
                    </h1>
                </div>
            </header>

            <main className="p-4 flex flex-col gap-6">
                <section
                    className={`rounded-2xl p-5 shadow-sm border ${getRiskColor(result.risco)}`}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={24} />
                        <h2 className="font-bold text-lg">
                            Nível de Risco: {result.risco}
                        </h2>
                    </div>
                    <p className="text-sm opacity-90">
                        Baseado na análise dos sintomas e histórico de
                        exposição.
                    </p>
                </section>

                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Stethoscope className="text-agro-blue" size={20} />
                        Diagnóstico Provável
                    </h2>

                    <h3 className="text-xl font-bold text-agro-blue mb-1">
                        {result.diagnostico}
                    </h3>
                    {result.cid && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-bold">
                            CID: {result.cid}
                        </span>
                    )}
                </section>

                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <FileText className="text-agro-blue" size={20} />
                        Análise Clínica
                    </h2>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {result.descricao}
                    </p>
                </section>

                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <AlertCircle className="text-agro-blue" size={20} />
                        Recomendações Gerais
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                        <li>
                            Procure atendimento médico imediato se os sintomas
                            persistirem.
                        </li>
                        <li>
                            Leve a embalagem do agrotóxico utilizado, se
                            possível.
                        </li>
                        <li>Mantenha-se hidratado e evite nova exposição.</li>
                    </ul>
                </section>

                <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Phone className="text-agro-blue" size={20} />
                        Emergência
                    </h2>
                    <div className="text-gray-700 space-y-2">
                        <p>
                            <strong>SAMU:</strong> 192
                        </p>
                        <p>
                            <strong>Disque Intoxicação:</strong> 0800 722 6001
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
