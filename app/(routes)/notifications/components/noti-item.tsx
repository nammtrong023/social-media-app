'use client';

import { useRouter } from 'next/navigation';
import { cn, formatCreatedAt } from '@/lib/utils';
import React, { FC, useEffect, useState } from 'react';
import UserAvatar from '@/components/user/user-avatar';
import NotiCommentIcon from '@/components/icon/noti-comment-icon';
import NotiFollowIcon from '@/components/icon/noti-follow-icon';
import NotiLikeIcon from '@/components/icon/noti-like-icon';
import { NotiMessageIcon } from '@/components/icon/noti-message-icon';
import { NotificationType, UserType, NotiType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useUsersApi from '@/api/users/use-users-api';

interface NotiItemProps {
    notification: NotificationType;
    users: UserType[];
}

const iconMap = {
    LIKE: <NotiLikeIcon />,
    COMMENT: <NotiCommentIcon />,
    FOLLOW: <NotiFollowIcon />,
    MESSAGE: <NotiMessageIcon />,
};

const NotiItem: FC<NotiItemProps> = ({ notification, users }) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { updateNotification } = useUsersApi();
    const [mounted, setMounted] = useState(false);

    const { mutate } = useMutation({
        mutationKey: ['update-noti'],
        mutationFn: () => updateNotification(notification.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-notifications'] });
        },
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = () => {
        if (!notification.hasSeen) mutate();

        if (
            notification.type === NotiType.LIKE ||
            notification.type === NotiType.COMMENT
        ) {
            return router.push(`/posts/${notification.postId}`);
        }

        if (notification.type === NotiType.MESSAGE) {
            return router.push(`/conversations/${notification.conversationId}`);
        }

        router.push(`/profiles/${notification.receiverId}`);
    };

    if (!mounted) return null;

    return (
        <>
            {users.map((user) => (
                <div
                    key={user.id}
                    className='py-[10px] px-5 border border-x-0 last:border-b-2 hover:bg-[#fafbfc] hover:bg-gray78/10 cursor-pointer'
                    onClick={handleClick}
                >
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-5 w-full'>
                            {iconMap[notification.type]}
                            <div className='flex items-center gap-x-4'>
                                <UserAvatar
                                    className='w-10 h-10'
                                    username={user.name}
                                    src={user.profileImage}
                                />
                                <div className='flex flex-col'>
                                    <p
                                        className={cn(
                                            'font-medium text-base',
                                            notification.hasSeen
                                                ? 'text-gray78/70'
                                                : 'text-gray78 dark:text-white',
                                        )}
                                    >
                                        {notification.message}
                                    </p>
                                    <span className='text-sm opacity-60'>
                                        {formatCreatedAt(
                                            notification.createdAt,
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {!notification.hasSeen && (
                            <span className='w-[10px] h-[10px] bg-orange-500 rounded-full' />
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default NotiItem;
