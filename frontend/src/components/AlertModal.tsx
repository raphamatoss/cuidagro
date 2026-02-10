import {
    X,
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    Info,
} from 'lucide-react';

// Tipos possíveis de modal
export type ModalType = 'success' | 'error' | 'warning' | 'info';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    title: string;
    description: string;
    buttonText?: string;
}

export function Modal({
    isOpen,
    onClose,
    type,
    title,
    description,
    buttonText = 'Entendi',
}: ModalProps) {
    if (!isOpen) return null;

    // Configuração visual baseada no tipo
    const config = {
        success: {
            icon: CheckCircle2,
            color: 'text-green-600',
            bgIcon: 'bg-green-100',
            button: 'bg-green-600 hover:bg-green-700',
            ring: 'focus:ring-green-200',
        },
        error: {
            icon: AlertCircle,
            color: 'text-red-600',
            bgIcon: 'bg-red-100',
            button: 'bg-red-600 hover:bg-red-700',
            ring: 'focus:ring-red-200',
        },
        warning: {
            icon: AlertTriangle,
            color: 'text-amber-600',
            bgIcon: 'bg-amber-100',
            button: 'bg-amber-600 hover:bg-amber-700',
            ring: 'focus:ring-amber-200',
        },
        info: {
            icon: Info,
            color: 'text-agro-blue',
            bgIcon: 'bg-blue-100',
            button: 'bg-agro-blue hover:bg-blue-700',
            ring: 'focus:ring-blue-200',
        },
    };

    const style = config[type];
    const IconComponent = style.icon;

    return (
        // Overlay (Fundo escuro)
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity p-4 animate-in fade-in duration-200">
            {/* Container do Modal */}
            <div className="relative w-full max-w-sm scale-100 transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">
                {/* Botão de Fechar (X) no topo */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    {/* Ícone Dinâmico */}
                    <div
                        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${style.bgIcon}`}
                    >
                        <IconComponent size={32} className={style.color} />
                    </div>

                    {/* Conteúdo de Texto */}
                    <h3 className="mb-2 text-xl font-bold text-gray-800">
                        {title}
                    </h3>
                    <p className="mb-6 text-sm text-gray-500 leading-relaxed">
                        {description}
                    </p>

                    {/* Botão de Ação */}
                    <button
                        onClick={onClose}
                        className={`w-full rounded-xl py-3 text-sm font-bold text-white shadow-md transition-transform active:scale-95 focus:outline-none focus:ring-4 ${style.button} ${style.ring}`}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}
