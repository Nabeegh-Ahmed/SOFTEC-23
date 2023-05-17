import {
    Typography,
    Grid,
    Stack,
    Box,
    Button,
    IconButton,
    Snackbar,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import React, { useEffect } from "react";
import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { loadModels, predictions } from "./models";
import { AgeVerifierProps } from "./index.types";

const videoConstraints = {
    facingMode: "user",
    aspectRatio: 640 / 480,
};

const AgeVerifier: React.FC<AgeVerifierProps> = ({ setAge, onContinue }) => {
    const [webcamImageBase64, setwebcamImageBase64] = useState<string | null>(null);
    const takePictureButtonRef = useRef<HTMLButtonElement>(null);
    const webcamRef = useRef<Webcam>(null);
    const blackBoxRef = useRef<HTMLDivElement>(null);
    const [isModelLoaded, setIsModelLoaded] = useState(true);
    const image = useRef<HTMLImageElement>(null)

    const handleTakePictureClick = useCallback(() => {
        console.log("take picture clicked");

        if (!takePictureButtonRef?.current) return;

        if (takePictureButtonRef.current.textContent === "Retake") {
            setwebcamImageBase64(null);
        } else {
            if (!webcamRef?.current) return;
            setwebcamImageBase64(webcamRef.current.getScreenshot());
        }
    }, [webcamRef]);


    useEffect(() => {
        if (!image.current) return;

        predictions(image.current, setAge).then((ages) => { });
    }, [webcamImageBase64]);

    useEffect(() => {
        loadModels().then(() => {
            setIsModelLoaded(true);
        });
    }, []);

    return (

        isModelLoaded ? (
            <Box
                sx={{
                    maxWidth: "min(100%, 50rem)",
                    margin: "0 auto",
                }}
            >
                <Typography my={2} textAlign="center">
                    {"Before we continue, let's verify your age!"}
                </Typography>

                <Box
                    mt={2}
                    ref={blackBoxRef}
                    sx={{
                        backgroundColor: "#000",
                        color: "white",
                        aspectRatio: "640/480",
                    }}
                >
                    {!webcamImageBase64 ? (
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            width={blackBoxRef?.current?.clientWidth || 800}
                            height={blackBoxRef?.current?.clientHeight || 600}
                        />
                    ) : (
                        <img src={webcamImageBase64 ?? ""} alt="face" ref={image} />
                    )}
                </Box>

                <Stack direction="row" mt={5} mb={5} justifyContent="space-between">
                    <Button
                        ref={takePictureButtonRef}
                        onClick={handleTakePictureClick}
                        startIcon={
                            webcamImageBase64 ? <ReplayRoundedIcon /> : <CameraAltIcon />
                        }
                        variant="contained"
                        disableElevation
                        color="primary"
                        sx={{ textTransform: "none", float: "left", mt: 2 }}
                    >
                        {webcamImageBase64 ? "Retake" : "Take a picture"}
                    </Button>

                    {
                        <Button
                            disabled={webcamImageBase64 == null}
                            variant="contained"
                            disableElevation
                            color="secondary"
                            endIcon={<ArrowForwardIcon />}
                            sx={{ textTransform: "none", float: "right", mt: 2 }}
                            onClick={() => {
                                onContinue()
                            }}
                        >
                            Continue
                        </Button>
                    }
                </Stack>
            </Box>
        ) : (
            <Snackbar open={true} message="Loading models..." key="loading-models" />
        )
    );
};

export default AgeVerifier;