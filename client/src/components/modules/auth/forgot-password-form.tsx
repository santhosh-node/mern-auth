'use client';

import { AuthCard } from '@/components/modules/auth/auth-card';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/ui/custom/input-field';
import { Form } from '@/components/ui/form';
import { useForgotPasswordForm } from '@/hooks/auth/use-forgot-password-form';
import { ForgotPasswordDTO } from '@/lib/validations/auth';
import { ResetPasswordForm } from './reset-password-form';
import { ApiErrorCode } from '@/types/api-error-code';

const ERROR_MESSAGES: Record<string, string> = {
  [ApiErrorCode.FORGOT_PASSWORD_EMAIL_NOT_FOUND]: 'No account found with this email.',
  [ApiErrorCode.FORGOT_PASSWORD_TOO_MANY_REQUESTS]: 'You’ve requested too many times. Please wait before trying again.',
  [ApiErrorCode.FORGOT_PASSWORD_SERVICE_UNAVAILABLE]: 'Service unavailable. Please try again later.',
  [ApiErrorCode.UNKNOWN_ERROR]: 'Something went wrong. Please try again.',
};

function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function ForgotPasswordForm() {
  const { form, isSubmitting, formState, onSubmit } = useForgotPasswordForm();

  if (formState.success && formState.data.email) {
    return <ResetPasswordForm email={formState.data.email} />;
  }

  const errorMessage = getErrorMessage(formState.errorCode);

  return (
    <AuthCard
      title="Forgot Password"
      description="Enter your email to receive password reset instructions."
      footerHref="/sign-in"
      footerHrefLabel="Sign in"
      footerHrefDescription="Remember your password? Sign in."
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {errorMessage && (
            <p className="text-sm text-red-500 bg-red-500/10 border border-red-500 rounded-md p-2">{errorMessage}</p>
          )}

          <InputField<ForgotPasswordDTO> label="Email" type="email" name="email" placeholder="john@sample.com" />

          <Button type="submit" className="w-full" disabled={isSubmitting} aria-busy={isSubmitting} aria-disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
}
