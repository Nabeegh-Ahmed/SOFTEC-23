import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { abbreviateCurrency } from "../../../../../../../utils/currency";
import CustomButton from "../../../../../../../components/CustomButton";
import { ArrowForward } from "@mui/icons-material";

const StatisticsCard = ({
  title,
  value,
  valueLastMonth,
}: {
  title: string;
  value: number;
  valueLastMonth: number;
}) => {
  const [percentChange, setPercentChange] = useState(0.0);

  useEffect(() => {
    const totalChange = (value - valueLastMonth) / valueLastMonth;
    setPercentChange(totalChange);
  }, [value, valueLastMonth]);

  return (
    <Box className="p-5 flex-1 border-[1px] rounded-md">
      <Box
        className={
          (percentChange > 0
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800") +
          " font-bold text-xs p-1 px-2 rounded-full w-fit"
        }
      >
        {percentChange > 0 && (
          <ArrowUpwardIcon fontSize="small" sx={{ fontSize: 14, mt: -0.5 }} />
        )}
        {percentChange <= 0 && (
          <ArrowDownwardIcon fontSize="small" sx={{ fontSize: 14, mt: -0.25 }} />
        )}
        {percentChange.toFixed(2) + "%"}
      </Box>

      <Box className="mt-4">
        <Typography variant="body1" fontWeight="bold" className="text-gray-600">
          {title}
        </Typography>
      </Box>

      <Box className="mt-2">
        <Typography variant="h5" fontWeight="bold">
          <Typography variant="overline" fontWeight="bold">PKR</Typography>{" "}
          {abbreviateCurrency(value)}
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle2" color="primary.light" className="cursor-pointer select-none">View details <ArrowForward sx={{ fontSize: 16 }} /></Typography>
      </Box>

    </Box>
  );
};

StatisticsCard.defaultProps = {
  title: "Card Title",
  value: 0,
  percentChange: 0,
};

export default StatisticsCard;
