import { type SignInFormData, signInSchema } from "@/lib/schema";
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
import { useLoginMutation } from "@/hooks/use-auth";
import { useAuth } from "@/provider/auth-context";

const SignIn = () => {
  const navigate = useNavigate();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useLoginMutation();
  const { login } = useAuth();

  function onSubmit(data: SignInFormData) {
    mutate(data, {
      onSuccess: (response) => {
        login(response.data);
        toast.success("Logged in successfully!");
        form.reset();
        navigate("/dashboard");
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
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to your account to continue
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
            <div className="flex justify-end text-sm -mt-5">
              <Button asChild variant="link">
                <Link to="/forgot-password">Forgot Password?</Link>
              </Button>
            </div>
            <Button className="w-full py-5" type="submit" disabled={isPending}>
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="mx-auto">
          <p className="text-sm text-muted-foreground">
            Don{"'"}t have an account?{" "}
            <Link
              to="/sign-up"
              className="text-primary hover:underline focus-visible:underline"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
