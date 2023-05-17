import React from 'react'
import {
    Typography,
    Grid,
    Stack,
    Box,
    Button,
    IconButton,
    Snackbar,
    Rating
} from "@mui/material";
import { AddReviewProps } from './index.types';


// a beautiful component that allows users to add a review to a product

const AddReview: React.FC<AddReviewProps> = ({ onAddReview }) => {
    const [rating, setRating] = React.useState<number>(0);
    const [comment, setComment] = React.useState<string>("");


    return (
        <Box className="mt-5">
            <Typography variant="h6" fontWeight="bold" className="text-gray-600">
                Add a review
            </Typography>

            <Box className="mt-2">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} className="flex flex-col justify-between">
                        <Box className="flex items-center">
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue as number);
                                }}
                            />
                        </Box>

                        <Box className="mt-2">
                            <Typography variant="body2" className="text-gray-500">
                                Comment
                            </Typography>
                            <textarea
                                className="w-full border-[1px] border-gray-200 rounded-md p-3 mt-2"
                                value={comment}
                                required={true}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={12} className="flex flex-col justify-between">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onAddReview({ rating, comment })}
                        >

                            Add review
                        </Button>
                    </Grid>

                </Grid>
            </Box >
        </Box >
    )
}

export default AddReview