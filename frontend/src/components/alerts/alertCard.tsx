import { FileText } from "lucide-react";
import type { Alert } from "../../types/alert";

interface Props {
    data: Alert;
}

export function AlertCard({ data }: Props) {
    return (
        <div className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-white">
            
            <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="text-blue-600" size={24} />
            </div>

            <div>
                <h3 className="font-semibold text-gray-800">
                    {data.patientName}
                </h3>

                <p className="text-sm text-gray-600">
                    {data.message}
                </p>

                <span className="text-xs text-gray-400">
                    {data.date}
                </span>
            </div>

        </div>
    );
}
