import { Box, Divider } from "@mui/material";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  return (
    <Box className="mt-5 w-full flex gap-5">
      <StatisticsCard
        title="Active Contracts Value"
        value={1425267}
        valueLastMonth={76347}
      />
      <StatisticsCard
        title="Total Earnings"
        value={328387}
        valueLastMonth={82382}
      />
      <StatisticsCard
        title="Total Expenses"
        value={318372198}
        valueLastMonth={3827498748}
      />
      
    </Box>
  );
};

export default Statistics;
