import AuthPageTemplate from "../components/AuthPageTemplate";
import RegisterForm from "./components/RegisterForm";
import Page from "../../../components/Page";

const Register = () => {
  return (
    <Page title="Register - gamer.bazar">
      <AuthPageTemplate bgImage="bg-[url('../bgs/spiral_stairs.jpeg')]">
        <RegisterForm />
      </AuthPageTemplate>
    </Page>
  );
};

export default Register;
