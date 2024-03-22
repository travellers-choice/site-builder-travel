'use client'
import { ReduxProvider } from "@/redux/Provider";
import React from "react";
import FetctInitialData from "./FetctInitialData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import FetchUserData from "@/FetchUserData";
function BasicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <div>
      <SessionProvider>
        <ReduxProvider>
          <FetctInitialData>
            <FetchUserData>
            <Header />
            {children}
            <Footer />
            </FetchUserData>
          </FetctInitialData>
        </ReduxProvider>
      </SessionProvider>
    </div>
  );
}
export default BasicLayout;
