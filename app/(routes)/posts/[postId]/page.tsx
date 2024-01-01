'use client';

import usePostsApi from '@/api/posts/use-posts-api';
import useOtherUsers from '@/hooks/use-other-user';
import { useAuth } from '@/components/providers/auth-provider';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import PostDetailsModal from '@/components/modals/post-details-modal';

const PostIdPage = ({ params }: { params: { postId: string } }) => {
    const { currentUser } = useAuth();
    const otherUsers = useOtherUsers();
    const { getPostById } = usePostsApi();

    const otherUsersFilter = otherUsers.filter(
        (user) => user.email !== currentUser?.email,
    );

    const { data: post, isFetching } = useQuery({
        initialData: null,
        queryKey: ['get-post-by-id'],
        queryFn: () => getPostById(params.postId),
    });

    if (!post && !isFetching) return notFound();

    if (!currentUser || !post) return null;

    return (
        <PostDetailsModal
            post={post}
            currentUser={currentUser}
            otherUsers={otherUsersFilter}
        />
    );
};

export default PostIdPage;
