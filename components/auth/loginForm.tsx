"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DEFAULT_REDIRECT_URL } from "@/routes";
import { AuthError } from "next-auth";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { login } from "@/app/actions/login";
import { useSearchParams } from "next/navigation";
import { SubmitButton } from "../common/submit-button";
import { z } from "zod";
import { loginSchema } from "@/lib/schemas/auth-schema";

// const formSchema = z.object({
//   idNumber: z.string().min(2, {
//     message: "idNumber must be at least 2 characters.",
//   }),
// });

const LoginForm = () => {
  const searchParams = useSearchParams();
  let urlError =
    searchParams.get("error") === "CredentialsSignin"
      ? "Wrong credentials, please try again."
      : "";

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      idNumber: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setError("");
    setSuccess("");
    urlError = "";

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          // if (data?.success) {
          //   form.reset();
          //   setSuccess(data.success);
          // }
        })
        .catch((error) => {
          setError("Something went wrong");
        });
    });

    try {
      await signIn("credentials", {
        idNumber: values.idNumber,
        password: values.password,
        redirectTo: DEFAULT_REDIRECT_URL,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        console.error(error);
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials" };
          default:
            return { error: "Something went wrong" };
        }
      }
      throw error;
    }
  }

  return (
    <div className="w-full ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ID Number</FormLabel>
                <FormControl>
                  <Input placeholder="ID Number" {...field} />
                </FormControl>
                {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormError message={error || urlError} /> */}
          <SubmitButton
            className="w-full"
            label="Login"
            pendingLabel="Sending..."
          />
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
