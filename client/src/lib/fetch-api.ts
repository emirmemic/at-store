import { redirect } from '@/i18n/routing';

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
  body?: Record<string, unknown> | FormData;
  /** Next.js cache configuration for the request */
  next?: NextFetchRequestConfig;
  timeout?: number;
}

/** Strapi specific error response structure */
export type StrapiError = {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
};

export interface StrapiValidationError {
  message: string;
  path: string[];
}
export type APIResponse<T = unknown> = {
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
const handleErrorResponse = <T>(
  response: Response,
  responseData: { error: StrapiError }
): APIResponse<T> => ({
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

  // Determine if the body is an instance of FormData
  const isFormData = body instanceof FormData;

  // Build headers: omit Content-Type for FormData so the browser sets it properly.
  const fetchHeaders = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };

  // Set the final body. If it's FormData leave it as-is; if not, stringify it.
  const finalBody = isFormData ? body : JSON.stringify(body);

  const requestInit: RequestInit = {
    method,
    headers: fetchHeaders,
    ...(body ? { body: finalBody } : {}),
    ...(next ? { next } : {}),
    signal: controller.signal,
  };

  try {
    const response = await fetch(url, requestInit);
    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    if (!isJson) {
      throw new Error('Invalid response format');
    }

    const responseData = await response.json();

    if (response.status === 401 || response.status === 403) {
      redirect({
        href: '/login',
        locale: '',
      });
    }

    return response.ok
      ? handleSuccessResponse(response, responseData)
      : handleErrorResponse<T>(response, responseData);
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
