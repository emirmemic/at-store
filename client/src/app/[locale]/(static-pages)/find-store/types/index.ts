interface StoreType {
  id: string;
  name: string;
  address: string;
  cityPostcode: string;
  embedLink: string;
  placeId: string;
  phone: string;
}
interface OpeningHours {
  open_now: boolean;
  periods: {
    open: {
      day: number;
      time: string;
    };
    close: {
      day: number;
      time: string;
    };
  }[];
  weekday_text: string[];
}
interface PlaceDetailsSuccessResponse {
  html_attributions: string[];
  result: {
    formatted_phone_number: string;
    name: string;
    opening_hours: OpeningHours;
    rating: number;
    formatted_address: string;
    url: string;
  };
  status: string;
}
interface ErrorResponse {
  error_message: string;
  status: string;
}

export type {
  StoreType,
  OpeningHours,
  PlaceDetailsSuccessResponse,
  ErrorResponse,
};
