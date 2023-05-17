import { Box } from "@mui/material";
import SideNavAlert from "../SideNavAlert";
import { useNavigate } from "react-router-dom";

const SideNavigationItem = ({
  active,
  showAlert,
  text,
  iconSrc,
  onClick,
  to,
}: {
  active: boolean;
  showAlert: boolean;
  text: string;
  iconSrc: string;
  onClick: () => void;
  to: string | undefined;
}) => {
  const navigate = useNavigate();

  return (
    <Box
      className={`${
        active ? "bg-gray-200" : "hover:bg-gray-100 text-gray-500"
      } text-black mb-1 flex select-none items-center p-3 rounded-lg hover:cursor-pointer font-semibold transition-all ease-linear text-sm`}
      onClick={() => {
        if (to) {
          navigate(to);
        }
        return onClick();
      }}
    >
      <Box className="pr-2">
        {showAlert ? (
          <SideNavAlert>
            <img
              draggable={false}
              src={iconSrc}
              className={"w-5 -z-10 " + (active ? "" : "opacity-50")}
            />
          </SideNavAlert>
        ) : (
          <img
            draggable={false}
            src={iconSrc}
            className={"w-5 " + (active ? "" : "opacity-50")}
          />
        )}
      </Box>
      {text}
    </Box>
  );
};

export default SideNavigationItem;
