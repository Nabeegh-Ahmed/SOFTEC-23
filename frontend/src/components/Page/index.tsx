import React from "react";
import { Helmet } from "react-helmet";
import { PageProps } from "./index.types";
import favicon from '../../assets/branding/logo-emblem-black.svg';

const Page = ({ title, children }: PageProps) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{title}</title>
        <link rel="favicon" href={favicon} />
      </Helmet>
      {children}
    </React.Fragment>
  );
};

export default Page;