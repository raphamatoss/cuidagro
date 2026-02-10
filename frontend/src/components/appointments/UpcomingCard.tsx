import { Clock, Bell, MessageSquare } from 'lucide-react';
import type { Appointment } from '../../types/appointment';

interface Props {
    data: Appointment;
}

export function UpcomingCard({ data }: Props) {
    const dateObj = new Date(data.diaHora);

    const dateStr = dateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const timeStr = dateObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="bg-blue-50/80 rounded-3xl p-5 shadow-sm border border-blue-100">
            {/* Cabeçalho */}
            <div className="flex items-center gap-4 mb-4 border-b border-blue-100 pb-4">
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">
                        {data.medico.nome}
                    </h3>
                    <p className="text-[1rem] text-gray-500 font-medium">
                        {data.medico.especialidade}
                    </p>
                </div>
            </div>

            {/* <div className="mb-4 flex gap-2 text-gray-600">
                <MapPin size={18} className="text-agro-blue shrink-0 mt-1" />
                <div>
                    <p className="text-sm font-semibold">
                        {data.local.rua}, {data.local.numero}
                    </p>
                    <p className="text-xs opacity-80">
                        {data.local.cidade} - {data.local.estado}
                    </p>
                </div>
            </div> */}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700 font-semibold bg-white/60 px-3 py-1.5 rounded-lg">
                    <Clock size={18} className="text-agro-blue" />
                    <span className="text-[1rem]">
                        {dateStr} •{' '}
                        <span className="text-[1rem] font-bold text-agro-blue">
                            {timeStr}
                        </span>
                    </span>
                </div>

                <div className="flex gap-2.5">
                    <button
                        className="py-2.5 px-4 bg-white rounded-xl text-agro-blue hover:bg-blue-100 transition-colors shadow-sm"
                        title="Ativar notificação"
                    >
                        <Bell size={20} />
                    </button>
                    <button
                        className="py-2.5 px-4 bg-agro-blue rounded-xl text-white hover:bg-blue-700 transition-colors shadow-md"
                        title="Abrir chat"
                    >
                        <MessageSquare size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
