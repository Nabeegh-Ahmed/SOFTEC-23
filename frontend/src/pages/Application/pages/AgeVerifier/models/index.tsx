import { FormEvent, useEffect } from "react";
import { useState } from "react";

declare const faceapi: any;

export const loadModels = async () => {
    await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]);
};


// make inferenc. takes about 10-15 seconds.
export const predictions = async (img: HTMLImageElement, setAges: (age: number) => void) => {
    if (!img) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const input = new Promise<HTMLCanvasElement>((resolve) => {
        img.onload = async () => {
            const { width, height } = img;
            canvas.width = width;
            canvas.height = height;
            ctx!.drawImage(img, 0, 0, width, height);
            resolve(canvas);
        };
    });

    // size of the image, needed for the faceapi
    const displaySize = {
        width: (await input).width,
        height: (await input).height,
    };


    // make inferenc. takes about 10-15 seconds.
    const predictions = await faceapi
        .detectAllFaces(await input, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

    // results
    const resizedDetections = faceapi.resizeResults(predictions, displaySize);

    const ages = (resizedDetections.forEach((result: any) => {
        const { age } = result;
        setAges(Math.round(age));
        return age
    }));

    return ages;
}
