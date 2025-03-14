import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalButton extends Struct.ComponentSchema {
  collectionName: 'components_global_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    label: Schema.Attribute.String;
    size: Schema.Attribute.Enumeration<
      ['sm', 'md', 'lg', 'xlg', 'textWithIcon', 'color']
    >;
    transparentVariant: Schema.Attribute.Enumeration<
      ['blue_blue', 'blue_black', 'white', 'white_blueBg', 'black']
    >;
    typography: Schema.Attribute.Enumeration<['button1', 'button2']>;
    variant: Schema.Attribute.Enumeration<
      ['filled', 'transparent', 'addToFavorites', 'productVariant', 'color']
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.button': GlobalButton;
    }
  }
}
