import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForgotPasswordMutation } from "@/hooks/use-auth";
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: ForgotPasswordFormData) {
    mutate(data, {
      onSuccess: () => {
        setIsSuccess(true);
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "An error occurred. Please try again.";
        toast.error(message);
      },
    });
  }
  return (
    <div className="full-screen flex-center">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email to reset your password.
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
                Password reset email sent
              </h1>
              <p className="text-sm text-center text-muted-foreground mt-2">
                Please check your email for instructions to reset your password.
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
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="form-rhf-demo-email">
                          Email Address
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-email"
                          aria-invalid={fieldState.invalid}
                          placeholder="email@example.com"
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
                    {isPending ? "Sending reset email..." : "Reset Password"}
                  </Button>
                </FieldGroup>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
