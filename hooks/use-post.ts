import { create } from 'zustand';

interface IPostState {
    postData: {
        title: string | null;
        images: string[];
        postId: string;
    };
    setPostData: (state: { title: string | null; images: string[]; postId: string }) => void;
}

const usePostStore = create<IPostState>((set) => ({
    postData: {
        title: '',
        images: [],
        postId: '',
    },
    setPostData: (state) => set({ postData: state }),
}));

export { usePostStore };
