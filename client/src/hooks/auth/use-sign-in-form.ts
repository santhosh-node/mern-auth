import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignInDTO, SignInSchema } from '@/lib/validations/auth';
import { signInAPI } from '@/lib/api/auth';

type FormNextHref = '/sign-up' | '/sign-in' | '/forgot-password' | '/' | '';

type FormState = {
  success: boolean;
  data: SignInDTO;
  href: FormNextHref;
  errorCode?: string; // added errorCode here
};

export function useSignInForm(defaultValues?: Partial<SignInDTO>) {
  const initialValues: SignInDTO = {
    email: '',
    password: '',
    ...defaultValues,
  };

  const [formState, setFormState] = useState<FormState>({
    success: false,
    data: initialValues,
    href: '',
    errorCode: undefined,
  });

  const form = useForm<SignInDTO>({
    resolver: zodResolver(SignInSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: SignInDTO) {
    try {
      console.log('SignIn Form Submitted:', values);
      await signInAPI(values);

      setFormState({ success: true, data: values, href: '/', errorCode: undefined });
    } catch (error: any) {
      console.error('Form submission error:', error);
      const errorCode = error?.response?.data?.errorCode ?? 'UNKNOWN_ERROR';
      setFormState({ success: false, data: initialValues, href: '', errorCode });
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    formState,
    isSubmitting: form.formState.isSubmitting,
  };
}
