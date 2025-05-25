import { UseFormReturn } from 'react-hook-form';

export type FormNextHref = '/sign-up' | '/sign-in' | '/forgot-password' | '/' | '';

export type AuthFormProps<T> = {
  form: UseFormReturn<T>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
};
