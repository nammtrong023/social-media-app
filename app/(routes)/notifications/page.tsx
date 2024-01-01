'use client';

import NotiItem from './components/noti-item';
import Container from '@/components/container';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import useUsersApi from '@/api/users/use-users-api';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/components/providers/auth-provider';

const NotificationPage = () => {
    const { currentUser } = useAuth();
    const { getOtherUsers, getNotifications } = useUsersApi();

    const { data: notifications } = useQuery({
        initialData: [],
        queryKey: ['get-notifications'],
        queryFn: () => getNotifications(currentUser?.id),
    });

    const otherUsersQuery = useQuery({
        initialData: [],
        queryKey: ['get-other-users', 'noti-page'],
        queryFn: () => getOtherUsers(),
    });

    const profileIds = notifications.map(
        (notification) => notification.senderId,
    );
    const otherUsers = otherUsersQuery.data.filter((user) =>
        profileIds.includes(user.id),
    );

    return (
        <Container showRightBar className='lg:pb-[30px]'>
            <div className='w-full rounded-xl py-5 bg-white dark:bg-dark1 h-full'>
                <div className='px-5 mb-5'>
                    <Heading title='Thông báo' />
                </div>
                <Separator />
                {notifications.length === 0 ? (
                    <p className='mt-3 w-full text-center'>
                        Không có thông báo
                    </p>
                ) : (
                    notifications.map((notification) => (
                        <NotiItem
                            key={notification.id}
                            users={otherUsers}
                            notification={notification}
                        />
                    ))
                )}
            </div>
        </Container>
    );
};

export default NotificationPage;
