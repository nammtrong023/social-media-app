import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { UserType } from '@/types';
import UserInfo from '../user/user-info';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';

interface UserListModalProps {
    title: string;
    buttonLabel: string;
    userList: UserType[];
}

export const UserListModal: FC<UserListModalProps> = ({
    title,
    buttonLabel,
    userList,
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant='link'
                    className='dark:text-dark4 text-gray78/60 p-0 h-fit focus-visible:ring-0 focus-visible:ring-offset-0'
                >
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px] dark:bg-dark1'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Separator />
                <ScrollArea className='flex flex-col gap-y-3 min-h-[425px] h-full'>
                    {userList.length !== 0 &&
                        userList.map((user) => (
                            <UserInfo key={user.id} user={user} />
                        ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};
