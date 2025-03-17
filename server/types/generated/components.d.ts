import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalButton extends Struct.ComponentSchema {
  collectionName: 'components_global_buttons';
  info: {
    description: '';
    displayName: 'Button';
  };
  attributes: {
    transparentVariant: Schema.Attribute.Enumeration<['blue_blue']>;
  };
}

export interface HomepagePromoCard extends Struct.ComponentSchema {
  collectionName: 'components_homepage_promo_cards';
  info: {
    description: '';
    displayName: 'PromoCard';
  };
  attributes: {
    caption: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    learnMoreVariant: Schema.Attribute.Enumeration<
      ['blue_blue', 'blue_white']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'blue_blue'>;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    textColor: Schema.Attribute.Enumeration<['white', 'black']> &
      Schema.Attribute.DefaultTo<'white'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.button': GlobalButton;
      'homepage.promo-card': HomepagePromoCard;
    }
  }
}
