import Container from '@/components/container';

const ConversationsLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container className='lg:pr-[30px] !pb-0 xl:!pb-[30px]'>
            <div className='h-full w-full flex gap-x-[30px] items-center xl:justify-center'>
                {children}
            </div>
        </Container>
    );
};

export default ConversationsLayout;
