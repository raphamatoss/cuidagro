import { useState, type ReactNode } from 'react';
import { Modal,   } from '../components/AlertModal';
import { ModalContext, type ModalData } from './useModalContext';

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modalState, setModalState] = useState<ModalData>({
        isOpen: false,
        type: 'info',
        title: '',
        description: '',
    });

    const showModal = (props: Omit<ModalData, 'isOpen'>) => {
        setModalState({ ...props, isOpen: true });
    };

    const hideModal = () => {
        setModalState((prev) => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <Modal
                isOpen={modalState.isOpen}
                onClose={() => {
                    hideModal();
                    if (modalState.onConfirm) modalState.onConfirm();
                }}
                type={modalState.type}
                title={modalState.title}
                description={modalState.description}
                buttonText={modalState.buttonText}
            />
        </ModalContext.Provider>
    );
}
