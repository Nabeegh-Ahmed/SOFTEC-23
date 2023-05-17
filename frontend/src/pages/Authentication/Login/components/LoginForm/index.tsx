import React, { useEffect, useState } from "react";
import { Box, Divider, Snackbar, Typography } from "@mui/material";
import LogoFull from "../../../../../components/LogoFull";
import SiteMap from "../../../../../routing/Sitemap";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../../../../../components/CustomButton";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormType, loginFormSchema } from "../../index.types";
import FormInput from "../../../components/FormInput";
import TOSNotice from "../../../components/TOSNotice";
import AuthPageTitle from "../../../components/AuthPageTitle";
import { UserContext } from "../../../../../contexts/UserContext";

const LoginForm = () => {
  // pull the existing user from context
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext)


  // being used to show any errors that may happen with authentication
  const [showLoginErrorSnackbar, setShowLoginErrorSnackbar] = useState(false);

  // this hook is used to handle google auth
  // will discuss with farhan and we may get rid of this
  // it returns an access token
  // const login = useGoogleLogin({
  //   onSuccess: (userAuthObject) => setUserAuthObject(userAuthObject as AuthorizedUserObject),
  //   onError: (error) => setShowLoginErrorSnackbar(true),
  //   onNonOAuthError: (error) => setShowLoginErrorSnackbar(true),
  // });

  // this is form validation logic
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  // when the form is submitted successfully, it resets the fields
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  const loginHandler = async(e: any) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_REQUEST" })
    const res = await fetch(`${import.meta.env.VITE_URL ?? "http://localhost:8000" }/api/auth/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: e.target.elements.email.value, password: e.target.elements.password.value })
    })
    if (res.ok) {
      const data = await res.json()

      localStorage.setItem("access_token", data.accessToken)
      localStorage.setItem("user", JSON.stringify({user: data.data}))
      dispatch({ type: "LOGIN_SUCCESS", payload: data.data })
    }
  }

  useEffect(() => {
    if (state.user) {
      if(state.user.role === "admin")
      navigate("/admin/")
      else {
        navigate("/app/")
      }
    }
  }, [state])

  // handle login form submission here
  // const onSubmitHandler: SubmitHandler<LoginFormType> = (values) => {
  //   console.log(values);
  //   loginUser(values);
  // };

  return (
    <React.Fragment>
      {/* {user && <Navigate to={SiteMap.Home.path} />} */}

      <Snackbar
        open={showLoginErrorSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setShowLoginErrorSnackbar(false)}
        message="Login failed. If this continues, please contact help@gamer.bazar."
      />

      <Box className="flex flex-col max-w-sm m-auto">
        <LogoFull className="w-32 mb-16" />

        <AuthPageTitle title="Welcome back!" subtitle="Sign in to continue." />

        <Box className="my-4">
          <Typography variant="body1">Don't have an account?</Typography>
          <Typography variant="body1">
            <Link to={SiteMap.Register.path} className="font-bold">
              Create your account
            </Link>
            {", "}
            it only takes a minute.
          </Typography>
        </Box>

        {/* login form */}
        <Box className="my-5">
          <FormProvider {...methods}>
            <Box
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={loginHandler}
            >
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="farhan@gamer.bazar"
              />
              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="•••••••••"
              />
              <Box className="mt-2">
                <CustomButton
                  variant="contained"
                  type="submit"
                  fullWidth
                  size="large"
                >
                  Continue with Email
                </CustomButton>
              </Box>
            </Box>
          </FormProvider>
        </Box>

        {/* <Divider>
          <Typography variant="overline">OR</Typography>
        </Divider>
 */}
        {/* google authentication section */}
        {/* <Box className="my-5">
          <CustomButton
            onClick={() => login()}
            fullWidth
            variant="outlined"
            startIcon={<FcGoogle />}
            size="large"
          >
            Continue with Google
          </CustomButton>
        </Box> */}

        <TOSNotice />
      </Box>
    </React.Fragment>
  );
};

export default LoginForm;
