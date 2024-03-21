
import { setUser } from "@/redux/features/UserSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { SelectedCurrency } from "@/types/generaltypes";
import { useDispatch, useSelector } from "react-redux";

export const priceConversion = (
  price: number,
  selectedCurrency: SelectedCurrency,
  showIsocode: boolean = false
): string => {
  if (
    !price ||
    !selectedCurrency?.isocode ||
    !selectedCurrency?.conversionRate
  ) {
    return "0";
  }

  const convertedPrice = (
    Number(price) * selectedCurrency?.conversionRate
  )?.toFixed(2);

  return !showIsocode
    ? convertedPrice
    : `${convertedPrice} ${selectedCurrency?.isocode}`;
};


export function capitalizeFirstLetters(text: string) {
  const words = text?.split(" ");
  const capitalizedWords = words?.map(
    (word) => word?.charAt(0).toUpperCase() + word?.slice(1)
  );
  return capitalizedWords?.join(" ");
}


export async function getUserData(jwtToken:any,dispatch:any) {
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
