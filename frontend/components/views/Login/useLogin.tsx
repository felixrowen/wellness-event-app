import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [userRole, setUserRole] = useState<"HR" | "VENDOR">("VENDOR");

  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: any) => {
    // TODO: Implement actual login API call
    return payload;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: () => {
      setToaster({
        type: "error",
        message: "Your credential is wrong",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Login success",
      });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", userRole);

      if (userRole === "HR") {
        router.push("/hr/dashboard");
      } else {
        router.push("/dashboard");
      }
    },
  });

  const handleLogin = (data: any) => {
    mutateLogin(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
    userRole,
    setUserRole,
  };
};

export default useLogin;
