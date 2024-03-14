import { SelectedCurrency } from "@/types/generaltypes";

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