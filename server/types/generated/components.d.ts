import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_about_us_team_members';
  info: {
    description: '';
    displayName: 'TeamMember';
    icon: 'user';
  };
  attributes: {
    firstName: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    position: Schema.Attribute.String;
    surname: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface GlobalProductStoreItem extends Struct.ComponentSchema {
  collectionName: 'components_global_product_store_items';
  info: {
    displayName: 'Product Store Item';
  };
  attributes: {
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    store: Schema.Attribute.Relation<'oneToOne', 'api::store.store'>;
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

export interface GlobalRam extends Struct.ComponentSchema {
  collectionName: 'components_global_rams';
  info: {
    displayName: 'Ram';
  };
  attributes: {
    unit: Schema.Attribute.String;
    value: Schema.Attribute.Integer;
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
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
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
      'about-us.team-member': AboutUsTeamMember;
      'global.action-link': GlobalActionLink;
      'global.button': GlobalButton;
      'global.info-block': GlobalInfoBlock;
      'global.product-store-item': GlobalProductStoreItem;
      'global.promo-slider-item': GlobalPromoSliderItem;
      'global.promotional-flip-card': GlobalPromotionalFlipCard;
      'global.ram': GlobalRam;
      'homepage.hero-section': HomepageHeroSection;
      'homepage.hero-slider': HomepageHeroSlider;
      'homepage.promo-card': HomepagePromoCard;
    }
  }
}
