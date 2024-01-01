'use client';

import React, { FC } from 'react';
import PostControl from './post-control';
import { useRouter } from 'next/navigation';
import { usePostStore } from '@/hooks/use-post';
import UserAvatar from '@/components/user/user-avatar';
import { PostType, UserType } from '@/types';
import { useModalStore } from '@/hooks/use-modals';
import { formatCreatedAt } from '@/lib/utils';

interface PostHeaderProps {
    currentUser: UserType;
    post: PostType;
}

const PostHeader: FC<PostHeaderProps> = ({ post, currentUser }) => {
    const router = useRouter();
    const { setPostData } = usePostStore();
    const { onOpen } = useModalStore();

    const goToProfile = () => {
        router.replace(`/profiles/${post.userId}`);
    };

    const postImages = post.images.map((image) => image.url);

    const handleEdit = () => {
        onOpen('createPost');
        setPostData({ title: post.title, images: postImages, postId: post.id });
    };

    return (
        <div className='space-y-2 lg:space-y-4 mb-3'>
            <div className='flex gap-x-5 items-center w-full mb-2 lg:mb-[18px]'>
                <UserAvatar
                    src={post.user?.profileImage}
                    username={post.user?.name}
                    className='w-12 h-12'
                />
                <div className='flex flex-col gap-y-1 justify-center font-medium'>
                    <p
                        className='text-base cursor-pointer hover:underline dark:text-white'
                        onClick={goToProfile}
                    >
                        {post.user?.name}
                    </p>
                    <p className='text-gray78/60 dark:text-dark4 text-xs'>
                        {formatCreatedAt(post.createdAt)}
                    </p>
                </div>
                {post.userId === currentUser.id && (
                    <span className='ml-auto relative'>
                        <PostControl
                            onChange={handleEdit}
                            onDetele={() => {
                                onOpen('alert'),
                                    setPostData({
                                        title: post.title,
                                        images: postImages,
                                        postId: post.id,
                                    });
                            }}
                        />
                    </span>
                )}
            </div>
            {post.title && <p className='text-base break-words'>{post.title}</p>}
        </div>
    );
};

export default PostHeader;
