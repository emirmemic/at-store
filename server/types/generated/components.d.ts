import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalActionLink extends Struct.ComponentSchema {
  collectionName: 'components_global_action_links';
  info: {
    description: '';
    displayName: 'actionLink';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    linkText: Schema.Attribute.String;
    linkUrl: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

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

export interface GlobalColor extends Struct.ComponentSchema {
  collectionName: 'components_global_colors';
  info: {
    displayName: 'color';
  };
  attributes: {
    hex: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_global_info_blocks';
  info: {
    description: '';
    displayName: 'infoBlock';
    icon: 'information';
  };
  attributes: {
    actionLink: Schema.Attribute.Component<'global.action-link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    isFavorites: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GlobalPromoSliderItem extends Struct.ComponentSchema {
  collectionName: 'components_global_promo_slider_items';
  info: {
    displayName: 'promoSliderItem';
    icon: 'slideshow';
  };
  attributes: {
    actionLink: Schema.Attribute.Component<'global.action-link', false> &
      Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

export interface GlobalPromotionalFlipCard extends Struct.ComponentSchema {
  collectionName: 'components_global_promotional_flip_cards';
  info: {
    description: '';
    displayName: 'promotionalFlipCard';
    icon: 'rotate';
  };
  attributes: {
    actionLink: Schema.Attribute.Component<'global.action-link', false>;
    backDescription: Schema.Attribute.Text;
    backTagline: Schema.Attribute.String;
    backTitle: Schema.Attribute.String & Schema.Attribute.Required;
    priceLabel: Schema.Attribute.String;
    productImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_sections';
  info: {
    description: '';
    displayName: ' HeroSliderItem';
  };
  attributes: {
    actionLink: Schema.Attribute.Component<'global.action-link', false>;
    media: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    placeholderImage: Schema.Attribute.Media<'images'>;
  };
}

export interface HomepageHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_homepage_hero_sliders';
  info: {
    description: '';
    displayName: 'HeroSlider';
  };
  attributes: {
    autoplayDelay: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<10000>;
    enableAutoplay: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sliderItems: Schema.Attribute.Component<'homepage.hero-section', true>;
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

export interface ProductMemory extends Struct.ComponentSchema {
  collectionName: 'components_product_memories';
  info: {
    displayName: 'memory';
  };
  attributes: {
    unit: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.action-link': GlobalActionLink;
      'global.button': GlobalButton;
      'global.color': GlobalColor;
      'global.info-block': GlobalInfoBlock;
      'global.promo-slider-item': GlobalPromoSliderItem;
      'global.promotional-flip-card': GlobalPromotionalFlipCard;
      'homepage.hero-section': HomepageHeroSection;
      'homepage.hero-slider': HomepageHeroSlider;
      'homepage.promo-card': HomepagePromoCard;
      'product.memory': ProductMemory;
    }
  }
}
