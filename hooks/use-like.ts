import { PostType, UserType } from '@/types';
import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from './use-axios-private';

const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/posts`;

const useLike = (
    postId: string,
    currentUser: UserType,
    fetchedPost: PostType,
) => {
    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds;

        return list?.includes(currentUser.id);
    }, [fetchedPost, currentUser]);

    const { isPending, mutate } = useMutation({
        mutationKey: ['like'],
        mutationFn: async () => {
            if (hasLiked) {
                return await axiosPrivate.patch(`${baseUrl}/unlike/${postId}`);
            } else {
                return await axiosPrivate.post(`${baseUrl}/like/${postId}`);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-posts'] });
            queryClient.invalidateQueries({ queryKey: ['get-post-by-id'] });
            queryClient.invalidateQueries({
                queryKey: ['get-posts-by-userId'],
            });
        },
    });

    const toggleLike = useCallback(() => {
        return mutate();
    }, [mutate]);

    return {
        hasLiked,
        isPending,
        toggleLike,
    };
};

export default useLike;
