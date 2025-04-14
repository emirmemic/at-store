'use server';
import { fetchAPI } from '@/lib/fetch-api';

import { SuccessResponse, ErrorResponse } from './types';

const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;
const fields = 'name,opening_hours,rating,formatted_phone_number';

type ResponseType = SuccessResponse | ErrorResponse;
/**
 * Fetches opening hours from Google Places API
 * @param placeId - Google Place ID
 * @param language - Language code (default: 'bs')
 * @returns Opening hours data or error message
 */
export async function getPlaceDetails(
  placeId: string,
  language: string = 'bs'
) {
  if (!googleApiKey || !placeId) {
    return { error: 'Missing Google API key or Place ID' };
  }
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${googleApiKey}&language=${language}`;

  const response = await fetchAPI<ResponseType>(url, { method: 'GET' });
  if (!response) return { error: 'No response from API' };
  if (response.status !== 200 || !response.data)
    return { error: 'Invalid response from API' };

  const responseData = response.data;

  if ('error_message' in responseData) {
    return { error: responseData.error_message as string };
  }
  if (responseData) {
    return responseData;
  }

  return { error: 'Unexpected response format.' };
}
