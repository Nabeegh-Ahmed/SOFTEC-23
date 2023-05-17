import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import { BiChevronDown } from "react-icons/bi";
import { abbreviateCurrency } from "../../../../utils/currency";
import { ContractCardProps } from "./index.types";

const ContractCard = ({ contractee, contractor, amount, title }: ContractCardProps) => {
  return (
    <Card variant="outlined" className="pt-1 cursor-pointer">
      <CardContent>
        <Box className="flex justify-between items-center">
          <Box className="flex items-center gap-5">
            <Box className="relative w-fit flex">
              <Avatar src="/avatars/farhan.jpeg">
                S
              </Avatar>
              <Avatar
                className="absolute left-[-15%] top-0"
                src="/avatars/saqib.jpeg"
              >
                F
              </Avatar>
            </Box>
            <Box>
              <Typography variant="body1" className="text-gray-600">
                <ContractTitleSpecialHighlight name={contractee} /> will pay{" "}
                <ContractTitleSpecialHighlight
                  name={"PKR " + abbreviateCurrency(amount)}
                />{" "}
                to <ContractTitleSpecialHighlight name={contractor} /> for{" "}
                <ContractTitleSpecialHighlight name={title + "."} />
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton>
              <BiChevronDown />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContractCard;

const ContractTitleSpecialHighlight = ({ name }: { name: string }) => {
  return (
    <Typography component="span" variant="body1" className="text-black font-semibold border-b-2">
      {name}
    </Typography>
  )
}