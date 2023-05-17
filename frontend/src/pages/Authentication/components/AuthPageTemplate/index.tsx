import AuthPageGrid from "../AuthPageGrid";
import { AuthPageGridItem } from "../AuthPageGrid";

const AuthPageTemplate = ({ children, bgImage }: { children: React.ReactNode, bgImage: string }) => {
  return (
    <AuthPageGrid>
      <AuthPageGridItem className={"hidden overflow-hidden lg:block saturate-50 min-h-screen bg-black p-0 " + bgImage + " bg-cover bg-center"}>
        {""}
      </AuthPageGridItem>
      <AuthPageGridItem className="px-5 py-16 overflow-y-scroll">{children}</AuthPageGridItem>
    </AuthPageGrid>
  );
};

export default AuthPageTemplate;

AuthPageTemplate.defaultProps = {
  bgImage: "bg-[url('../bgs/handshake.jpeg')]"
};