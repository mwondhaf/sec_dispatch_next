"use client";
import { fetchData } from "@/app/actions/fetch-helper";
import { userSession } from "@/app/actions/settings/users-actions";
import { auth } from "@/auth";
import { UserProfile } from "@/typings";
import { useQuery } from "@tanstack/react-query";
import { Session } from "next-auth/types";
import React, { useEffect } from "react";

interface IntroDetailsProps {}

const IntroDetails: React.FC<IntroDetailsProps> = (props) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await userSession();
      setSession(session);
    };
    startTransition(() => {
      fetchSession();
    });
  }, []);

  if (!session?.user) return null;

  return (
    <div className="py-9">
      <h2 className="text-2xl font-bold">Welcome, {session.user.name}</h2>
      <h2 className="text-sm text-gray-500">
        {session?.user?.UserProfile[0]?.entity?.name}
      </h2>
    </div>
  );
};

export default IntroDetails;
