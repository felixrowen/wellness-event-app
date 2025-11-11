import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { ToasterContext } from "@/contexts/ToasterContext";
import { ILogin } from "@/types/Auth";

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
  const [isPendingLogin, setIsPendingLogin] = useState(false);

  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: ILogin) => {
    setIsPendingLogin(true);

    try {
      const result = await signIn("credentials", {
        identifier: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setToaster({
          type: "error",
          message: "Your credential is wrong",
        });
        setIsPendingLogin(false);

        return;
      }

      if (result?.ok) {
        setToaster({
          type: "success",
          message: "Login success",
        });

        router.push("/");
      }
    } catch {
      setToaster({
        type: "error",
        message: "An error occurred during login",
      });
      setIsPendingLogin(false);
    }
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
