'use client';

import UserAvatar from './user-avatar';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { UserType } from '@/types';
import { useModalStore } from '@/hooks/use-modals';
import useConversationsApi from '@/api/conversations/use-conversations-api';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

interface UserBoxProps {
    user: UserType;
}

const UserBox = ({ user }: UserBoxProps) => {
    const router = useRouter();
    const { onClose } = useModalStore();
    const { createConversation } = useConversationsApi();

    const { data, mutate, isPending, isSuccess } = useMutation({
        mutationKey: ['direct-chat'],
        mutationFn: () => createConversation(user.id),
        onSuccess: () => {},
    });

    useEffect(() => {
        if (data && isSuccess) {
            onClose();
            router.push(`/conversations/${data?.id}`);
        }
    }, [data, isSuccess, onClose, router]);

    return (
        <div
            onClick={() => mutate()}
            className='bg-white dark:bg-dark1 cursor-pointer hover:bg-gray78/10 flex items-center gap-x-[10px] h-full w-full p-3 rounded-lg'
        >
            <UserAvatar
                src={user.profileImage}
                username={user.name}
                className='w-12 h-12'
            />
            <p className='font-semibold line-clamp-1 hover:cursor-pointer flex-1'>
                {user.name}
            </p>
            {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
        </div>
    );
};

export default UserBox;
