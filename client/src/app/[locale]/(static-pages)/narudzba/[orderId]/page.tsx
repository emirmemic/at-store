import { OrderDetailAPIResponse } from '@/lib/types/order';
import { OrderDetailView } from './components/OrderDetailView';
import { getStrapiURL } from '@/lib/utils/utils';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

/**
 * Fetches order details from the public API endpoint
 * This endpoint does not require authentication
 */
async function getOrderDetails(
  orderId: string
): Promise<OrderDetailAPIResponse | null> {
  try {
    const baseUrl = getStrapiURL();
    const response = await fetch(`${baseUrl}/api/narudzba/${orderId}`, {
      cache: 'no-store', // Always fetch fresh data for order confirmations
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Log error on server side only
    if (typeof window === 'undefined') {
      console.error('Failed to fetch order details:', error);
    }
    return null;
  }
}

/**
 * Order confirmation page
 * Displays order details when accessed via email confirmation link
 * Public page - no authentication required
 */
export default async function OrderPage({ params }: any) {
  const { orderId, locale } = params;
  const t = await getTranslations('orderDetailsPage');

  // Fetch order data
  const orderResponse = await getOrderDetails(orderId);

  // Handle order not found
  if (!orderResponse || !orderResponse.data) {
    notFound();
  }

  const order = orderResponse.data;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {t('orderNumber')}:{' '}
            <span className="font-semibold">{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Detail View Component */}
        <OrderDetailView order={order} locale={locale} />
      </div>
    </div>
  );
}

/**
 * Generate metadata for the order page
 */
export async function generateMetadata({ params }: any) {
  const { orderId } = params;

  return {
    title: `Order ${orderId} - AT Store`,
    description: `Order confirmation and details for order ${orderId}`,
    robots: 'noindex, nofollow', // Don't index order pages
  };
}
