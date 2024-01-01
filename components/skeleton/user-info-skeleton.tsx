import { Skeleton } from '../ui/skeleton';

export const UserInfoSkeleton = () => {
    return (
        <div className='w-[280px] h-full max-h-[72px] flex items-center justify-between gap-x-2'>
            <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
            <div className='w-full'>
                <Skeleton className='h-5 w-full' />
                <Skeleton className='h-5 w-[30%] mt-1' />
            </div>
        </div>
    );
};
