'use client';

import Slider from '../slider';
import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CommentItem from '../comments/comment-item';
import PostHeader from './components/post-header';
import PostInteraction from './components/post-interaction';
import { ScrollArea } from '../ui/scroll-area';
import CommentInput from '../comments/comment-input';
import { usePostStore } from '@/hooks/use-post';
import { PostType, UserType } from '@/types';
import { AlertModal } from '../modals/alert-modal';
import { useModalStore } from '@/hooks/use-modals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePostsApi from '@/api/posts/use-posts-api';

interface PostCardProps {
    currentUser: UserType;
    otherUsers: UserType[];
    data: PostType;
    innerRef?: React.Ref<HTMLDivElement>;
}

const PostCard: FC<PostCardProps> = ({
    data,
    currentUser,
    otherUsers,
    innerRef,
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { deletePost } = usePostsApi();
    const { postData } = usePostStore();

    const [isMounted, setIsMounted] = useState(false);
    const [isComment, setIsComment] = useState(false);

    const { isOpen, type, onClose } = useModalStore();
    const isAlertModalOpen = isOpen && type === 'alert';

    const likeIds = data.likedIds;

    if (
        otherUsers?.length > 0 &&
        !otherUsers?.some((user) => user.id === currentUser?.id)
    ) {
        otherUsers?.push(currentUser);
    }
    const profileWithLikeIds = otherUsers?.filter((user) =>
        likeIds.includes(user.id),
    );

    const postImages = data.images.map((image) => image.url);

    const postCommentsWithProfiles = data.comments;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const mutation = useMutation({
        mutationKey: ['delete-post'],
        mutationFn: () => deletePost(postData.postId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-posts'] });
            queryClient.invalidateQueries({
                queryKey: ['get-posts-by-userId'],
            });
            toast.success('Post deleted successfully');
            onClose();
        },
        onError: () => {
            toast.error('Something went wrong');
        },
    });

    const goToPost = () => {
        router.push(`/posts/${data.id}`);
    };

    if (!isMounted) return null;

    return (
        <>
            <AlertModal
                title='Xoá bài viết'
                loading={mutation.isPending}
                isOpen={isAlertModalOpen}
                onClose={onClose}
                onConfirm={mutation.mutate}
            />
            <div
                ref={innerRef}
                className='flex flex-col min-w-[320px] min-[550px]:max-w-[512px] w-full h-fit'
            >
                <div className='h-auto p-[18px] bg-white dark:bg-dark1 rounded-2xl'>
                    <PostHeader post={data} currentUser={currentUser} />

                    <Slider
                        images={postImages}
                        onClick={goToPost}
                        className='hover:cursor-pointer !pointer-events-auto'
                    />

                    <PostInteraction
                        post={data}
                        users={profileWithLikeIds}
                        comments={data.comments}
                        currentUser={currentUser}
                        onClick={() => setIsComment(true)}
                    />

                    <CommentInput post={data} currentUser={currentUser} />
                </div>
                {isComment && !!postCommentsWithProfiles.length && (
                    <ScrollArea className='max-h-72 h-full flex flex-col items-center w-full gap-y-3 mb-2'>
                        {postCommentsWithProfiles.map((comment) => (
                            <CommentItem
                                data={comment}
                                key={comment.id}
                                currentUser={currentUser}
                            />
                        ))}
                    </ScrollArea>
                )}
            </div>
        </>
    );
};

export default PostCard;
