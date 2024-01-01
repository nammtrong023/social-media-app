import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
    images: string[];
    className?: string;
    imageClassName?: string;
    onClick?: () => void;
}

const classNameControlBtn =
    'lg:flex items-center justify-center text-opacity-60 bg-[#ecf0f1]/60 rounded-full z-40 cursor-pointer w-6 h-6 top-1/2 -translate-y-1/2 hover:opacity-90 select-none hidden';

export default function Slider({
    images,
    className,
    imageClassName = 'object-cover rounded-2xl',
    onClick,
}: SliderProps) {
    return (
        <div className='scale-100 h-full'>
            <Swiper
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next',
                }}
                modules={[Pagination, Navigation]}
                className='mySwiper h-full'
            >
                {images.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={cn(
                                'min-h-[450px] relative h-full w-full',
                                className,
                            )}
                            onClick={onClick}
                        >
                            <Image
                                key={index}
                                src={item || '/profile-placeholder.jpg'}
                                alt='post'
                                fill
                                className={imageClassName}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <div className={cn('prev fixed left-1', classNameControlBtn)}>
                    <ChevronLeft size={20} className='dark:text-white' />
                </div>
                <div
                    className={cn(
                        'next fixed right-1 !overflow-visible',
                        classNameControlBtn,
                    )}
                >
                    <ChevronRight size={20} className='dark:text-white' />
                </div>
            </Swiper>
        </div>
    );
}
