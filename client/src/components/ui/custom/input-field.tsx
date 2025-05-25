'use client';

import Link from 'next/link';
import { useFormContext, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface InputFieldProps<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: FieldPath<T>;
  label?: string;
  linkHref?: string;
  linkText?: string;
  icon?: React.ReactNode;
}

export function InputField<T extends FieldValues>({
  name,
  label = 'Field',
  linkHref,
  linkText,
  icon,
  ...inputProps
}: InputFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <div className="flex items-center justify-between gap-2 w-full">
            <FormLabel>{label}</FormLabel>
            {linkHref && linkText && (
              <Link href={linkHref} className="text-xs underline-offset-4 hover:underline shrink-0">
                {linkText}
              </Link>
            )}
          </div>
          <FormControl>
            <Input icon={icon} {...field} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
