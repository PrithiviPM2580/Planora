import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SpinnerOnly } from "@/components/ui/spinner";
import { useVerifyEmailMutation } from "@/hooks/use-auth";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useVerifyEmailMutation();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      mutate(
        { token },
        {
          onSuccess: () => {
            setIsSuccess(true);
          },
          onError: (error: any) => {
            const errorMessage =
              error.response?.data?.message || "An error occured";
            setIsSuccess(false);
            toast.error(errorMessage);
          },
        },
      );
    }
  }, [searchParams]);
  return (
    <div className="full-screen flex-center flex-col p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Verifying your email address...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex-center flex-col py-4 gap-1">
            {isPending ? (
              <>
                <SpinnerOnly />
                <div className="mt-6 text-center">
                  <h3 className="text-lg font-semibold">Verifying email...</h3>
                  <p className="text-sm text-gray-500">
                    Please wait while we verify your email
                  </p>
                </div>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircleIcon className="w-10 h-10 text-green-500" />
                <h3 className="text-lg font-semibold mt-2">Email Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Your email has been successfully verified.
                </p>
                <Link to="/sign-in" className="mt-4 text-blue-500">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            ) : (
              <>
                <XCircleIcon className="w-10 h-10 text-red-500" />
                <h3 className="text-lg font-semibold mt-2">
                  Email Verification Failed
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your email verification failed. Please try again.
                </p>

                <Link to="/sign-in" className="text-sm text-blue-500 mt-4">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
