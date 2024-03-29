"use client";

import { sendEmail } from "@/app/actions/email.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Incident } from "@/typings";
import { Mail } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { toast } from "../ui/use-toast";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/app/actions/fetch-helper";

export function DispatchEmailDialog({
  isOpened,
  handleOpenEmailDialog,
  setIsOpened,
}: {
  isOpened: boolean;
  handleOpenEmailDialog: () => void;
  setIsOpened: (value: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const params = useParams();

  const { data: incidentData } = useQuery<Incident>({
    queryKey: ["incident", params.referenceNumber],
    queryFn: async () => await fetchData(`incidents/${params.referenceNumber}`),
  });

  const formSchema = z.object({
    emails: z.string().min(5, {
      message: "email is too short",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const validatedEmails: string[] = [];

    const emails = values.emails.split(",").map((email) => email.trim());

    emails.filter((email) => {
      if (email.includes("@")) {
        validatedEmails.push(email);
      }
    });

    startTransition(async () => {
      const data = await sendEmail(validatedEmails, incidentData);

      setIsOpened(false);

      if (data?.error) {
        toast({
          title: "Error",
          description: "Email has not been sent. Please try again.",
        });
        return;
      }

      toast({
        title: "Email sent",
        description: "Email has been sent successfully.",
      });
      form.reset();
    });
  }

  return (
    <Dialog open={isOpened} onOpenChange={setIsOpened}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"} onClick={handleOpenEmailDialog}>
          <Mail className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Send dispatch entry</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-3">
                    <FormLabel>To:</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>

                  <FormDescription>
                    You can enter many emails separated by commas.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-3">
              <Button type="submit">
                {isPending ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
