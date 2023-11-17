import axios from 'axios';

export const signInWithGG = async () => {
    const reponse = await axios.post(`${baseUrl}/oauth`);

    if (reponse.data) {
        router.push(reponse.data);

        if (code) {
            const { data } = await axios.get(
                `${baseUrl}/oauth/callback?code=${code}`,
            );

            setCookie('access_token', data?.accessToken);
            setCookie('refresh_token', data?.refreshToken);
            setAuthToken({
                accessToken: data?.accessToken,
                refreshToken: data?.refreshToken,
            });
        }
    }

    if (authToken?.accessToken && authToken?.refreshToken) {
        router.push('/');
        setisLoading(false);
    }
};
