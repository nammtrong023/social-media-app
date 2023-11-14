import { toast } from 'sonner';
import { UserType } from '@/types';
import { useCallback, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from './use-axios-private';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const useFollow = (userId: string, currentUser: UserType) => {
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();

    const isFollowing = useMemo(() => {
        const list = currentUser.followingIds || [];

        return list.includes(userId);
    }, [currentUser.followingIds, userId]);

    const { mutate, isPending } = useMutation({
        mutationKey: ['follow'],
        mutationFn: async () => {
            if (isFollowing) {
                return await axiosPrivate.patch(`${baseUrl}/users/unfollow/${userId}`);
            }

            return await axiosPrivate.post(`${baseUrl}/users/follow/${userId}`);
        },
        onSuccess: () => {
            toast.success('Thành công');
            queryClient.invalidateQueries();
        },
        onError: () => {
            toast.error('Thất bại');
        },
    });

    const toggleFollow = useCallback(() => {
        mutate();
    }, [mutate]);

    return {
        isFollowing,
        isPending,
        toggleFollow,
    };
};

export default useFollow;
