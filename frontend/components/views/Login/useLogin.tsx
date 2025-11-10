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

  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: any) => {
    console.log("login payload", payload);
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
      router.push("/dashboard");
    },
  });

  const handleLogin = (data: any) => {
    console.log("login data", data);
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
  };
};

export default useLogin;
