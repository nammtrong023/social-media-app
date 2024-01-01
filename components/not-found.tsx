import Link from 'next/link';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import NotFoundIcon from '@/components/icon/not-found-icon';

export default function NotFound() {
    return (
        <div className='bg-white dark:bg-dark1 min-h-screen flex flex-col items-center justify-center gap-y-4'>
            <NotFoundIcon />
            <Heading title='Nội dung bạn đang tìm kiếm không tồn tại' />
            <Link href='/'>
                <Button className='font-medium text-base' variant='blue'>
                    Trang chủ
                </Button>
            </Link>
        </div>
    );
}
