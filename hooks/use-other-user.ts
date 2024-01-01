import useUsersApi from '@/api/users/use-users-api';
import { useQuery } from '@tanstack/react-query';

const useOtherUsers = () => {
    const { getOtherUsers } = useUsersApi();

    const { data: otherUsers } = useQuery({
        initialData: [],
        queryKey: ['get-other-users'],
        queryFn: getOtherUsers,
    });

    return otherUsers;
};

export default useOtherUsers;
