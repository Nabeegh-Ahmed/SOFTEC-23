import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Snackbar, Typography, Box, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LogoFull from "../../../../../components/LogoFull";
import SiteMap from "../../../../../routing/Sitemap";
import CustomButton from "../../../../../components/CustomButton";
import TOSNotice from "../../../components/TOSNotice";
import AuthPageTitle from "../../../components/AuthPageTitle";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../../components/FormInput";
import { RegisterFormType, genders } from "../../index.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "../../index.types";
import CustomeDropDown from "../../../../../components/CustomDropDown";
import { UserContext } from "../../../../../contexts/UserContext";
import { DatePicker } from "@mui/lab";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState<string>();
  console.log(selectedGender)

  // this is form validation logic
  const methods = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema)
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

  const {state, dispatch} = useContext(UserContext)

  const submitHandler = async(e: any) => {
    e.preventDefault()

    dispatch({ type: "REGISTER_REQUEST" })
    const res = await fetch(`${import.meta.env.VITE_URL ?? "http://localhost:8000" }/api/auth/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        email: e.target.elements.email.value, 
        password: e.target.elements.password.value, 
        name: e.target.elements.name.value,
        gender: e.target.elements.gender.value === "MALE" ? "M" : "F",
        dob: e.target.elements.dob.value,
      })
    })
    if (res.ok) {
      const data = await res.json()
      console.log(data)
      localStorage.setItem("access_token", data.accessToken)
      localStorage.setItem("user", JSON.stringify({user: data.data}))
      navigate("/login")
    } else {
      console.log(await res.json())
    }

  }

  useEffect(() => {
    if (state.user) {
      navigate("/app")
    }
  }, [state])

  return (
    <React.Fragment>
      {/* {user && <Navigate to={SiteMap.Home.path} />} */}
{/* 
      <Snackbar
        open={showRegisterErrorSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={() => setShowRegisterErrorSnackbar(false)}
        message="Registration failed. If this continues, please contact help@gamer.bazar."
      /> */}

      <Box className="flex flex-col max-w-sm m-auto">
        <LogoFull className="w-32 mb-16" />

        <AuthPageTitle
          title="Let's get started!"
          subtitle="Create an account."
        />

        <Box className="my-4">
          <Typography variant="body1">Already have an account?</Typography>
          <Typography variant="body1">
            <Link to={SiteMap.Login.path} className="font-bold">
              Sign in
            </Link>
            {", "}
            to your existing account.
          </Typography>
        </Box>

        {/* register form */}
        <Box className="my-5">
          <FormProvider {...methods}>
            <Box
              component="form"
              autoComplete="off"
              noValidate
              onSubmit={submitHandler}
            >
              <FormInput
                name="name"
                label="Full Name"
                type="text"
                placeholder="Farhan Ali"
              />
              <FormInput
                name="email"
                label="Email"
                type="email"
                placeholder="farhan@gamer.bazar"
              />
              <CustomeDropDown
                name="Gender"
                label="gender"
                options={genders}
                selected={selectedGender}
                setSelected={setSelectedGender}
                className="mb-2"
              />

              <FormInput
                name="password"
                label="Password"
                type="password"
                placeholder="•••••••••"
              />
              
              <FormInput
                name="dob"
                label="DOB"
                type="date"
                defaultValue={"23-04-2022"}
                placeholder="1998-12-23"
              />
              {/* 
              TODO: add date of birth field
              <CustomDatePicker
                name="dateOfBirth"
                label="Date of Birth"
                onChange={() => { }}
                value=""
              /> */}

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


        <TOSNotice />
      </Box>
    </React.Fragment>
  );
};

export default RegisterForm;
