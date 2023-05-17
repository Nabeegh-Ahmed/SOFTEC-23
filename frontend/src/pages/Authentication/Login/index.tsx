import AuthPageTemplate from "../components/AuthPageTemplate";
import LoginForm from "./components/LoginForm";
import Page from "../../../components/Page";

const Login = () => {
    return (
        <Page title="Login - gamer.bazar">
            <AuthPageTemplate>
                <LoginForm />
            </AuthPageTemplate>
        </Page>
    )
}

export default Login;