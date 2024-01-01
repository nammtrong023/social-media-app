import { create } from 'zustand';

export type ModalType = 'alert' | 'createPost' | 'postDetails' | 'uploadImage';

interface IModalState {
    isOpen: boolean;
    type: ModalType | null;
    onOpen: (type: ModalType) => void;
    onClose: () => void;
}

const useModalStore = create<IModalState>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (type) => set({ isOpen: true, type }),
    onClose: () => set({ isOpen: false }),
}));

export { useModalStore };
