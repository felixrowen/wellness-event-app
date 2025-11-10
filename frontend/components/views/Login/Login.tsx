import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

import useLogin from "./useLogin";

import { cn } from "@/utils/cn";

const Login = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold-500">Login</h2>
          <p className="mb-4 mt-2 text-small">
            Don&apos;t have an account?&nbsp;
            <Link className="font-semibold-400" href="/auth/register">
              Register here
            </Link>
          </p>
          {errors.root && (
            <p className="mb-2 font-medium">{errors?.root?.message}</p>
          )}
          <form
            className={cn(
              "flex w-80 flex-col",
              Object.keys(errors).length > 0 ? "gap-2" : "gap-4"
            )}
            onSubmit={handleSubmit(handleLogin)}
          >
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  errorMessage={errors.email?.message}
                  isInvalid={errors.email !== undefined}
                  label="Email"
                  type="email"
                  variant="bordered"
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <Input
                  {...field}
                  autoComplete="off"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={handleVisiblePassword}
                    >
                      {visiblePassword ? (
                        <FaEye className="pointer-events-none text-xl text-default-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                      )}
                    </button>
                  }
                  errorMessage={errors.password?.message}
                  isInvalid={errors.password !== undefined}
                  label="Password"
                  type={visiblePassword ? "text" : "password"}
                  variant="bordered"
                />
              )}
            />

            <Button color="primary" size="lg" type="submit">
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
