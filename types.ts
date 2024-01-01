export type Tokens = {
    accessToken: string | undefined;
    refreshToken: string | undefined;
};

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum NotiType {
    FOLLOW = 'FOLLOW',
    LIKE = 'LIKE',
    COMMENT = 'COMMENT',
    MESSAGE = 'MESSAGE',
}

export type UserType = {
    id: string;
    name: string;
    email: string;
    gender: Gender | null;
    bio: string | null;
    birth: Date;
    profileImage: string;
    coverImage: string;
    followingIds: string[];
    createdAt: Date;
};

export type PostType = {
    id: string;
    title: string | null;
    likedIds: string[];
    userId: string;
    createdAt: Date;
    user: UserType;
    images: ImageType[];
    comments: CommentType[];
};

export type ImageType = {
    id: string;
    url: string;
};

export type CommentType = {
    id: string;
    content: string;
    postId: string;
    userId: string;
    user: UserType;
    createdAt: Date;
};

export type NotificationType = {
    id: string;
    senderId: string;
    type: NotiType;
    postId: string;
    message: string;
    receiverId: string;
    hasSeen: boolean;
    seender: UserType;
    conversationId: string;
    createdAt: Date;
};

export type MessageType = {
    id: string;
    image: string;
    content: string;
    sender: UserType;
    createdAt: Date;
};

export type ConversationType = {
    id: string;
    lastMessageAt: Date;
    messages: MessageType[];
    users: UserType[];
};

export type FilterPostType = {
    data: PostType[];
    currentPage: number;
    itemsPerPage: number;
    total: number;
};
