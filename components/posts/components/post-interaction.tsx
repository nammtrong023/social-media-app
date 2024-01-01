'use client';

import { cn } from '@/lib/utils';
import useLike from '@/hooks/use-like';
import { IconType } from 'react-icons';
import LikeIcon from '@/components/icon/like-icon';
import React, { FC } from 'react';
import LikeIconActive from '@/components/icon/like-icon-active';
import { ShareIcon } from '@/components/icon/share-icon';
import { CommentType, PostType, UserType } from '@/types';
import CommentIcon from '@/components/icon/comment-icon';
import { UserListModal } from '@/components/modals/user-list-modal';

interface PostInteractionProps {
    post: PostType;
    users: UserType[];
    comments: CommentType[];
    currentUser: UserType;
    onClick?: () => void;
}

const PostInteraction: FC<PostInteractionProps> = ({
    post,
    comments,
    users,
    currentUser,
    onClick,
}) => {
    const likeIdsLength = post.likedIds.length;
    const { hasLiked, isPending, toggleLike } = useLike(
        post.id,
        currentUser,
        post,
    );

    return (
        <>
            <div className='flex items-center justify-between w-full my-[14px]'>
                <div className='w-full flex items-center justify-between text-gray78/60 dark:text-dark4 text-sm font-medium gap-x-4'>
                    {!!likeIdsLength && (
                        <UserListModal
                            title='Mọi người'
                            userList={users}
                            buttonLabel={`${likeIdsLength} lượt thích`}
                        />
                    )}
                    <p className='ml-auto'>{comments?.length} bình luận</p>
                </div>
            </div>
            <div className='py-[3px] flex items-center justify-between w-full border border-x-0 dark:border-dark3 mb-[14px]'>
                <SocialActions
                    label='Thích'
                    icon={hasLiked ? LikeIconActive : LikeIcon}
                    onClick={toggleLike}
                    disabled={isPending}
                    className={cn(
                        hasLiked && '!text-blueFF',
                        isPending && 'opacity-70',
                    )}
                />

                <SocialActions
                    icon={CommentIcon}
                    label='Bình luận'
                    onClick={onClick}
                />
            </div>
        </>
    );
};

function SocialActions({
    label,
    className,
    disabled,
    icon: Icon,
    onClick,
}: {
    label: string;
    className?: string;
    disabled?: boolean;
    icon: IconType;
    onClick?: () => void;
}) {
    return (
        <button
            className={cn(
                'flex items-center justify-center gap-x-[10px] hover:bg-[#fafbfc] dark:hover:bg-gray78/10 w-full py-2 text-xs font-medium dark:text-dark4 cursor-pointer',
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            <Icon />
            {label}
        </button>
    );
}

export default PostInteraction;
