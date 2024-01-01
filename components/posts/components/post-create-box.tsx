import Heading from '@/components/heading';
import UserAvatar from '@/components/user/user-avatar';
import { useModalStore } from '@/hooks/use-modals';
import { usePostStore } from '@/hooks/use-post';
import { UserType } from '@/types';
import Link from 'next/link';

export const PostCreateBox = ({ currentUser }: { currentUser: UserType }) => {
    const { onOpen } = useModalStore();
    const { setPostData } = usePostStore();

    const handleResetForm = () => {
        onOpen('createPost');
        setPostData({ postId: '', title: '', images: [] });
    };

    return (
        <div className='bg-white dark:bg-dark1 p-[18px] min-w-[320px] space-y-3 min-[550px]:max-w-[512px] w-full h-fit rounded-xl backdrop-opacity-5 z-40'>
            <Heading title='Tạo bài viết mới' />
            <div className='flex items-center gap-x-3'>
                <Link href={`/profiles/${currentUser.id}`}>
                    <UserAvatar
                        src={currentUser.profileImage}
                        username={currentUser.name}
                    />
                </Link>
                <div
                    onClick={handleResetForm}
                    className='bg-grayf9 w-full h-[40px] px-3 rounded-[10px] py-2 min-h-10 border hover:bg-[#ecf0f1] dark:bg-dark2 dark:hover:bg-dark2/70 cursor-pointer select-none'
                >
                    <p className='line-clamp-1'>
                        {`Bạn đang nghĩ gì, ${currentUser.name || '...'}?`}
                    </p>
                </div>
            </div>
        </div>
    );
};
