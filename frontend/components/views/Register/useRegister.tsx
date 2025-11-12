import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

import authServices from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { ToasterContext } from "@/contexts/ToasterContext";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  email: yup
    .string()
    .email("Email format not valid")
    .required("Please input your email"),
  password: yup
    .string()
    .min(6, "Minimal 6 Characters")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password not match")
    .required("Please input your password confirmation"),
  role: yup
    .string()
    .oneOf(["HR", "VENDOR"], "Role must be either HR or VENDOR")
    .required("Please select your role"),
  companyName: yup.string().when("role", {
    is: "HR",
    then: (schema) => schema.required("Please input your company name"),
    otherwise: (schema) => schema.notRequired(),
  }),
  vendorName: yup.string().when("role", {
    is: "VENDOR",
    then: (schema) => schema.required("Please input your vendor name"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const { setToaster } = useContext(ToasterContext);

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    watch,
  } = useForm<IRegister>({
    resolver: yupResolver(registerSchema) as any,
    defaultValues: {
      role: "VENDOR",
    },
  });

  const selectedRole = watch("role");

  const registerService = async (payload: IRegister) => {
    const response = await authServices.register(payload);

    return response.data;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";

      if (errorMessage.includes("email")) {
        setError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else {
        setToaster({
          type: "error",
          message: errorMessage,
        });
      }
    },
    onSuccess: (data) => {
      setToaster({
        type: "success",
        message: data.message || "Registration successful! Please login.",
      });
      reset();
      router.push("/auth/login");
    },
  });

  const handleRegister = (data: IRegister) => {
    mutateRegister(data);
  };

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
    selectedRole,
  };
};

export default useRegister;
