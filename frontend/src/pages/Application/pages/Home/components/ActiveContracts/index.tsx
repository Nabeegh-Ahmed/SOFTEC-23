import { Typography, Box } from "@mui/material";
import ContractCard from "../../../../components/ContractCard";

const ActiveContracts = () => {
    return (
        <Box className="mt-10">
            {/* section title */}
            <Typography variant="h5" fontWeight="bold">
                Active Contracts
            </Typography>
            <Typography variant="body1" className="text-gray-500">
                Find your most recently created active contracts here.
            </Typography>
            <Box className="mt-5 flex flex-col gap-2">
                <ContractCard contractee="Saqib Ali" contractor="Farhan Ali" amount={42000} title="Nvidia 2080-Ti GPU" />
                <ContractCard contractee="Saqib Ali" contractor="Farhan Ali" amount={300} title="deploying backend to cloud" />
                <ContractCard contractee="Saqib Ali" contractor="Farhan Ali" amount={8725683} title="Good Condition Macbook Pro 2023" />
                <ContractCard contractee="Saqib Ali" contractor="Farhan Ali" amount={89000} title="Nvidia 3080-Ti GPU" />
            </Box>
        </Box>
    )
}

export default ActiveContracts;