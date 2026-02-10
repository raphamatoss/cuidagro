import { CalendarPlus, FileText, CheckCircle2, XCircle } from 'lucide-react';
import type { Appointment } from '../../types/appointment';

interface Props {
    data: Appointment;
}

export function HistoryCard({ data }: Props) {
    const isCanceled = data.status === 'CANCELADA';

    const dateObj = new Date(data.diaHora);
    const dateStr = dateObj.toLocaleDateString('pt-BR');
    const timeStr = dateObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div
            className={`rounded-3xl p-4 shadow-sm border flex flex-col gap-3 ${
                isCanceled
                    ? 'bg-red-50/50 border-red-50'
                    : 'bg-blue-50/50 border-blue-50'
            }`}
        >
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="font-bold text-gray-800 text-[1rem]">
                            {data.medico.nome}
                        </h3>
                        <p className="text-[1rem] text-gray-400">
                            {data.medico.especialidade}
                        </p>
                    </div>
                </div>

                <div
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 ${
                        isCanceled
                            ? 'bg-red-100 text-red-600'
                            : 'bg-green-100 text-green-600'
                    }`}
                >
                    {isCanceled ? (
                        <XCircle size={12} />
                    ) : (
                        <CheckCircle2 size={12} />
                    )}
                    {data.status}
                </div>
            </div>

            <div
                className={`flex items-center justify-between mt-1 bg-white p-2 rounded-xl border ${
                    isCanceled ? 'border-red-50/50' : 'border-blue-50/50'
                }`}
            >
                <div className="flex items-center gap-2 text-gray-500 pl-2">
                    <CalendarPlus size={20} />
                    <span className="text-sm font-semibold">
                        {dateStr} às {timeStr}
                    </span>
                </div>

                {!isCanceled && (
                    <button
                        className="p-3 bg-blue-100 text-agro-blue rounded-lg hover:bg-blue-200 transition-colors active:scale-95"
                        title="Acessar receita/prontuário"
                    >
                        <FileText size={22} />
                    </button>
                )}
            </div>
        </div>
    );
}
