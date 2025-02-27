import { redirect } from 'next/navigation';

/**
 * Next.js specific fetch request configuration
 * @property revalidate - Time in seconds for cache revalidation, false for no revalidation
 * @property tags - Cache tags for manual invalidation
 */
type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  authToken?: string;
  body?: Record<string, unknown>;
  /** Next.js cache configuration for the request */
  next?: NextFetchRequestConfig;
  timeout?: number;
}

/** Strapi specific error response structure */
type StrapiError = {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
};

type APIResponse<T = unknown> = {
  status: number;
  statusText: string;
  data?: T;
  type: ResponseType;
  error?: StrapiError;
};

/**
 * Handles successful JSON response
 * @param response - Fetch Response object
 * @param responseData - Parsed JSON data
 */
const handleSuccessResponse = <T>(
  response: Response,
  responseData: T
): APIResponse<T> => ({
  status: response.status,
  statusText: response.statusText,
  type: response.type,
  data: responseData,
});

/**
 * Handles error JSON response
 * @param response - Fetch Response object
 * @param responseData - Parsed JSON data containing error
 */
const handleErrorResponse = (
  response: Response,
  responseData: { error: StrapiError }
): APIResponse => ({
  status: response.status,
  statusText: response.statusText,
  type: response.type,
  error: responseData.error,
});

/**
 * Fetches data from the API with proper error handling
 * @param url - API endpoint URL
 * @param options - Fetch options including method, auth, and body
 * @returns Promise with typed API response
 */
export async function fetchAPI<T = unknown>(
  url: string,
  options: FetchAPIOptions
): Promise<APIResponse<T>> {
  const { method, authToken, body, next, timeout = 8000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const headers: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, headers);
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!isJson) {
      throw new Error('Invalid response format');
    }

    const responseData = await response.json();

    // Check for unauthorized status and redirect
    if (response.status === 401 || response.status === 403) {
      redirect('/login');
    }

    return response.ok
      ? handleSuccessResponse(response, responseData)
      : handleErrorResponse(response, responseData);
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 500,
        statusText: error.message,
        type: 'error',
        error: {
          status: 500,
          name: error.name,
          message: error.message,
          details: {
            stack: error.stack,
            cause: error.cause,
          },
        },
      };
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
