interface StoreType {
  id: string;
  name: string;
  address: string;
  cityPostcode: string;
  embedLink: string;
  placeId: string;
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
interface SuccessResponse {
  html_attributions: string[];
  result: {
    formatted_phone_number: string;
    name: string;
    opening_hours: OpeningHours;
    rating: number;
  };
  status: string;
}
interface ErrorResponse {
  error_message: string;
  status: string;
}

export type { StoreType, OpeningHours, SuccessResponse, ErrorResponse };
