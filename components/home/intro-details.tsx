import { fetchData } from "@/app/actions/fetch-helper";
import { auth } from "@/auth";
import { UserProfile } from "@/typings";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface IntroDetailsProps {}

const IntroDetails: React.FC<IntroDetailsProps> = async (props) => {
  const session = await auth();
  // const { data: profiles, error } = useQuery({
  //   queryKey: ["profiles"],
  //   queryFn: async () =>
  //     (await fetchData("user-profiles/own")) as UserProfile[],
  // });

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
