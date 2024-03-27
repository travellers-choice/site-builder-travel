"use client";
import { setcurrentProfilePage } from "@/redux/features/UserSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuArrowDownToLine } from "react-icons/lu";
import { formatDate } from "@/utility/commonFunctions";
import ComponentLoader from "@/components/ComponentLoader";


export default function page({
  params,
}: {
  params: { orderId: string };
}): React.ReactElement {
  const [orderDetails, setOrderDetails] = useState<any>();
  const [attractionOrderInvoice, setAttractionOrderInvoice] =
    useState<null | Blob>(null);
  const [attractionOrderAllTickets, setAttractionOrderAllTickets] =
    useState<null | Blob>(null);
  const [attractionOrderSingleTicket, setAttractionOrderSingleTicket] =
    useState<null | Blob>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setcurrentProfilePage({ page: "Orders" }));
  });
  const { user, jwtToken } = useSelector((state: any) => state.user);

  const findOrderDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/single/${params.orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong.!");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  async function getOrderDetails() {
    try {
      const response = await findOrderDetails();
      setLoading(false)
      setOrderDetails(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, []);

  const fetchAttractionInvoice = async (attractionOrderId: string) => {
    console.log(jwtToken);

    try {
      const response = await fetch(
        ` ${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/invoice/${attractionOrderId}`,
        {
          headers: {
            Authorization: ` Bearer ${jwtToken}`,
            responseType: "arraybuffer",
            // "Content-Type": "arraybuffer",
          },
        }
      );
      console.log(response, "responeeee1");
      return response.blob();
    } catch (error) {
      console.log(error);
    }
  };

  async function getAttractionInvoice(attractionOrderId: string) {
    try {
      const response = await fetchAttractionInvoice(attractionOrderId);
      console.log(response, "responeeee2");
      if (response) {
        setAttractionOrderInvoice(response);
      } else {
        // Handle the case when response is undefined
        // For example, set an appropriate error message or handle it accordingly
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    {
      orderDetails?._id && getAttractionInvoice(orderDetails?._id);
      // orderDetails?._id && getAttractionInvoice('65fc27449bca27e6d19129c7');
    }
  }, [orderDetails?._id]);

  const handleDownload = () => {
    if (attractionOrderInvoice) {
      const pdfBlob = new Blob([attractionOrderInvoice], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "attractioninvoice.pdf";
      a.click();
    }
  };

  const fetchAttractionAllTickets = async (
    attractionOrderId: string,
    activityId: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/${attractionOrderId}/ticket/${activityId}`,
        {
          headers: {
            "Content-Type": "arraybuffer",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.blob();
    } catch (error) {
      console.log(error);
    }
  };
  async function getAttractionAllTickets(
    attractionOrderId: string,
    activityId: string
  ) {
    try {
      const response = await fetchAttractionAllTickets(
        attractionOrderId,
        activityId
      );

      if (response) {
        setAttractionOrderAllTickets(response);
      } else {
        // Handle the case when response is undefined
        // For example, set an appropriate error message or handle it accordingly
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDownloadAllTickets = () => {
    if (attractionOrderAllTickets) {
      const pdfBlob = new Blob([attractionOrderAllTickets], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "attractionalltickets.pdf";
      a.click();
    }
  };

  useEffect(() => {
    handleDownloadAllTickets();
  }, [attractionOrderAllTickets]);

  // -------------------------------------------
  async function getAttractionSingleTicket(
    attractionOrderId: string,
    activityId: string,
    ticketId: string
  ) {
    try {
      const response = await fetchAttractionSingleTicket(
        attractionOrderId,
        activityId,
        ticketId
      );

      if (response) {
        setAttractionOrderSingleTicket(response);
      } else {
        // Handle the case when response is undefined
        // For example, set an appropriate error message or handle it accordingly
      }
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAttractionSingleTicket = async (
    attractionOrderId: string,
    activityId: string,
    ticketId: string
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/attractions/orders/${attractionOrderId}/ticket/${activityId}/single/${ticketId}`,
        {
          headers: {
            "Content-Type": "arraybuffer",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.blob();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadSingleTicket = () => {
    if (attractionOrderSingleTicket) {
      const pdfBlob = new Blob([attractionOrderSingleTicket], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "attractionticket.pdf";
      a.click();
    }
  };

  useEffect(() => {
    handleDownloadSingleTicket();
  }, [attractionOrderSingleTicket]);

function loadingComponent(){
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
    <div className="w-full h-full p-2">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium my-10 text-center mb-5">
        Order Details
      </h1>

      {loading&&loadingComponent()}

      {orderDetails?.activities?.map((activity: any, index: number) => {
        return (
          <section key={index} className="w-full   border rounded-2xl p-3 mb-2">
            <section className="flex justify-between sm:px-[50px]">
              <div className=" mb-5">
                <h1 className="font-semibold text-lg">
                  {activity?.attraction?.title}
                </h1>
                <h1 className="text-stone-500 text-sm">
                  {activity?.bookingType.charAt(0).toUpperCase()}
                  {activity?.bookingType?.slice(1)}
                </h1>
              </div>
              <div className="">
                <h1>{activity?.transferType} Transfer</h1>
                <h1 className="text-sm">
                  {formatDate(orderDetails?.updatedAt)}
                </h1>
              </div>
            </section>
            <section className="flex justify-between sm:px-[50px] my-1">
              <div className="flex flex-col gap-2">
                <div className="flex ">
                  <h1 className=" w-20 font-medium">Status</h1>
                  <h2 className="text-center text-stone-500 text-sm">
                    :{" "}
                    {activity?.status.charAt(0).toLocaleUpperCase() +
                      activity?.status?.slice(1)}
                  </h2>
                </div>

                <div className="flex ">
                  <h1 className="w-20 font-medium">Adults</h1>
                  <h2 className="text-center text-stone-500 text-sm">
                    :{activity?.adultsCount} Adults
                  </h2>
                </div>
                <div className="flex ">
                  <h1 className="w-20 font-medium">Children</h1>
                  <h2 className="text-center text-stone-500 text-sm">
                    : {activity?.childrenCount} Children
                  </h2>
                </div>
                <div className="flex ">
                  <h1 className="w-20 font-medium">Infant</h1>
                  <h2 className="text-center text-stone-500 text-sm">
                    : {activity?.infantCount} Infants
                  </h2>
                </div>
              </div>
              <div className=" jusitify-center items-center">
                {activity.status !== "confirmed" ? (
                  <button className="w-[200px] p-2 border  border-stone-300 text-sm font-bold rounded-2xl text-stone-300 px-2 flex gap-2 justify-center items-center transition-all  ">
                    <LuArrowDownToLine className="w-6 h-6 " />
                    Dawnload Invoice
                  </button>
                ) : (
                  <section className="flex flex-col gap-3 ">
                    <button 
                      onClick={handleDownload}
                      className="w-[200px] p-2 border border-blue-500 text-sm font-bold rounded-2xl text-blue-900 px-2 flex gap-2 justify-center items-center transition-all hover:bg-blue-900 hover:text-white"
                    >
                      <LuArrowDownToLine className="w-6 h-6 " />
                      Dawnload Invoice
                    </button>

                    <button
                      onClick={() =>
                        getAttractionAllTickets(
                          orderDetails?._id,
                          activity?._id
                        )
                      }
                      className="w-[200px] p-2 border border-blue-500 text-sm font-bold rounded-2xl text-blue-900 px-2 flex gap-2 justify-center items-center transition-all hover:bg-blue-900 hover:text-white"
                    >
                      <LuArrowDownToLine className="w-6 h-6 " />
                      Download All Tickets
                    </button>
                  </section>
                )}
              </div>
            </section>
            {activity.status === "confirmed" &&<>
            
            {activity?.adultTickets?.map((adt: any, i: number) => (
              <>
                <div className="md:flex items-center md:gap-5 mt-3 sm:px-[50px]">
                  <p>Adult {i + 1}</p>
                  <button
                    className="w-[200px] p-2 border border-blue-500 text-sm font-bold rounded-2xl text-blue-900 px-2 flex gap-2 justify-center items-center transition-all hover:bg-blue-900 hover:text-white"
                    onClick={() =>
                      getAttractionSingleTicket(
                        orderDetails?._id,
                        activity?._id,
                        adt?.ticketNo
                      )
                    }
                  >
                    <LuArrowDownToLine className="w-6 h-6 " />
                    Download Ticket
                  </button>
                </div>
              </>
            ))}
     {activity?.childTickets?.length > 0 && <>
{activity?.childTickets?.map((child: any, i: number) => (
              <>
                <div className="md:flex items-center md:gap-5 mt-3 sm:px-[50px]">
                  <p>Child {i + 1}</p>
                  <button
                    className="w-[200px] p-2 border border-blue-500 text-sm font-bold rounded-2xl text-blue-900 px-2 flex gap-2 justify-center items-center transition-all hover:bg-blue-900 hover:text-white"
                    onClick={() =>
                      getAttractionSingleTicket(
                        orderDetails?._id,
                        activity?._id,
                        child?.ticketNo
                      )
                    }
                  >
                    <LuArrowDownToLine className="w-6 h-6 " />
                    Download Ticket
                  </button>
                </div>
              </>
            ))} 
     </> }
            </>}


            <section className="flex justify-end sm:px-[50px]">
              <div className=" ">
                <h1 className="font-medium">Grand Total</h1>
                <h1 className="text-center text-stone-500 text-sm">
                  {orderDetails?.totalAmount}AED
                </h1>
              </div>
            </section>
          </section>
        );
      })}
    </div>
  );
}
