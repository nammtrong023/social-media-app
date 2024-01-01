'use client';

import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import React, { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ConversationType } from '@/types';
import UserAvatar from '@/components/user/user-avatar';
import { useAuth } from '@/components/providers/auth-provider';

interface ConversationBoxProps {
    data: ConversationType;
    selected?: boolean;
}

const DATE_FORMAT = 'HH:mm a';

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
    const router = useRouter();
    const { currentUser } = useAuth();
    const otherUser = data.users.find((user) => user.id !== currentUser?.id);

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`);
    }, [data, router]);

    const lastMessage = useMemo(() => {
        const messages = data.messages || [];

        return messages[messages.length - 1];
    }, [data.messages]);

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) {
            return 'Đã gửi một hình ảnh';
        }

        if (lastMessage?.content) {
            return lastMessage?.content;
        }

        return 'Bắt đầu cuộc hội thoại';
    }, [lastMessage]);

    if (!otherUser) return null;

    return (
        <div
            onClick={handleClick}
            className={cn(
                'w-full relative flex items-center space-x-3 p-3 rounded-lg transition cursor-pointer mb-2',
                selected
                    ? 'bg-neutral-100 bg-gray78/10'
                    : 'hover:bg-neutral-100 dark:hover:bg-gray78/10',
            )}
        >
            <UserAvatar
                src={otherUser.profileImage}
                username={otherUser.name}
            />
            <div className='w-full overflow-hidden'>
                <div className='focus:outline-none w-full'>
                    <div className='flex items-center mb-1 justify-between w-full'>
                        <p className='text-md font-medium'>{otherUser.name}</p>
                        <p className='text-xs flex-shrink-0 items-end ml-auto'>
                            {lastMessage &&
                                format(
                                    new Date(lastMessage?.createdAt),
                                    DATE_FORMAT,
                                )}
                        </p>
                    </div>
                    <p className='text-sm line-clamp-1 overflow-x-hidden w-full max-w-full'>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConversationBox;
