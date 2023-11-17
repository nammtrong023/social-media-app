'use client';

import Loading from './loading';
import { PostType } from '@/types';
import { useEffect } from 'react';
import Container from '@/components/container';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import usePostsApi from '@/api/posts/use-posts-api';
import { useAuth } from '@/components/providers/auth-provider';
import { PostCreateBox } from '@/components/posts/components/post-create-box';
import PostCard from '@/components/posts/post-card';
import { PostCardSkeleton } from '@/components/skeleton/post-card-skeleton';
import useOtherUsers from '@/hooks/use-other-user';

export default function Home() {
    const { currentUser } = useAuth();
    const otherUsers = useOtherUsers();

    const { getPosts } = usePostsApi();
    const { ref, inView } = useInView();

    const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: ['get-posts'],
            queryFn: getPosts,
            initialPageParam: 1,
            getNextPageParam: (lastPage, pages) => {
                if (lastPage.length === 0) {
                    return undefined;
                }

                return pages.length + 1;
            },
            refetchInterval: 10000,
            maxPages: 5,
        });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    if (!currentUser || !data?.pages) {
        return <Loading />;
    }

    const otherUsersFilter = otherUsers.filter(
        (user) => user.email !== currentUser.email,
    );

    return (
        <Container showRightBar>
            <div className='flex flex-col items-center gap-y-3 sm:gap-y-[30px] w-full'>
                <PostCreateBox currentUser={currentUser} />

                {data.pages.flatMap((posts: PostType[]) =>
                    posts.map((post, postIndex) => (
                        <PostCard
                            key={post.id}
                            data={post}
                            innerRef={
                                postIndex === posts.length - 1 ? ref : undefined
                            }
                            currentUser={currentUser}
                            otherUsers={otherUsersFilter}
                        />
                    )),
                )}
            </div>
            {isFetchingNextPage && <PostCardSkeleton />}
        </Container>
    );
}
