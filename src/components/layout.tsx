import React from "react";
import { AppProps } from "next/app";
import { type NextPage } from "next";
import Header from "./Header";
import Sidebar from "./Sidebar";
type Props = {
  children?: React.ReactNode;
};
const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
