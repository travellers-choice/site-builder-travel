import { UUID } from "crypto";

export interface SelectedCurrency {
    isocode: string;
    conversionRate: number;
    flag: string;
  }
  
  export interface InitialAttractionDestiantions {
    country?: string;
    createdAt?: Date | string;
    image?: string;
    isDeleted?: boolean;
    name?: string;
    updatedAt?: Date | string;
    __v?: number;
    _id?: string;
  }


export interface InitialCountries {
  countryName?: string;
  createdAt?: Date | string;
  flag?: string;
  isDeleted?: boolean;
  isocode?: string;
  phonecode?: string;
  updatedAt?: Date | string;
  __v?: number;
  _id?: UUID | string;
}

export interface InitialCurrencies {
  conversionRate?: number;
  country?: InitialCountries;
  createdAt?: Date | string;
  currencyName?: string;
  currencySymbol?: string;
  isocode?: string;
  updatedAt?: Date | string;
  __v?: number;
  _id?: string;
}

export interface InitialHotelDestinations {
  childSuggestions?: Array<any>;
  cityId?: string;
  cityName?: string;
  clickable?: boolean;
  countryName?: string;
  propertyCount?: number;
  stateName?: string;
  suggestionType?: string;
  _id?: string;
}