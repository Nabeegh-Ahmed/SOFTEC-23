import { Box, Typography } from "@mui/material";
import ContractCard from "../../../../components/ContractCard";

const ProfileRecentContracts = () => {
  return (
    <Box className="mt-5 p-5 px-6 border-[1px] border-gray-200 rounded-md flex gap-5 flex-col">
      <Typography variant="h5" fontWeight="bold">
        Recent Contracts
      </Typography>
      <ContractCard
        contractee="Saqib Ali"
        contractor="Farhan Ali"
        title="Nvidia 2080-Ti GPU"
        amount={80000}
      />
      <ContractCard
        contractee="Saqib Ali"
        contractor="Farhan Ali"
        title="Nvidia 2080-Ti GPU"
        amount={80000}
      />
      <ContractCard
        contractee="Saqib Ali"
        contractor="Farhan Ali"
        title="Nvidia 2080-Ti GPU"
        amount={80000}
      />
    </Box>
  );
};

export default ProfileRecentContracts;

