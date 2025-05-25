'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/modules/auth/auth-card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/custom/input-field';
import { Form } from '@/components/ui/form';
import { useSignInForm } from '@/hooks/auth/use-sign-in-form';
import { SignInDTO } from '@/lib/validations/auth';
import { ApiErrorCode } from '@/types/api-error-code';

const ERROR_MESSAGES: Record<string, string> = {
  [ApiErrorCode.SIGNIN_INVALID_CREDENTIALS]: 'Incorrect email or password.',
  [ApiErrorCode.SIGNIN_ACCOUNT_LOCKED]: 'Your account has been locked. Please contact support.',
  [ApiErrorCode.SIGNIN_ACCOUNT_NOT_VERIFIED]: 'Your email is not verified. Please verify your email.',
  [ApiErrorCode.SIGNIN_TOO_MANY_ATTEMPTS]: 'Too many attempts. Please wait before trying again.',
  [ApiErrorCode.UNKNOWN_ERROR]: 'Something went wrong. Please try again.',
};

function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function SignInForm() {
  const { form, isSubmitting, onSubmit, formState } = useSignInForm();
  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      router.push('/');
    }
  }, [formState.success, router]);

  const errorMessage = getErrorMessage(formState.errorCode);

  return (
    <AuthCard
      title="Sign in to your account"
      description="Welcome back! Please sign in to continue."
      footerHref="/sign-up"
      footerHrefLabel="Sign up"
      footerHrefDescription="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md p-2">{errorMessage}</p>
          )}

          <InputField<SignInDTO> label="Email" type="email" name="email" placeholder="john@sample.com" />
          <InputField<SignInDTO>
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
            linkHref="/forgot-password"
            linkText="Forgot Password?"
          />

          <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting} aria-disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
