'use client';

import React, { FC } from 'react';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PostControlProps {
    onChange: () => void;
    onDetele: () => void;
}

const PostControl: FC<PostControlProps> = ({ onChange, onDetele }) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <span className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#fafbfb] dark:hover:bg-gray78/10 cursor-pointer'>
                        <MoreHorizontal className='h-5 w-5' />
                    </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side='left'
                    className='absolute z-[999] top-[-6px] right-0 text-sm border !min-w-[80px] h-fit p-[5px] rounded-xl bg-white dark:bg-dark1'
                >
                    <DropdownMenuItem
                        onClick={onChange}
                        className='flex items-center w-full hover:bg-[#bdc3c7] dark:hover:bg-gray78/10 hover:bg-opacity-30 p-2 cursor-pointer !outline-none border-0'
                    >
                        <Edit className='mr-2 h-4 w-4' /> Sửa
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className='flex items-center w-full hover:bg-[#bdc3c7] dark:hover:bg-gray78/10 hover:bg-opacity-30 p-2 cursor-pointer !outline-none border-0'
                        onClick={onDetele}
                    >
                        <Trash className='mr-2 h-4 w-4' /> Xoá
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default PostControl;
