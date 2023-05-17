import React, { useEffect, useState } from "react";
import { Box, Divider, Snackbar, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { useVerifyEmailMutation } from '../../../redux/api/authApi';
import FormInput from "../components/FormInput";
import CustomButton from "../../../components/CustomButton";
import SiteMap from "../../../routing/Sitemap";


const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const verificationCodeSchema = object({
    verificationCode: string().min(1, 'Verification code is required'),
});

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;

const EmailVerificationPage = () => {
    const { verificationCode } = useParams();

    const methods = useForm<VerificationCodeInput>({
        resolver: zodResolver(verificationCodeSchema),
    });

    // 👇 API Login Mutation
    const [verifyEmail, { isLoading, isError, error, isSuccess, data }] =
        useVerifyEmailMutation();

    const navigate = useNavigate();

    const {
        reset,
        handleSubmit,
        formState: { isSubmitSuccessful },
    } = methods;

    useEffect(() => {
        if (isSuccess) {
            navigate(SiteMap.Login.relativePath!);
        }
        if (isError) {
            if (Array.isArray((error as any).data.error)) {
                (error as any).data.error.forEach((el: any) =>
                    console.log(el.message)
                );
            } else {
                console.log((error as any).data.error.message);
            }
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful]);

    useEffect(() => {
        if (verificationCode) {
            reset({ verificationCode });
        }
    }, []);

    const onSubmitHandler: SubmitHandler<VerificationCodeInput> = ({
        verificationCode,
    }) => {
        verifyEmail(verificationCode);
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    Verify your email
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ textAlign: 'center', mb: 4 }}
                >
                    Please enter the verification code sent to your email
                </Typography>
                <FormProvider {...methods}>
                    <Box
                        component="form"
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <FormInput
                            name="verificationCode"
                            label="Verification Code"
                            type="text"
                            placeholder="Enter verification code"
                            sx={{ mb: 2 }}
                        />
                        <Box className="mt-2">
                            <CustomButton
                                variant="contained"
                                type="submit"
                                fullWidth
                                size="large"
                            >
                                Verify Email
                            </CustomButton>
                        </Box>

                    </Box>
                </FormProvider>
            </Box>
        </React.Fragment>
    )
};

export default EmailVerificationPage;