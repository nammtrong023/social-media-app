import React, { FC } from 'react';
import { TextareaAutosize } from '@mui/material';

interface TextAreaProps {
    value: string;
    autoFocus?: boolean;
    disabled: boolean;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
    onChange: () => void;
}

const TextareaPost: FC<TextAreaProps> = ({ value, disabled, textareaRef, onChange }) => {
    return (
        <div className='relative bg-[#f6f7f8] dark:bg-dark2 rounded-[10px] flex items-center justify-between w-full'>
            <TextareaAutosize
                value={value}
                ref={textareaRef}
                disabled={disabled}
                onChange={onChange}
                className='w-full pt-2 pb-1 flex resize-none items-center text-sm sm:text-base outline-none bg-[#f6f7f8] dark:bg-dark2 min-h-[30px] rounded-[10px] z-0 h-full pl-[10px]'
                maxLength={200}
                maxRows={5}
            />
        </div>
    );
};

export default TextareaPost;
