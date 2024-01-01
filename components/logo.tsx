import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href='/'>
            <span className='flex items-center gap-x-3 w-[220px]'>
                <div className='relative w-4 h-4 lg:w-[26px] lg:h-[26px]'>
                    <Image fill alt='logo' src='/logo.svg' />
                </div>
                <p className='font-bold text-sm lg:text-lg'>Meetmax</p>
            </span>
        </Link>
    );
};
