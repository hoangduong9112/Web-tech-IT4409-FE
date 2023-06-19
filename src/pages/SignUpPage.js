import {withRouter } from 'react-router-dom';

const SignUpForm = () => {
    return(
        <></>
    );
}
export const SignUpPage = withRouter(() => {
    const onSubmit = async () => {
    };
    return (
        <div className={`flex h-full`}>
            <div className={`w-64 m-auto`}>
                <SignUpForm onSubmit={onSubmit} />
            </div>
        </div>
    );
});