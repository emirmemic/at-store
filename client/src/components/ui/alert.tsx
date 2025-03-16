import { cva, type VariantProps } from 'class-variance-authority';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { IconX } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

const alertVariants = cva(
  'relative w-full rounded-2xl border p-4 flex items-center justify-between paragraph-2',
  {
    variants: {
      variant: {
        default: '[&>button:hover]:text-blue',
        destructive:
          'border-pink-soft bg-pink-soft text-red-darkest [&>button:hover]:text-black',
        success: 'border-green text-green [&>button:hover]:text-green-dark',
        warning: 'border-orange text-orange [&>button:hover]:text-orange-dark',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    dismissible?: boolean;
    onClose?: () => void;
    visible?: boolean;
  };
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      dismissible = false,
      onClose,
      visible = true,
      variant,
      ...props
    },
    ref
  ) => {
    const t = useTranslations('navigation');
    const [internalVisible, setInternalVisible] = useState(visible);

    const handleClose = () => {
      setInternalVisible(false);
      if (onClose) {
        onClose();
      }
    };
    useEffect(() => {
      setInternalVisible(visible);
    }, [visible]);

    return (
      <AnimatePresence>
        {internalVisible && (
          <motion.div
            layout
            animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, height: 0 }}
            initial={{ opacity: 0, y: -10, scale: 0.95, height: 'auto' }}
            style={{ overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
          >
            <div
              ref={ref}
              className={cn(alertVariants({ variant }), className)}
              role="alert"
              {...props}
            >
              <div className="flex-grow">{props.children}</div>
              {dismissible && (
                <Button
                  className="ml-4 border-current p-1 text-current hover:border-current"
                  size={'sm'}
                  title={t('dismissMessage')}
                  type="button"
                  variant={'color'}
                  onClick={handleClose}
                >
                  <span className="sr-only">{t('dismissMessage')}</span>
                  <IconX size={12} />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('mb-1 paragraph-2', className)} {...props} />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={className} {...props} />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
