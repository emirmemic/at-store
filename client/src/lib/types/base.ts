import {
  TranslationValues,
  Formats,
  RichTranslationValues,
  MarkupTranslationValues,
} from 'next-intl';
import { ReactNode } from 'react';

interface ImageProps {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
}

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: number;
  className?: string;
  pathClassName?: string;
  filled?: boolean;
}

type Icon = React.ComponentType<IconProps>;
type LocalizationKey = {
  <TargetKey>(
    key: TargetKey,
    values?: TranslationValues,
    formats?: Formats
  ): string;
  rich<TargetKey>(
    key: TargetKey,
    values?: RichTranslationValues,
    formats?: Formats
  ): ReactNode;
  markup<TargetKey>(
    key: TargetKey,
    values?: MarkupTranslationValues,
    formats?: Formats
  ): string;
  raw<TargetKey>(key: TargetKey): unknown;
  has<TargetKey>(key: TargetKey): boolean;
};
export type { Icon, LocalizationKey, IconProps, ImageProps };
