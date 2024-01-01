'use client';

import { Smile } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface EmojiPickerProps {
    size?: number;
    onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange, size = 16 }: EmojiPickerProps) => {
    return (
        <Popover>
            <PopoverTrigger className='flex items-center justify-center gap-x-[10px] dark:text-white text-[#4E5D78] font-medium hover:bg-[#ecedee] hover:bg-opacity-70 dark:hover:bg-gray78/10 w-8 h-8 p-1 rounded-full cursor-pointer transition focus-visible:ring-0 focus-visible:ring-offset-0'>
                <Smile size={size} />
            </PopoverTrigger>
            <PopoverContent
                side='right'
                sideOffset={40}
                className='bg-transparent border-none shadow-none drop-shadow-none mb-16 w-fit'
            >
                <Picker
                    data={data}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    );
};

export default EmojiPicker;
