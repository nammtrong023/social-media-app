'use client';

import axios from 'axios';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useDropzone } from 'react-dropzone';
import { Separator } from '../ui/separator';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { FC, useCallback, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useModalStore } from '@/hooks/use-modals';

interface ImageUploadProps {
    value: string;
    loading?: boolean;
    type: 'profileImage' | 'coverImage' | null;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    onSubmit: () => void;
}

export const ImageUpload: FC<ImageUploadProps> = ({
    value,
    type,
    loading,
    onChange,
    onRemove,
    onSubmit,
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const { isOpen, type: modalType, onClose } = useModalStore();

    const isModalOpen = isOpen && modalType === 'uploadImage';

    const isProfileImage = type === 'profileImage';
    const isCoverImage = type === 'coverImage';

    const handleUpload = useCallback(
        async (files: File[]) => {
            try {
                setIsUploading(true);

                const formData = new FormData();
                formData.append('file', files[0]);
                formData.append('upload_preset', 'kdvpxn15');

                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/di1knfmpc/image/upload',
                    formData,
                );

                const imageUrl = response.data.secure_url;
                onChange(imageUrl);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setTimeout(() => {
                    setIsUploading(false);
                }, 500);
            }
        },
        [onChange],
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        multiple: false,
        onDrop: handleUpload,
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent
                className={cn(
                    'w-full',
                    isCoverImage ? 'max-w-4xl' : 'sm:max-w-[425px]',
                )}
            >
                <DialogHeader>
                    <DialogTitle>
                        {isProfileImage
                            ? 'Ảnh đại diện'
                            : isCoverImage
                            ? 'Ảnh nền'
                            : 'Hình ảnh'}
                    </DialogTitle>
                </DialogHeader>
                <Separator />
                <div className='w-full min-h-[300px] h-fit border relative rounded-xl'>
                    {value ? (
                        <>
                            {isUploading ? (
                                <span className='absolute left-1/2 top-1/2 -translate-y-1/2'>
                                    <Loader2 className='w-5 h-5 animate-spin' />
                                </span>
                            ) : (
                                <div
                                    className={cn(
                                        'relative min-w-[350px] w-full h-[350px]',
                                        isCoverImage && 'max-w-5xl w-full',
                                    )}
                                >
                                    <Image
                                        src={value}
                                        fill
                                        priority
                                        sizes='100vw'
                                        alt='Uploaded image'
                                        className='object-cover rounded-xl'
                                    />

                                    <button
                                        onClick={() => onRemove(value)}
                                        className='w-6 h-6 flex items-center justify-center rounded-full z-10 bg-[#a4b0be] hover:!bg-opacity-90 absolute top-2 right-2'
                                    >
                                        <X className='w-4 h-4' color='#fff' />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className='relative'>
                            <div
                                className='bg-grayf9 flex flex-col items-center justify-center gap-y-2 w-full min-h-[300px] rounded-xl hover:bg-opacity-20 transition-opacity duration-200 hover:bg-[#b2bec3] dark:hover:bg-gray78/20 cursor-pointer select-none'
                                {...getRootProps({})}
                            >
                                <input {...getInputProps({})} />
                                <button className='flex flex-col items-center gap-y-2 select-none w-full h-full focus-visible:ring-0 focus-visible:ring-offset-0'>
                                    <span className='w-12 h-12 text-zinc-700 rounded-full bg-slate-200 flex items-center justify-center'>
                                        <ImagePlus className='w-5 h-5' />
                                    </span>
                                    <p>Thêm hình ảnh</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button
                        disabled={value === '' || loading}
                        type='submit'
                        variant='blue'
                        onClick={onSubmit}
                        className='flex items-center justify-center'
                    >
                        {loading ? (
                            <Loader2 className='w-4 h-4 animate-spin' />
                        ) : (
                            'Tải ảnh'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
