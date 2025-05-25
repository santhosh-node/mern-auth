'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/modules/auth/auth-card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/custom/input-field';
import { Form } from '@/components/ui/form';
import { useVerifyEmailForm } from '@/hooks/auth/use-verify-email-form';
import { VerifyEmailDTO } from '@/lib/validations/auth';
import { ApiErrorCode } from '@/types/api-error-code';

const ERROR_MESSAGES: Record<string, string> = {
  [ApiErrorCode.VERIFY_EMAIL_TOKEN_INVALID]: 'The verification code is incorrect. Please try again.',
  [ApiErrorCode.VERIFY_EMAIL_TOKEN_EXPIRED]: 'The verification code has expired. Request a new one.',
  [ApiErrorCode.VERIFY_EMAIL_ALREADY_VERIFIED]: 'Your email is already verified. Please sign in.',
  [ApiErrorCode.VERIFY_EMAIL_TOO_MANY_REQUESTS]: 'Too many requests. Please wait before trying again.',
  [ApiErrorCode.UNKNOWN_ERROR]: 'Something went wrong. Please try again.',
};

function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function VerifyEmailForm({ email = '' }: { email?: string }) {
  const { form, isSubmitting, onSubmit, formState } = useVerifyEmailForm({ email });
  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      router.push('/sign-in');
    }
  }, [formState.success, router]);

  const errorMessage = getErrorMessage(formState.errorCode);

  return (
    <AuthCard
      title="Verify your email"
      description="Enter the verification code sent to your email."
      footerHref="/sign-in"
      footerHrefLabel="Sign in"
      footerHrefDescription="Already verified? Sign in here."
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md p-2">{errorMessage}</p>
          )}

          <InputField<VerifyEmailDTO> label="Verification Code" type="text" name="code" placeholder="123456" />

          <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting} aria-disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
