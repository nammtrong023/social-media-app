'use client';

import { Button } from '@/components/ui/button';
import useFollow from '@/hooks/use-follow';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { UserType } from '@/types';
import useConversationsApi from '@/api/conversations/use-conversations-api';
import { useMutation } from '@tanstack/react-query';

interface ProfileActionsProps {
    userId: string;
    currentUser: UserType;
}

const ProfileActions: React.FC<ProfileActionsProps> = ({
    userId,
    currentUser,
}) => {
    const router = useRouter();
    const [isDirecting, setIsDirecting] = useState(false);
    const { isPending, isFollowing, toggleFollow } = useFollow(
        userId,
        currentUser,
    );
    const { createConversation } = useConversationsApi();

    const { data, mutate, isSuccess } = useMutation({
        mutationKey: ['direct', 'profile-page'],
        mutationFn: () => createConversation(userId),
        onSuccess: () => {
            return setIsDirecting(false);
        },
    });

    const handleClick = () => {
        mutate();
        setIsDirecting(true);
    };

    if (data && isSuccess) {
        router.push(`/conversations/${data.id}`);
    }

    return (
        <div className='flex items-center gap-x-5'>
            <Button
                variant='green'
                onClick={handleClick}
                disabled={isDirecting}
                className='w-fit'
            >
                {isDirecting ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                    'Nhắn tin'
                )}
            </Button>
            <Button
                variant='gray'
                onClick={toggleFollow}
                className='w-fit'
                disabled={isPending}
            >
                {isFollowing ? 'Huỷ theo dõi' : 'Theo dõi'}
            </Button>
        </div>
    );
};

export default ProfileActions;
