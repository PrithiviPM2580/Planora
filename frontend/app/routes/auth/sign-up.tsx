import React from "react";
import {
  type SignInFormData,
  signInSchema,
  type SignUpFormData,
  signUpSchema,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useSignupMutation } from "@/hooks/use-auth";

const SignUp = () => {
  const navigate = useNavigate();
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useSignupMutation();

  function onSubmit(data: SignUpFormData) {
    mutate(data, {
      onSuccess: () => {
        toast.success("Account created successfully! Please sign in.");
        form.reset();
        navigate("/sign-in");
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
    <div className="full-screen flex-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-2xl">
        <CardHeader className="text-center mb-4">
          <CardTitle className="text-2xl font-bold">
            Create an account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your information to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-fullName">
                      Full Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-fullName"
                      aria-invalid={fieldState.invalid}
                      placeholder="John Doe"
                      autoComplete="off"
                      type="text"
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
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="email@example.com"
                      autoComplete="off"
                      className="py-5"
                      type="email"
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
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-password">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="off"
                      className="py-5"
                      type="password"
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
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-confirmPassword">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-confirmPassword"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      autoComplete="off"
                      type="password"
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
            </FieldGroup>
            <Button className="w-full py-5" type="submit" disabled={isPending}>
              {isPending ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mx-auto">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-primary hover:underline focus-visible:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
