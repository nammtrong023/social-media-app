import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IconType } from 'react-icons/lib';

interface SidebarItemProps {
    label: string;
    href: string;
    active?: boolean;
    alert?: boolean;
    icon: IconType;
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    alert,
    active,
    icon: Icon,
    onClick,
}) => {
    return (
        <li
            className='w-full flex items-center justify-center min-h-[50px]'
            onClick={onClick}
            key={label}
        >
            <Link
                href={href}
                title={label}
                className={cn(
                    'select-none flex !min-w-[56px] md:min-w-min flex-col md:flex-row justify-center lg:justify-normal lg:gap-x-4 gap-y-1 p-2 lg:py-4 lg:px-5 w-fit lg:w-full rounded-[10px] cursor-pointer items-center h-full min-h-[45px]',
                    active
                        ? 'bg-[#ecf0f1]/90 text-dark1 dark:bg-gray78/50 dark:text-white'
                        : 'hover:bg-[#ecf0f1]/50 dark:hover:bg-gray78/20',
                )}
            >
                <div className='relative'>
                    <Icon size={16} className={cn(active && 'text-dark1 dark:text-white')} />
                    {href === '/notifications' && alert && (
                        <div className='w-[10px] h-[10px] absolute -top-1 -right-1 bg-orange-500 rounded-full' />
                    )}
                </div>
                <p className='text-[10px] font-normal hidden lg:inline-block md:text-base md:font-medium'>
                    {label}
                </p>
            </Link>
        </li>
    );
};

export default SidebarItem;
