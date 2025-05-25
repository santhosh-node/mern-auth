import { useForm, SubmitHandler, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { ZodSchema } from 'zod';

export type FormNextHref = '/' | '/sign-up' | '/sign-in' | '/forgot-password' | '';

export function useAuthForm<T extends object>(
  schema: ZodSchema<T>,
  defaultValues: DefaultValues<T>,
  nextHref: FormNextHref = ''
) {
  const [formState, setFormState] = useState<{
    success: boolean;
    data: T;
    href: FormNextHref;
  }>({
    success: false,
    data: defaultValues as T,
    href: '',
  });

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<T> = async (values) => {
    try {
      console.log('Form Submitted:', values);
      setFormState({
        success: true,
        data: values,
        href: nextHref,
      });
    } catch (error) {
      console.error('Submission error:', error);
      setFormState({
        success: false,
        data: defaultValues as T,
        href: '',
      });
    }
  };

  return {
    form,
    formState,
    isSubmitting: form.formState.isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
