'use client';

import { AuthCard } from '@/components/modules/auth/auth-card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/custom/input-field';
import { Form } from '@/components/ui/form';
import { useResetPasswordForm } from '@/hooks/auth/use-reset-password-form';
import { ResetPasswordDTO } from '@/lib/validations/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ApiErrorCode } from '@/types/api-error-code';

const ERROR_MESSAGES: Record<string, string> = {
  [ApiErrorCode.RESET_PASSWORD_TOKEN_INVALID]: 'The verification code is invalid or expired.',
  [ApiErrorCode.RESET_PASSWORD_TOKEN_EXPIRED]: 'The verification code is invalid or expired.',
  [ApiErrorCode.RESET_PASSWORD_WEAK_PASSWORD]: 'Your new password is too weak.',
  [ApiErrorCode.RESET_PASSWORD_USER_NOT_FOUND]: 'No account found for the provided email.',
  [ApiErrorCode.UNKNOWN_ERROR]: 'Something went wrong. Please try again.',
};

function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function ResetPasswordForm({ email = '' }: { email?: string }) {
  const { form, isSubmitting, onSubmit, formState } = useResetPasswordForm({ email });
  const router = useRouter();

  useEffect(() => {
    if (formState.success) {
      router.push('/sign-in');
    }
  }, [formState.success, router]);

  const errorMessage = getErrorMessage(formState.errorCode);

  return (
    <AuthCard
      title="Reset Password"
      description="Enter the verification code and your new password."
      footerHref="/sign-in"
      footerHrefLabel="Sign in"
      footerHrefDescription="Remembered your password? Sign in."
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md p-2">{errorMessage}</p>
          )}

          <InputField<ResetPasswordDTO> label="Verification Code" type="text" name="code" placeholder="123456" />
          <InputField<ResetPasswordDTO> label="New Password" type="password" name="newPassword" placeholder="******" />

          <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting} aria-disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
