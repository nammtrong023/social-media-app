'use client';

import { cn } from '@/lib/utils';
import { Gender } from '@/types';
import GenderIcon from '../icon/gender-icon';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioGroupFormProps {
    field: {
        value: Gender | null;
        onChange: (value: string) => void;
    };
    disabled: boolean;
    className?: string;
}

export function RadioGroupForm({
    field,
    disabled,
    className,
}: RadioGroupFormProps) {
    return (
        <FormControl className={cn('mr-auto w-[240px] !mt-5', className)}>
            <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value as string | undefined}
                className='flex items-center gap-x-5'
                disabled={disabled}
            >
                <GenderIcon />
                <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                        <RadioGroupItem value='MALE' />
                    </FormControl>
                    <FormLabel className='cursor-pointer text-base'>
                        Nam
                    </FormLabel>
                </FormItem>
                <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                        <RadioGroupItem value='FEMALE' />
                    </FormControl>
                    <FormLabel className='cursor-pointer text-base'>
                        Nữ
                    </FormLabel>
                </FormItem>
            </RadioGroup>
        </FormControl>
    );
}
