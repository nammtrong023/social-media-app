'use client';

import SidebarItem from './sidebar-item';
import LogoutIcon from '../icon/logout-icon';
import { useRoutes } from '@/hooks/use-routes';
import { useEffect, useState } from 'react';
import { UserType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import useUsersApi from '@/api/users/use-users-api';
import { useAuth } from '../providers/auth-provider';

const MainSidebar = ({ currentUser }: { currentUser: UserType }) => {
    const routes = useRoutes(currentUser);
    const [isMounted, setIsMounted] = useState(false);

    const { logout } = useAuth();
    const { getNotifications } = useUsersApi();

    const { data: notifications } = useQuery({
        initialData: [],
        queryKey: ['get-notifications'],
        queryFn: () => getNotifications(currentUser.id),
    });

    const hasNotifications = notifications.some((notification) => !notification.hasSeen);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <ul className='flex md:flex-col items-center md:items-start justify-around gap-y-3 overflow-hidden md:py-3 lg:p-5 sm:px-2 drop-shadow-2xl md:drop-shadow-none'>
            {routes.map((item) => (
                <SidebarItem
                    key={item.label}
                    href={item.href}
                    icon={item.icon}
                    label={item.label}
                    alert={hasNotifications}
                    active={item.active}
                />
            ))}
            <SidebarItem href='#!' icon={LogoutIcon} label='Log out' onClick={logout} />
        </ul>
    );
};

export default MainSidebar;
