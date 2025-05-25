'use client';

import { AuthCard } from '@/components/modules/auth/auth-card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/custom/input-field';
import { Form } from '@/components/ui/form';
import { useSignUpForm } from '@/hooks/auth/use-sign-up-form';
import { SignUpDTO } from '@/lib/validations/auth';
import { VerifyEmailForm } from './verify-email-form';
import { ApiErrorCode } from '@/types/api-error-code';

const ERROR_MESSAGES: Record<string, string> = {
  [ApiErrorCode.SIGNUP_EMAIL_ALREADY_EXISTS]: 'An account with this email already exists.',
  [ApiErrorCode.SIGNUP_WEAK_PASSWORD]: 'Password is too weak. Please choose a stronger password.',
  [ApiErrorCode.SIGNUP_INVALID_EMAIL]: 'Please provide a valid email address.',
  [ApiErrorCode.SIGNUP_TERMS_NOT_ACCEPTED]: 'You must accept the terms and conditions.',
  [ApiErrorCode.SIGNUP_CAPTCHA_FAILED]: 'CAPTCHA verification failed. Please try again.',
  [ApiErrorCode.UNKNOWN_ERROR]: 'Something went wrong. Please try again later.',
};

function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function SignUpForm() {
  const { form, formState, isSubmitting, onSubmit } = useSignUpForm();

  if (formState.success && formState.data.email) {
    return <VerifyEmailForm email={formState.data.email} />;
  }

  const errorMessage = getErrorMessage(formState.errorCode);

  return (
    <AuthCard
      title="Create an account"
      description="Join us and manage your account easily."
      footerHref="/sign-in"
      footerHrefLabel="Sign in"
      footerHrefDescription="Already have an account?"
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md p-2">{errorMessage}</p>
          )}

          <InputField<SignUpDTO> label="Name" type="text" name="name" placeholder="John Doe" />
          <InputField<SignUpDTO> label="Email" type="email" name="email" placeholder="john@sample.com" />
          <InputField<SignUpDTO> label="Password" type="password" name="password" placeholder="••••••••" />

          <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting} aria-disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
