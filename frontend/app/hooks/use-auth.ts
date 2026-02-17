import { postData } from "@/lib/axios";
import type { SignUpFormData } from "@/lib/schema";
import type { User } from "@/types";
import { useMutation } from "@tanstack/react-query";

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) => postData("/auth/register", data),
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: (data: { token: string }) =>
      postData("/auth/verify-email", data),
  });
};

export const useLoginMutation = () => {
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: (data) => postData("/auth/login", data),
  });
};
