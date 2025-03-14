import { StrapiButtonProps as StrapiButtonProps } from '@/components/ui/button';

/// This needs to match the __component value in the Strapi API
/**
 * Represents the available global component types in the application.
 *
 * @typedef {string} ComponentType
 */
export type ComponentType = 'global.button';

export type Global = StrapiButtonProps;
