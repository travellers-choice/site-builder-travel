"use client";
import ComponentLoader from "@/components/ComponentLoader";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface Order {
  _id: string;
  referenceNumber: string;
  totalAmount: number;
  updatedAt: number;
  orderStatus: string;
  attraction: {
    logo: string;
    title: string;
    images: string[];
  };
  activities: {
    adultsCount: number;
    childrenCount: number;
  };
}

export default function ActractionOrders() {
  const [orders, setOrders] = useState([]);
  const { user, jwtToken } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState(true);

  const formatDate = (date: number) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!jwtToken) {
          throw new Error("JWT token is missing");
        }

        const response = await fetch(
          "https://api-server-i1.mytravellerschoice.com/api/v1/attractions/orders/all?limit=50",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response?.statusText}`);
        }

        const data = await response?.json();
        const orderData = data?.result;
        setOrders(orderData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [jwtToken]);

  if (loading) {
    return (
      <div className="space-y-2 p-5 mt-5">
        <ComponentLoader />
        <ComponentLoader />
        <ComponentLoader />
        <ComponentLoader />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-2xl md:text-3xl font-medium my-10 ">
        Attraction Orders
      </h1>
      {orders?.map((order: Order, index) => (
        <div key={index} className="mt-2">
          <Link
            href={`/profile/order/${order?._id}`}
            className="w-full flex flex-col sm:flex-row gap-3  h-fit border rounded-xl overflow-hidden p-2 "
          >
            <img
              className="w-full sm:w-[250px] h-[200px]  sm:h-[150px]  rounded-xl flex-shrink-0"
              src={`https://api-server-i1.mytravellerschoice.com/${order?.attraction?.images[0]}`}
              alt="img"
            />
            <section className="w-full text-sm flex flex-col h-[200px]  sm:h-[150px] justify-between">
              <div className="flex justify-between">
                <h1>Ref No: {order?.referenceNumber}</h1>
                <h1>{formatDate(order?.updatedAt)}</h1>
              </div>
              <h1>Name: {order?.attraction?.title}</h1>
              <h1>Adult Count:{order?.activities?.adultsCount}</h1>
              <h1>Child Count:{order?.activities?.childrenCount}</h1>
              <div className="flex justify-between">
                <h1>Status: {order?.orderStatus}</h1>
                <h1>Total Amount: {order?.totalAmount} AED</h1>
              </div>
            </section>
          </Link>
        </div>
      ))}
    </div>
  );
}
