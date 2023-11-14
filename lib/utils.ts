import { twMerge } from 'tailwind-merge';
import viLocale from 'date-fns/locale/vi';
import { type ClassValue, clsx } from 'clsx';
import { formatDistanceToNowStrict } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCreatedAt = (createdAt: Date) => {
    if (!createdAt) {
        return null;
    }
    return formatDistanceToNowStrict(new Date(createdAt), { locale: viLocale });
};

export const getNextPageParam = (lastPage: any, pages: any[]) => {
    if (lastPage.length === 0) {
        return undefined;
    }

    return pages.length + 1;
};

export const getPreviousPageParam = (firstPage: any, pages: any[]) => {
    if (firstPage.length === 0) {
        return undefined;
    }

    return pages.length - 1;
};
