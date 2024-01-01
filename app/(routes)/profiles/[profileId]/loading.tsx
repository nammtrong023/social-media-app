import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/container';

export default function Loading() {
    return (
        <Container className='lg:pr-[30px]'>
            <div className='bg-white dark:bg-dark1 pb-[30px] rounded-xl'>
                <Skeleton className='w-full h-[350px]' />
                <div className='px-[30px] mt-3 space-y-2'>
                    <div className='flex items-center justify-between'>
                        <Skeleton className='w-[150px] h-8' />
                        <Skeleton className='w-[150px] h-8' />
                    </div>
                    <Skeleton className='w-[120px] h-6' />
                </div>
            </div>
            <div className='mt-2 lg:mt-[30px]'>
                <div className='flex flex-col lg:flex-row gap-x-3 gap-y-3'>
                    <div
                        className='bg-white dark:bg-dark1 w-full lg:w-[240px] h-fit text-center rounded-xl px-3 py-2
                    flex flex-col items-center gap-y-2'
                    >
                        <Skeleton className='w-full lg:w-[200px] h-6' />
                        <Skeleton className='w-full lg:w-[200px] h-6' />
                        <Skeleton className='w-full lg:w-[200px] h-6' />
                        <Skeleton className='w-full lg:w-[200px] h-6' />
                    </div>
                    <div className='w-full lg:w-fit h-fit p-[18px] bg-white dark:bg-dark1 rounded-lg space-y-1'>
                        <div className='flex items-center gap-x-5 justify-between'>
                            <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                            <Skeleton className='h-8 w-full' />
                        </div>
                        <div className='mt-auto'>
                            <Skeleton className='w-[480px] h-8' />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
