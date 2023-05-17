import { Box } from "@mui/material";

const AuthPageGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="md:flex-row flex-col flex justify-center items-center w-full min-h-screen h-full">
      {children}
    </Box>
  );
};

export default AuthPageGrid;

const AuthPageGridItem = ({ children, className }: { children: React.ReactNode, className: string }) => {
  return <Box className={"w-full max-h-screen " + className}>{children}</Box>;
};

export { AuthPageGridItem };

AuthPageGridItem.defaultProps = {
  className: ""
}
