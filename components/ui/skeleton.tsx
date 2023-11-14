import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn('animate-pulse rounded-md bg-muted dark:bg-dark2', className)}
            {...props}
        />
    );
}

export { Skeleton };
