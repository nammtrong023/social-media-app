'use client';

import { useAuth } from './auth-provider';
import CreatePostModal from '../modals/create-post-modal';

export const ModalProvider = () => {
    const { currentUser } = useAuth();

    if (!currentUser) return;

    return <CreatePostModal currentUser={currentUser} />;
};
