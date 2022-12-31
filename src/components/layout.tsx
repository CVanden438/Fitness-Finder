import React from "react";
import { AppProps } from "next/app";
import { type NextPage } from "next";
import Header from "./header";
type Props = {
  children?: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
