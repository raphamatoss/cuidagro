import { CalendarPlus, FileText } from 'lucide-react';
import type { Appointment } from '../../types/appointment';

interface Props {
    data: Appointment;
}

export function HistoryCard({ data }: Props) {
    return (
        <div className="bg-blue-50/50 rounded-3xl p-4 shadow-sm border border-blue-50 flex flex-col gap-3">
            {/* Info do médico */}
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="font-bold text-gray-800 text-[1rem]">
                            {data.doctor.name}
                        </h3>
                        <p className="text-[1rem] text-gray-400">
                            {data.doctor.specialty}
                        </p>
                    </div>
                </div>
            </div>

            {/* Data e Documento */}
            <div className="flex items-center justify-between mt-1 bg-white p-2 rounded-xl border border-blue-50/50">
                <div className="flex items-center gap-2 text-gray-500 pl-2">
                    <CalendarPlus size={20} />
                    <span className="text-sm font-semibold">{data.date}</span>
                </div>

                <button className="p-3 bg-blue-100 text-agro-blue rounded-lg hover:bg-blue-200 transition-colors active:scale-95" title='Acessar receita'>
                    <FileText size={22} />
                </button>
            </div>
        </div>
    );
}
