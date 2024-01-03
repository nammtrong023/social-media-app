'use client';

import { Clock } from 'lucide-react';
import { cn, getNextPageParam } from '@/lib/utils';
import { format } from 'date-fns';
import { SuggestUser } from '@/components/user/suggest-user';
import BirthIcon from '@/components/icon/birth-icon';
import Container from '@/components/container';
import GenderIcon from '@/components/icon/gender-icon';
import Heading from '@/components/heading';
import { EditProfileInfoModal } from '@/components/modals/edit-profile-info-modal';
import { ProfileHeader } from './components/profile-header';
import { useEffect } from 'react';
import { useInfiniteQuery, useQueries, useQuery } from '@tanstack/react-query';
import { Gender, PostType } from '@/types';
import Loading from './loading';
import { UserListModal } from '@/components/modals/user-list-modal';
import useUsersApi from '@/api/users/use-users-api';
import usePostsApi from '@/api/posts/use-posts-api';
import { PostCreateBox } from '@/components/posts/components/post-create-box';
import PostCard from '@/components/posts/post-card';
import { useInView } from 'react-intersection-observer';
import { PostCardSkeleton } from '@/components/skeleton/post-card-skeleton';
import { notFound } from 'next/navigation';
import { useAuth } from '@/components/providers/auth-provider';
import useOtherUsers from '@/hooks/use-other-user';

const ProfilePage = ({ params }: { params: { profileId: string } }) => {
    const { currentUser } = useAuth();
    const { ref, inView } = useInView();
    const otherUsers = useOtherUsers();

    const { getPostsByUserId } = usePostsApi();
    const { getUserById, getFollowings, getFollowers } = useUsersApi();

    const { data: user, isFetching } = useQuery({
        initialData: null,
        queryKey: ['get-user'],
        queryFn: () => getUserById(params.profileId),
    });

    const queries = useQueries({
        queries: [
            {
                initialData: [],
                queryKey: ['get-followings'],
                queryFn: () => getFollowings(params.profileId),
                enabled: !!user,
            },
            {
                initialData: [],
                queryKey: ['get-followers'],
                queryFn: () => getFollowers(params.profileId),
                enabled: !!user,
            },
        ],
    });

    const followings = queries[0].data;
    const followers = queries[0].data;

    const {
        data: posts,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['get-posts-by-userId'],
        queryFn: ({ pageParam }) =>
            getPostsByUserId(params.profileId, pageParam),
        initialPageParam: 1,
        getNextPageParam,
        maxPages: 5,
        enabled: !!user,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (!user && !isFetching) {
        return notFound();
    }

    if (!currentUser || !posts?.pages || !user || !followers || !followings) {
        return <Loading />;
    }

    const isShowInfo = (values: Gender | Date | null): boolean => {
        if (user.id === currentUser.id) return true;

        if (user.id !== currentUser.id && values !== null) return true;

        return false;
    };

    return (
        <Container className='lg:pr-[30px]' showRightBar={false}>
            <div className='w-full'>
                <ProfileHeader currentUser={currentUser} user={user} />
                <div className='flex flex-col lg:flex-row items-center lg:items-start gap-y-2 gap-x-[30px] relative'>
                    <div className='bg-white dark:bg-dark1 min-w-[260px] max-w-[512px] lg:max-w-[260px] w-full text-center rounded-xl h-fit p-[18px] relative overflow-y-auto'>
                        <Heading title='Giới thiệu' />
                        {user.bio && (
                            <p className='py-3 text-center border-b-2'>
                                {user.bio}
                            </p>
                        )}
                        <ul className='space-y-4 mt-6 mb-4'>
                            {isShowInfo(user.gender) && (
                                <ListItem>
                                    <GenderIcon />
                                    <p>
                                        {user.gender === 'MALE'
                                            ? 'Nam'
                                            : user.gender === 'FEMALE'
                                            ? 'Nữ'
                                            : 'Thêm giới tính của bạn'}
                                    </p>
                                </ListItem>
                            )}

                            {isShowInfo(user.birth) && (
                                <ListItem>
                                    <BirthIcon />
                                    <p>
                                        {user.birth
                                            ? format(
                                                  new Date(user.birth),
                                                  'dd/MM/yyyy',
                                              )
                                            : 'Thêm ngày sinh của bạn'}
                                    </p>
                                </ListItem>
                            )}

                            <ListItem>
                                <UserListModal
                                    title='Đang theo dõi'
                                    buttonLabel={`${followings.length} đang theo dõi`}
                                    userList={followings}
                                />
                            </ListItem>

                            <ListItem>
                                <UserListModal
                                    title='Người theo dõi'
                                    buttonLabel={`${followers?.length} người theo dõi`}
                                    userList={followers}
                                />
                            </ListItem>

                            <ListItem className='gap-x-2'>
                                <Clock className='w-4 h-4 inline-block' />
                                <span>
                                    Đã tham gia vào{' '}
                                    {format(
                                        new Date(user.createdAt),
                                        'dd/MM/yyyy',
                                    )}
                                </span>
                            </ListItem>
                        </ul>
                        {currentUser.id === user.id && (
                            <EditProfileInfoModal initialData={user} />
                        )}
                    </div>
                    <div className='flex flex-col items-end gap-y-2 md:gap-y-7 min-w-[320px] min-[550px]:max-w-[512px] w-full'>
                        {currentUser.id === user.id && (
                            <PostCreateBox currentUser={currentUser} />
                        )}

                        {!!posts.pages && !currentUser.id && (
                            <p className='text-gray78/60 dark:text-white font-semibold text-2xl'>
                                Chưa có bài viết nào!
                            </p>
                        )}

                        {posts.pages.flatMap((posts: PostType[]) =>
                            posts.map((post, postIndex) => (
                                <PostCard
                                    key={post.id}
                                    data={post}
                                    innerRef={
                                        postIndex === posts.length - 1
                                            ? ref
                                            : undefined
                                    }
                                    currentUser={currentUser}
                                    otherUsers={otherUsers}
                                />
                            )),
                        )}
                        {isFetchingNextPage && <PostCardSkeleton />}
                    </div>
                    <div className='hidden xl:block sticky left-[1100px] top-0'>
                        <SuggestUser users={otherUsers} />
                    </div>
                </div>
            </div>
        </Container>
    );
};

interface ListItemProps {
    children: React.ReactNode;
    className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, className }) => {
    return (
        <li
            className={cn(
                'flex items-center gap-x-5 text-sm h-fit font-medium',
                className,
            )}
        >
            {children}
        </li>
    );
};

export default ProfilePage;
