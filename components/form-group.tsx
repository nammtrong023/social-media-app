const FormGroup = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex mb-4 flex-col gap-y-4 sm:flex-row justify-between lg:mb-6 gap-x-5 lg:gap-y-3'>
            {children}
        </div>
    );
};
export default FormGroup;
