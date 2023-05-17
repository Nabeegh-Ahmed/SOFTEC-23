import { Link } from "react-router-dom";

const HeaderLink = ({ title, href }: { title: string; href: string }) => {
  return (
    <Link className="mr-4" to={href}>
      {title}
    </Link>
  );
};

export default HeaderLink;

HeaderLink.defaultProps = {
  title: "Dummy Link",
  href: "#",
};
