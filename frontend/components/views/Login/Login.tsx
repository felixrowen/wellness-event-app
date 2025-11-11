import { Button, Card, CardBody, Input, Spinner, Divider } from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";

import useLogin from "./useLogin";

import { cn } from "@/utils/cn";
import { Logo } from "@/components/icons";

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
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <Card className="w-full max-w-md shadow-xl border border-gray-100 rounded-2xl backdrop-blur-sm bg-white/80">
        <CardBody className="p-10">
          <div className="text-center mb-6">
            <div className="flex justify-center">
              <Logo size={64} />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back 🌿
            </h1>
            <p className="mt-2 text-gray-500">
              Log in to your{" "}
              <span className="font-semibold text-primary">Wellness Event</span>{" "}
              dashboard
            </p>
          </div>

          {errors.root && (
            <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-600 border border-red-100">
              {errors?.root?.message}
            </div>
          )}

          <form
            className={cn(
              "flex flex-col",
              Object.keys(errors).length > 0 ? "gap-3" : "gap-5"
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
                  className="rounded-lg"
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                  label="Email Address"
                  placeholder="you@example.com"
                  type="text"
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
                  className="rounded-lg"
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={handleVisiblePassword}
                    >
                      {visiblePassword ? (
                        <FaEye className="pointer-events-none text-xl text-gray-400" />
                      ) : (
                        <FaEyeSlash className="pointer-events-none text-xl text-gray-400" />
                      )}
                    </button>
                  }
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                  label="Password"
                  placeholder="Enter your password"
                  type={visiblePassword ? "text" : "password"}
                  variant="bordered"
                />
              )}
            />

            <Button
              className="mt-2 w-full font-medium rounded-lg shadow-sm"
              color="primary"
              size="lg"
              type="submit"
            >
              {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
            </Button>
          </form>

          <Divider className="my-6" />

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              href="/auth/register"
            >
              Register here
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
