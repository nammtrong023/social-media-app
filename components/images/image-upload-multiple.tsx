import Image from 'next/image';
import axios from 'axios';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ImagesWrapper from './images-wraper';
import { toast } from 'sonner';

interface ImagesUploadProps {
    value: string[];
    disabled?: boolean;
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
}

const ImageUpLoadMultiple: React.FC<ImagesUploadProps> = ({
    value,
    disabled,
    onChange,
    onRemove,
}) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = useCallback(
        async (files: File[]) => {
            try {
                setIsUploading(true);

                if (files.length > 5) {
                    return toast.error('Tối đa là 5 hình!');
                }

                const formDataArray = files.map((file) => {
                    const formData = new FormData();

                    formData.append('file', file);
                    formData.append('upload_preset', 'kdvpxn15');

                    return formData;
                });

                const uploadPromises = formDataArray.map((formData) =>
                    axios.post('https://api.cloudinary.com/v1_1/di1knfmpc/image/upload', formData),
                );

                const responses = await Promise.all(uploadPromises);
                const newImageUrls = responses.map((response) => response.data.secure_url);

                onChange([...value, ...newImageUrls]);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setTimeout(() => {
                    setIsUploading(false);
                }, 500);
            }
        },
        [onChange, value],
    );

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        maxFiles: 5,
        multiple: true,
        onDrop: handleUpload,
    });

    return (
        <div className='w-full min-h-[220px] h-fit border dark:border-dark3 rounded-xl relative'>
            {value.length > 0 ? (
                <div className='h-fit group'>
                    <ImagesWrapper value={value}>
                        {isUploading ? (
                            <span className='absolute left-1/2 top-1/2 -translate-y-1/2'>
                                <Loader2 className='w-5 h-5 animate-spin' />
                            </span>
                        ) : (
                            value.map((url, index) => (
                                <div key={index} className='relative image-post'>
                                    <Image
                                        key={index}
                                        src={url}
                                        fill
                                        priority
                                        alt='Uploaded image'
                                        className='object-cover rounded-xl'
                                    />

                                    <button
                                        onClick={() => onRemove(url)}
                                        type='button'
                                        className='w-6 h-6 flex items-center justify-center rounded-full z-10 bg-dark4/70 dark:bg-dark3 hover:!bg-opacity-50 transition absolute top-2 right-2'
                                    >
                                        <X className='w-4 h-4' color='#fff' />
                                    </button>
                                </div>
                            ))
                        )}
                    </ImagesWrapper>
                    {value.length < 5 && (
                        <div className='flex items-center gap-x-3 absolute top-2 left-2 opacity-0 group-hover:opacity-100 z-20'>
                            <div {...getRootProps({})}>
                                <button
                                    disabled={disabled}
                                    type='button'
                                    className='p-2 gap-x-1 text-textGray rounded-lg hover:opacity-95 bg-white flex items-center justify-between text-base font-medium drop-shadow-sm'
                                >
                                    <ImagePlus className='w-[18px] h-[18px] text-zinc-700' />
                                    <span className='dark:text-dark1 text-sm'>Thêm ảnh</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='relative'>
                    <div
                        className='flex flex-col items-center justify-center gap-y-2 w-full min-h-[220px] rounded-xl hover:bg-opacity-20 transition-opacity duration-200 hover:bg-[#b2bec3] dark:hover:bg-gray78/20 cursor-pointer select-none'
                        {...getRootProps({})}
                    >
                        <input {...getInputProps({})} />
                        <button
                            disabled={disabled}
                            type='button'
                            className='flex flex-col items-center gap-y-2 select-none w-full h-full'
                        >
                            <span className='w-12 h-12 text-zinc-700 rounded-full bg-slate-200 flex items-center justify-center'>
                                <ImagePlus className='w-5 h-5' />
                            </span>
                            <p>Thêm ảnh</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpLoadMultiple;
