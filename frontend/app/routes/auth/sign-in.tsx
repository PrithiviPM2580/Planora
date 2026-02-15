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
import { Link } from "react-router";

const SignIn = () => {
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: SignInFormData) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
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
            <Button className="w-full py-5" type="submit">
              Submit
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
