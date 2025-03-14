import { Button } from '@/components/ui/button';

import { Global } from './types/global';

export function globalRenderer(component: Global) {
  switch (component.__component) {
    case 'global.button':
      return (
        <Button
          key={component.id}
          size={component.size}
          transparentVariant={component.transparentVariant}
          typography={component.typography}
          variant={component.variant}
        >
          {component.label}
        </Button>
      );
    default:
      return null;
  }
}
