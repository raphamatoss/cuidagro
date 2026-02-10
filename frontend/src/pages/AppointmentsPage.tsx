import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Loader2, CalendarX } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { Appointment } from '../types/appointment';
import { UpcomingCard } from '../components/appointments/UpcomingCard';
import { HistoryCard } from '../components/appointments/HistoryCard';
import { appointmentService } from '../services/appointmentService';
import { useModal } from '../contexts/useModalContext';
import { useAuth } from '../contexts/AuthContext';

export default function AppointmentsPage() {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const { user } = useAuth();

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!user?.cpf) return;
            try {
                setLoading(true);
                const data = await appointmentService.getAll(user.cpf);
                
                // Ordena por data (mais recente primeiro)
                data.sort((a, b) => new Date(b.diaHora).getTime() - new Date(a.diaHora).getTime());
                setAppointments(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [user?.cpf]);

    const handleCancel = async (consulta: Appointment) => {
        try {
            await appointmentService.cancel(consulta);
            showModal({
                type: 'success',
                title: 'Consulta Cancelada',
                description: 'O agendamento foi cancelado com sucesso.'
            });
            if (user?.cpf) {
                const data = await appointmentService.getAll(user.cpf);
                data.sort((a, b) => new Date(b.diaHora).getTime() - new Date(a.diaHora).getTime());
                setAppointments(data);
            }
        } catch (error) {
            console.error(error);
            showModal({
                type: 'error',
                title: 'Erro',
                description: 'Não foi possível cancelar a consulta.'
            });
        }
    };

    // Filtros
    const activeAppointments = appointments.filter(a => a.status === 'AGENDADA' || a.status === 'PENDENTE');
    const historyAppointments = appointments.filter(a => a.status === 'CONCLUIDA' || a.status === 'CANCELADA');
    const nextAppointment = activeAppointments.length > 0 ? activeAppointments[0] : null;

    return (
        <div className="flex min-h-screen flex-col bg-white pb-28">
            <header className="bg-white px-4 py-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-100">
                    <ChevronLeft size={24} className="text-gray-600" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Minhas Consultas</h1>
            </header>

            <main className="p-6 flex flex-col gap-8">
                {isLoading ? (
                    <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
                ) : (
                    <>
                        {nextAppointment ? (
                            <section className="border-b-2 border-gray-200 pb-8">
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">Próxima consulta</h2>
                                <UpcomingCard data={nextAppointment} />
                                
                                <button 
                                    onClick={() => handleCancel(nextAppointment)}
                                    className="mt-4 flex items-center gap-2 text-red-600 text-sm font-bold hover:bg-red-50 p-2 rounded-lg transition-colors w-full justify-center border border-red-100">
                                    <CalendarX size={16} /> Cancelar este agendamento
                                </button>
                            </section>
                        ) : (
                            <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500">
                                Nenhuma consulta agendada.
                            </div>
                        )}

                        {historyAppointments.length > 0 && (
                            <section>
                                <h2 className="text-lg font-semibold text-gray-700 mb-3">Histórico</h2>
                                <div className="flex flex-col gap-4">
                                    {historyAppointments.map((app, idx) => (
                                        <HistoryCard key={idx} data={app} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            {/* <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-30">
                <button 
                    onClick={() => navigate('/appointments/new')}
                    className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg flex items-center justify-center gap-2 hover:bg-blue-800">
                    Agendar consulta
                </button>
            </div> */}
        </div>
    );
}