"use client";
import React, { useEffect, useState } from "react";
import Modal from "./(maodal)/Modal";
import Login from "./Login";
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/features/UserSlice";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
export default function Header() {
  const { user, jwtToken } = useSelector((state: any) => state.user);
  const [loginModal, setLoginModal] = useState(false);
  const [signUpodal, setSignUpModal] = useState(false);
  const dispatch = useDispatch();

  function loginContent() {
    return (
      <Login setSignUpModal={setSignUpModal} setLoginModal={setLoginModal} />
    );
  }

  function signUpContent() {
    return (
      <SignUp setSignUpModal={setSignUpModal} setLoginModal={setLoginModal} />
    );
  }

  return (
    <div className="w-full py-5 padding flex items-center justify-between">
      <Link href={"/"}>
        <img
          src="https://sandbox.bookingcore.co/uploads/demo/general/logo.svg"
          alt="logo"
        />
      </Link>
      <div className="flex  gap-3 text-lg font-semibold">
        {/* <i className="field-icon fa icofont-map"></i> */}

        <Modal
          modalOpen={loginModal}
          setModalOpen={setLoginModal}
          children={loginContent()}
        />
        <Modal
          modalOpen={signUpodal}
          setModalOpen={setSignUpModal}
          children={signUpContent()}
        />
        {!user?.name && (
          <div
            className="cursor-pointer"
            onClick={(e) => {
              setLoginModal(true);
              e.stopPropagation();
            }}
          >
            LOGIN
          </div>
        )}

        {user?.name && jwtToken && (
          <Link
            className="cursor-pointer rounded-full bg-violet-500 w-10 h-10 justify-center items-center flex text-white"
            href="/profile"
          >
            {(user?.name.charAt(0) || "").toUpperCase()}
          </Link>
        )}
      </div>
    </div>
  );
}
