'use client';

import FeedIcon from '@/components/icon/feed-icon';
import MessageIcon from '@/components/icon/message-icon';
import NotiIcon from '@/components/icon/noti-icon';
import ProfileIcon from '@/components/icon/profile-icon';
import { useParams, usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { UserType } from '@/types';

export const useRoutes = (currentUser: UserType | null) => {
    const params = useParams();
    const pathname = usePathname();

    const routes = useMemo(
        () => [
            {
                icon: FeedIcon,
                label: 'Trang chủ',
                href: '/',
                active: pathname === '/',
            },
            {
                icon: MessageIcon,
                label: 'Chat',
                href: '/conversations',
                active: pathname === '/conversations',
            },
            {
                icon: NotiIcon,
                label: 'Thông báo',
                href: '/notifications',
                active: pathname === '/notifications',
            },
            {
                icon: ProfileIcon,
                label: 'Cá nhân',
                href: `/profiles/${currentUser?.id}`,
                active: pathname === `/profiles/${params.profileId}`,
            },
        ],
        [currentUser?.id, params.profileId, pathname],
    );

    return routes;
};
