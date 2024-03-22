import { UUID } from "crypto";
export enum OfferTypeEnum {
  percentage = "percentage",
  flat = "flat",
}

export enum CancellationTypeEnum {
  nonRefundable = "nonRefundable",
  freeCancellation = "freeCancellation",
  cancelWithFee = "cancelWithFee",
}

export enum DurationTypeEnum {
  hours = "hours",
  days = "days",
  months = "months",
}


interface CategoryData {
    categoryName: string,
    _id: string,
    description: string,
    icon: string,
    updatedAt: string,
    slug: string
  }

  export interface ActivitySearchByDestination {
    activityType: string;
    isPrivateTransferAvailable: boolean;
    isSharedTransferAvailable: boolean;
    lowPrice: number;
  }
  
  export interface MarkupSearchByDestination {
    activityId: UUID | string;
    adultMarkup: number;
    adultMarkupType: OfferTypeEnum;
    childMarkup: number;
    childMarkupType: OfferTypeEnum;
    createdAt: Date | string;
    infantMarkup: number;
    infantMarkupType: OfferTypeEnum;
    updatedAt: Date | string;
    __v?: number;
    _id: string;
  }
  export interface PrivateTransferSearchByDestination {
    cost: number;
    maxCapacity: number;
    name: string;
    price: number;
    _id: UUID | string;
  }
  
  export interface DestinationSearchByDestination {
    country: UUID | string;
    createdAt: Date | string;
    image?: string;
    isDeleted: boolean;
    name: string;
    updatedAt: Date | string;
    __v?: number;
    _id: UUID | string;
  }
  

export interface CategorySearchByDestination {
  categoryName: string;
  slug: string;
}


  export interface SearchByDestination {
    activity: ActivitySearchByDestination;
    markup: MarkupSearchByDestination;
    privateTransfer: PrivateTransferSearchByDestination;
    category: CategorySearchByDestination;
    destination: DestinationSearchByDestination;
    averageRating: number;
    bookingType: string;
    cancelBeforeTime?: string;
    cancellationFee?: string;
    cancellationType: CancellationTypeEnum;
    duration: number;
    durationType: DurationTypeEnum;
    images: string[];
    isCombo: boolean;
    isOffer: boolean;
    lowPrice: number;
    isPromoCode: boolean;
    offerAmount?: number;
    offerAmountType: OfferTypeEnum;
    slug: string;
    title: string;
    totalReviews: number;
    _id: UUID | string;
  }

  