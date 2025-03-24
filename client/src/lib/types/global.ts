import { StrapiButtonProps } from '@/components/ui/button';

/// This needs to match the __component value in the Strapi API
/**
 * Represents the available global component types in the application.
 *
 * @typedef {string} ComponentType
 */
type ComponentType = 'global.button';

type Global = StrapiButtonProps;

export type { ComponentType, Global };
