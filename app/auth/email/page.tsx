"use client";
import { setUserCookies, userEmailLogin } from "@/app/actions/auth.actions";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

import emailSvg from "@/public/assets/images/emailSentSvg.svg";
import Image from "next/image";
import useStore from "@/lib/zustand/useStore";
import { useAccountStore } from "@/lib/zustand/accountStore";

const VerificationPage = ({
  searchParams,
}: {
  params: { token: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const token = searchParams;

  if (token && typeof token.token === "string") {
    (async () => {
      if (token && typeof token.token === "string")
        await userEmailLogin(token.token);
    })();
  }

  if (!token.token) {
    return (
      <div className="h-screen p-36">
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <Image src={emailSvg} alt="email sent" width={180} height={180} />
          <div className="flex flex-col items-center justify-center space-y-10">
            <div className="space-y-1 text-center">
              <h3 className="text-4xl font-bold">Thank you</h3>
              <p className="text-sm text-gray-400">
                If the email you entered is associated with an account, a login
                link has been sent to your email, please click the link to sign
                in.
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-center text-sm">Entered wrong email?</p>
              <Button
                asChild
                className="w-full"
                size={"lg"}
                variant={"secondary"}
              >
                <Link href={"/login"}>Change my email</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen items-center justify-center ">
        <div className="space-y-10">
          <h3 className="text-4xl font-bold">
            Verifying login link. Please wait...
          </h3>
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-center text-sm">Taking too long?</p>
            <Button asChild size={"lg"} variant={"secondary"}>
              <Link href={"/login"}>Try again</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default VerificationPage;
