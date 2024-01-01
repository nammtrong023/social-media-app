import Container from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    const loadingItems = Array.from({ length: 10 }).map((_, index) => (
        <div
            key={index}
            className='py-[10px] px-5 border border-x-0 last:border-b-2'
        >
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-x-5'>
                    <div className='flex items-center gap-x-4'>
                        <Skeleton className='flex-shrink-0 w-10 h-10 rounded-full' />
                        <div className='space-y-1'>
                            <Skeleton className='w-[225px] h-6' />
                            <Skeleton className='w-9 h-4' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <Container showRightBar>
            <div className='w-full rounded-xl py-5 bg-white dark:bg-dark1 h-[95vh]'>
                <div className='px-5 mb-5'>
                    <Skeleton className='w-[90px] h-[30px]' />
                </div>
                <Separator />
                {loadingItems}
            </div>
        </Container>
    );
}
