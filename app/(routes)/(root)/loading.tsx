import Container from '@/components/container';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
    return (
        <Container showRightBar>
            <div className='flex items-center flex-col flex-1 rounded-xl min-w-[320px] w-full'>
                <div className='min-w-[320px] w-full h-fit p-[18px] bg-white dark:bg-dark1 rounded-lg space-y-1 max-w-[516px]'>
                    <div className='flex items-center gap-x-5 justify-between w-full'>
                        <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                        <Skeleton className='h-8 w-full' />
                    </div>
                    <div className='mt-auto'>
                        <Skeleton className='w-full h-8' />
                    </div>
                </div>
                <div className='bg-white mt-10 p-[18px] w-full rounded-xl dark:bg-dark1 max-w-[516px]'>
                    <div className='flex items-center justify-between mb-4 gap-x-3 w-full'>
                        <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                        <div className='flex flex-col gap-y-1 w-full'>
                            <Skeleton className='w-full h-6' />
                            <Skeleton className='w-full h-5' />
                        </div>
                    </div>
                    <Skeleton className='w-full h-[450px]' />
                    <div className='flex items-center gap-x-5 justify-between mt-3 mb-1 w-full'>
                        <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                        <Skeleton className='w-full h-8' />
                    </div>
                    <Skeleton className='w-full h-8' />
                </div>
            </div>
        </Container>
    );
};

export default Loading;
