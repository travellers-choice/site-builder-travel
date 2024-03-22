'use client'

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "@/redux/features/UserSlice";




const FetchUserData = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const dispatch = useDispatch<AppDispatch>()
    const jwtToken = typeof window !== "undefined" && localStorage.getItem("random-string") ? localStorage.getItem("random-string") : "";
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/users/my-account`, {
                    next: { revalidate: 10 }, headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                })

                dispatch(setUser({ user: await response.json(), jwtToken: jwtToken }));
            } catch (err: any) {
                console.log(err, "user-data");
            }
        }
        getUserData()

    }, [dispatch])



    return <>
    {children}
    </>;

}

export default FetchUserData