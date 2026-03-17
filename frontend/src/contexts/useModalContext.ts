import { createContext, useContext } from 'react';
import { type ModalType } from '../components/AlertModal';

// Definição dos tipos
export interface ModalData {
    isOpen: boolean;
    type: ModalType;
    title: string;
    description: string;
    buttonText?: string;
    onConfirm?: () => void;
}

export interface ModalContextData {
    showModal: (props: Omit<ModalData, 'isOpen'>) => void;
    hideModal: () => void;
}

// Contexto
export const ModalContext = createContext<ModalContextData>(
    {} as ModalContextData,
);

// Hook 
export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal deve ser usado dentro de um ModalProvider');
    }
    return context;
}
