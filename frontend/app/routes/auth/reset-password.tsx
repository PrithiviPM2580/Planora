import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { type ResetPasswordFormData, resetPasswordSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams, Link } from "react-router";
import { ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResetPasswordMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useResetPasswordMutation();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  function onSubmit(data: ResetPasswordFormData) {
    if (!token) {
      toast.error("Invalid or missing token. Please try again.");
      return;
    }
    mutate(
      {
        ...data,
        token: token as string,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message ||
            "An error occurred. Please try again.";
          toast.error(message);
        },
      },
    );
  }
  return (
    <div>
      <div className="full-screen flex-center">
        <Card className="max-w-md w-full shadow-2xl">
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <div className="px-6">
            <Link to="/auth/sign-in" className="flex items-center gap-1">
              <ArrowLeftIcon className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
          <CardContent>
            {isSuccess ? (
              <div className="flex-center flex-col">
                <CheckCircleIcon className="w-10 h-10 text-green-500" />
                <h1 className="text-xl font-semibold mt-4">
                  Password reset successfully
                </h1>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  Your password has been reset. You can now sign in with your
                  new password.
                </p>
              </div>
            ) : (
              <>
                <form
                  id="form-rhf-demo"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FieldGroup>
                    <Controller
                      name="newPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-password">
                            New Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-password"
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter new password"
                            autoComplete="off"
                            className="py-5"
                          />
                          {fieldState.invalid && (
                            <FieldError
                              errors={[fieldState.error]}
                              className="text-xs"
                            />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="confirmNewPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-confirm-password">
                            Confirm New Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-rhf-demo-confirm-password"
                            aria-invalid={fieldState.invalid}
                            placeholder="Confirm new password"
                            autoComplete="off"
                            className="py-5"
                          />
                          {fieldState.invalid && (
                            <FieldError
                              errors={[fieldState.error]}
                              className="text-xs"
                            />
                          )}
                        </Field>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full py-5"
                      disabled={isPending}
                    >
                      {isPending ? "Resetting password..." : "Reset Password"}
                    </Button>
                  </FieldGroup>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;
