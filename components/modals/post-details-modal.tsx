'use client';

import Slider from '../slider';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PostInteraction from '../posts/components/post-interaction';
import PostHeader from '../posts/components/post-header';
import CommentItem from '../comments/comment-item';
import CommentInput from '../comments/comment-input';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mui/material';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import { Dialog, DialogContent } from '../ui/dialog';
import { cn } from '@/lib/utils';
import { PostType, UserType } from '@/types';
import { AlertModal } from './alert-modal';
import { useModalStore } from '@/hooks/use-modals';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import usePostsApi from '@/api/posts/use-posts-api';

interface PostDetailsModalProps {
    currentUser: UserType;
    otherUsers: UserType[];
    post: PostType;
}

const PostDetailsModal: FC<PostDetailsModalProps> = ({
    currentUser,
    otherUsers,
    post,
}) => {
    const router = useRouter();
    const { deletePost } = usePostsApi();
    const queryClient = useQueryClient();

    const isLaptop = useMediaQuery('(min-width:1024px)');
    const [mounted, setMounted] = useState(false);

    const { isOpen, type, onClose } = useModalStore();
    const isAlertModalOpen = isOpen && type === 'alert';

    const refOutside = useRef<HTMLDivElement | null>(null);
    const heightRef = useRef<HTMLDivElement | null>(null);

    const height = heightRef.current?.offsetHeight;
    const [heightTextarea, setHeightTextarea] = useState(59);
    const maxHeight = `calc(50vh - ${20 + heightTextarea}px)`;

    const likeIds = post.likedIds;
    const postImages = post.images.map((image) => image.url);

    if (!otherUsers.some((user) => user.id === currentUser.id)) {
        otherUsers.push(currentUser);
    }

    const profileWithLikeIds = otherUsers.filter((user) =>
        likeIds.includes(user.id),
    );
    const commentContents = post.comments.map((comment) => comment.content);

    useLayoutEffect(() => {
        if (heightRef.current) {
            setHeightTextarea(heightRef.current.offsetHeight);
        }
    }, [height]);

    useEffect(() => {
        setMounted(true);

        if (height !== undefined) setHeightTextarea(height);
    }, [height]);

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === refOutside.current) {
            router.back();
        }
    };

    const mutation = useMutation({
        mutationKey: ['delete-post'],
        mutationFn: () => deletePost(post.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-post-by-id'] });
            toast.success('Thành công');
            onClose();
        },
        onError: () => {
            toast.error('Thất bại');
        },
    });

    return (
        <>
            {mounted && (
                <>
                    <AlertModal
                        title='Xoá bài viết'
                        loading={mutation.isPending}
                        isOpen={isAlertModalOpen}
                        onClose={onClose}
                        onConfirm={mutation.mutate}
                    />
                    <Dialog open={true} onOpenChange={router.back}>
                        <DialogContent className='max-w-[100vw] w-full h-fit max-h-screen -translate-y-1/2 top-1/2 !p-0 !rounded-none !border-none'>
                            <div className='flex lg:flex-row flex-col max-h-screen'>
                                <div
                                    className={cn(
                                        'bg-black w-full h-full flex items-center max-h-[50vh] lg:max-h-screen justify-center max-w-[100vw] lg:max-w-[calc(100vw-350px)]',
                                    )}
                                    onClick={handleClose}
                                    ref={refOutside}
                                >
                                    <div
                                        className='h-full lg:h-[80%] w-full lg:w-full lg:max-w-[95%] xl:max-w-[800px] min-w-[320px]'
                                        onClick={(
                                            e: React.MouseEvent<HTMLDivElement>,
                                        ) => e.stopPropagation()}
                                    >
                                        <Slider
                                            images={postImages}
                                            className='w-full h-full min-h-[50vh]'
                                            imageClassName='object-contain relative rounded-none w-full h-full bg-transparent'
                                        />
                                    </div>
                                </div>
                                <div className='bg-white dark:bg-dark1 relative max-w-[100vw] lg:max-w-[350px] w-full h-screen py-4'>
                                    <div className='lg:max-h-fit h-full max-h-[100vh] lg:h-full overflow-auto'>
                                        <ScrollArea
                                            style={{
                                                maxHeight: isLaptop
                                                    ? ''
                                                    : maxHeight,
                                            }}
                                            className='overflow-auto lg:pb-10 lg:max-h-[100%]'
                                        >
                                            <div className='max-h-[170px] h-full px-4'>
                                                <PostHeader
                                                    post={post}
                                                    currentUser={currentUser}
                                                />
                                                <PostInteraction
                                                    post={post}
                                                    comments={post.comments}
                                                    currentUser={currentUser}
                                                    users={profileWithLikeIds}
                                                />
                                            </div>
                                            {post.comments &&
                                                commentContents.length !==
                                                    0 && (
                                                    <div className='flex flex-col items-center lg:mt-4 max-w-[350px] w-full'>
                                                        {post.comments.map(
                                                            (data) => (
                                                                <CommentItem
                                                                    key={
                                                                        data.id
                                                                    }
                                                                    data={data}
                                                                    currentUser={
                                                                        currentUser
                                                                    }
                                                                    background='bg-[#f6f7f8] dark:bg-dark2'
                                                                />
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                        </ScrollArea>
                                    </div>
                                    <div
                                        className='bg-white dark:bg-dark1 fixed z-30 w-full max-w-[100vw] xl:max-w-[350px] pb-2 bottom-0 h-fit mt-auto'
                                        ref={heightRef}
                                    >
                                        <Separator />
                                        <div className='px-2 lg:px-4 pt-2 w-full'>
                                            <CommentInput
                                                post={post}
                                                currentUser={currentUser}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </>
    );
};

export default PostDetailsModal;
