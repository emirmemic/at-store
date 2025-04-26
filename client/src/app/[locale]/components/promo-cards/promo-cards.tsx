import PromoCard from './promo-card';
import { PromoCardItem } from './types';

interface PromoCardsProps {
  promoCards: Readonly<PromoCardItem[]>;
  className?: string;
}
export default function PromoCards({ promoCards, className }: PromoCardsProps) {
  return (
    <section className={`grid gap-8 md:grid-cols-2 ${className}`}>
      {promoCards.map((promoCard) => (
        <PromoCard {...promoCard} key={promoCard.id} />
      ))}
    </section>
  );
}
