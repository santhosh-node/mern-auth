'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> & {
  linkHref?: string;
  linkText?: string;
};

function Label({ className, linkHref, linkText, ...props }: LabelProps) {
  return (
    <div className="flex items-center w-full">
      <LabelPrimitive.Root
        data-slot="label"
        className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className)}
        {...props}
      />
      {linkHref && linkText && (
        <Link href={linkHref} className="ml-auto text-xs underline-offset-4 hover:underline">
          {linkText}
        </Link>
      )}
    </div>
  );
}

export { Label };
