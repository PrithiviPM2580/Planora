import { postData } from "@/lib/axios";
import type { SignUpFormData } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: (data: SignUpFormData) => postData("/auth/register", data),
  });
};
