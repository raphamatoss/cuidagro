import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Loader2,
} from 'lucide-react';

import { AlertCard } from '../components/alerts/alertCard';

import { useEffect, useState } from 'react';

import { alertService } from '../services/alertService';
import type { Alert } from '../types/alert';

export default function AlertsPage() {
    const navigate = useNavigate();

    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isLoading, setLoading] = useState(true);

    // Efeito para carregar os dados dos alertas
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await alertService.getAll();
                setAlerts(data);
            } catch (error) {
                console.error('Erro ao buscar alertas: ', error);
                alert('Erro ao carregar os alertas.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {/* HEADER */}
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <ChevronLeft size={24} className="text-gray-600" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800">
                        Meus Alertas
                    </h1>
                </div>
            </header>

            <main className="p-6 flex flex-col gap-8">
                {/* Estado de carregamento */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <p>Carregando alertas...</p>
                    </div>
                )}

                {!isLoading && (
                    <>
                        {alerts.length > 0 ? (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-700 mb-3 ml-1">
                                    Lista de Alertas
                                </h2>

                                <div className="flex flex-col gap-4">
                                    {alerts.map((alertItem) => (
                                        <AlertCard
                                            key={alertItem.id}
                                            data={alertItem}
                                        />
                                    ))}
                                </div>
                            </section>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500">
                                Nenhum alerta disponível no momento.
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
