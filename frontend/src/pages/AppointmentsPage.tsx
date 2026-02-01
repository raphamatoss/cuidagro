import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Loader2,
} from 'lucide-react';
import type { Appointment } from '../types/appointment';
import { UpcomingCard } from '../components/appointments/UpcomingCard';
import { HistoryCard } from '../components/appointments/HistoryCard';
import { appointmentService } from '../services/appointmentService';
import { useEffect, useState } from 'react';

export default function AppointmentsPage() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setLoading] = useState(true);

    // Efeito para carregar os dados das consultas
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await appointmentService.getAll();
                setAppointments(data);
            } catch (error) {
                console.error('Erro ao buscar consultas: ', error);
                alert();
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const upcoming = appointments.find((a) => a.type === 'upcoming'); // Retorna a próxima consulta mais próxima
    const history = appointments.filter((a) => a.type === 'history'); // Retorna todas as concluídas

    return (
        <div className="flex min-h-screen flex-col bg-white pb-28">
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
                        Minhas Consultas
                    </h1>
                </div>
            </header>

            <main className="p-6 flex flex-col gap-8">
                {/* Estado de carregamento */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <p>Carregando agenda...</p>
                    </div>
                )}

                {!isLoading && (
                    <>
                        {/* SEÇÃO 1: PRÓXIMA CONSULTA */}
                        {upcoming ? (
                            <section className='border-b-2 border-gray-200 pb-8'>
                                <h2 className="text-xl font-semibold text-gray-800 mb-3 ml-1">
                                    Próxima consulta
                                </h2>
                                <UpcomingCard data={upcoming} />
                            </section>
                        ) : (
                            // Caso não tenha consulta agendada
                            <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500">
                                Nenhuma consulta agendada para breve.
                            </div>
                        )}

                        {/* SEÇÃO 2: HISTÓRICO */}
                        {history.length > 0 && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-700 mb-3 ml-1">
                                    Histórico de Consultas
                                </h2>
                                <div className="flex flex-col gap-4">
                                    {history.map((app) => (
                                        <HistoryCard key={app.id} data={app} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            {/* BOTÃO FLUTUANTE FIXO */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-30">
                <button className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-800">
                    Agendar consulta
                </button>
            </div>
        </div>
    );
}
