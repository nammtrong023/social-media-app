'use client';

import Link from 'next/link';
import Heading from '../heading';
import PostCard from './post-card';
import UserAvatar from '../user/user-avatar';
import { usePostStore } from '@/hooks/use-post';
import { useModalStore } from '@/hooks/use-modals';
import { PostType, UserType } from '@/types';
import { PostCreateBox } from './components/post-create-box';

interface PostListProps {
    user: UserType;
    otherUsers: UserType[];
    currentUser: UserType;
    posts: PostType[];
}

const PostList = ({ currentUser, user, otherUsers, posts }: PostListProps) => {
    const { onOpen } = useModalStore();
    const { setPostData } = usePostStore();

    const handleResetForm = () => {
        onOpen('createPost');
        setPostData({ postId: '', title: '', images: [] });
    };

    return (
        <div className='flex flex-col items-center gap-y-3 sm:gap-y-[30px] w-full'>
            {currentUser.id === user.id ? (
                <PostCreateBox currentUser={currentUser} />
            ) : (
                !posts.length && (
                    <p className='text-gray78/60 dark:text-white font-semibold text-2xl'>
                        Chưa có bài viết nào!
                    </p>
                )
            )}
            {posts.map((post) => (
                <PostCard
                    key={post.id}
                    data={post}
                    currentUser={currentUser}
                    otherUsers={otherUsers}
                />
            ))}
        </div>
    );
};

export default PostList;
