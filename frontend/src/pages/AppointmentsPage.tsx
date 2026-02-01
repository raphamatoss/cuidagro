import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    Bell,
    MessageSquare,
    Clock,
    FileText,
    CalendarPlus,
} from 'lucide-react';

// Dados simulados para preencher a tela
const nextAppointment = {
    id: 1,
    doctor: 'Dr. Roberto Albuquerque',
    specialty: 'Cardiologista',
    date: 'Hoje',
    time: '10am - 11am',
    image: 'Roberto+Albuquerque', // Para gerar o avatar
};

const historyAppointments = [
    {
        id: 2,
        doctor: 'Dra. Fernanda Almeida',
        specialty: 'Pneumologista',
        date: '16/03/2025',
        image: 'Fernanda+Almeida',
    },
    {
        id: 3,
        doctor: 'Dr. Roberto Albuquerque',
        specialty: 'Cardiologista',
        date: '27/04/2025',
        image: 'Roberto+Albuquerque',
    },
];

export default function AppointmentsPage() {
    const navigate = useNavigate();

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
                {/* SEÇÃO 1: PRÓXIMA CONSULTA (Destaque) */}
                <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 ml-1">
                        Próxima consulta
                    </h2>

                    <div className="bg-blue-50/80 rounded-3xl p-5 shadow-sm border border-blue-100">
                        {/* Cabeçalho do Card: Médico */}
                        <div className="flex items-center gap-4 mb-4 border-b border-blue-100 pb-4">
                            <img
                                src={`https://ui-avatars.com/api/?name=${nextAppointment.image}&background=0D8ABC&color=fff`}
                                alt="Médico"
                                className="w-10 h-10 rounded-lg object-cover shadow-sm"
                            />
                            <div>
                                <h3 className="font-bold text-gray-800 text-lg leading-tight">
                                    {nextAppointment.doctor}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium">
                                    {nextAppointment.specialty}
                                </p>
                            </div>
                        </div>

                        {/* Rodapé do Card: Hora e Ações */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-700 font-semibold bg-white/60 px-3 py-1.5 rounded-lg">
                                <Clock size={18} className="text-agro-blue" />
                                <span className="text-sm">
                                    {nextAppointment.date}:{' '}
                                    <span className="text-sm text-gray-500">
                                        {nextAppointment.time}
                                    </span>
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2.5 bg-white rounded-xl text-agro-blue hover:bg-blue-100 transition-colors shadow-sm">
                                    <Bell size={20} />
                                </button>
                                <button className="p-2.5 bg-agro-blue rounded-xl text-white hover:bg-blue-700 transition-colors shadow-md">
                                    <MessageSquare size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SEÇÃO 2: HISTÓRICO */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-800 mb-3 ml-1">
                        Histórico de Consultas
                    </h2>

                    <div className="flex flex-col gap-4">
                        {historyAppointments.map((app) => (
                            <div
                                key={app.id}
                                className="bg-blue-50/50 rounded-3xl p-4 shadow-sm border border-blue-50 flex flex-col gap-3"
                            >
                                {/* Linha Superior: Info do Médico */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${app.image}&background=random&color=fff`}
                                            alt="Médico"
                                            className="w-10 h-10 rounded-xl object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-sm">
                                                {app.doctor}
                                            </h3>
                                            <p className="text-xs text-gray-400">
                                                {app.specialty}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Linha Inferior: Data e Ação (Documento) */}
                                <div className="flex items-center justify-between mt-1 bg-white p-2 rounded-xl border border-blue-50/50">
                                    <div className="flex items-center gap-2 text-gray-500 pl-2">
                                        <CalendarPlus size={16} />
                                        <span className="text-xs font-semibold">
                                            {app.date}
                                        </span>
                                    </div>

                                    <button className="p-2 bg-blue-100 text-agro-blue rounded-lg hover:bg-blue-200 transition-colors">
                                        <FileText size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* BOTÃO FLUTUANTE FIXO */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-30">
                <button className="w-full h-14 bg-agro-blue text-white rounded-full font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-800">
                    Agendar Consulta
                </button>
            </div>
        </div>
    );
}
