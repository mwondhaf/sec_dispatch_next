"use client";
import { sendEmail } from "@/app/actions/email.actions";
import { getIncident } from "@/app/actions/incident.actions";
import { DispatchEmailDialog } from "@/components/emails/send-dialog";
import { Button } from "@/components/ui/button";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Languages, Mail, Pencil, Printer, UserPlus2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    referenceNumber: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const router = useRouter();
  const existing_params = useSearchParams();

  const handleOpenEmailDialog = () => {
    setIsOpened((prev) => !prev);
  };

  const { data: incident } = useQuery({
    queryKey: ["incident", params.referenceNumber],
    queryFn: async () => await getIncident(params.referenceNumber),
  });

  if (!params.referenceNumber || !incident) return <div>Not found</div>;

  return (
    <div className="">
      <div className="z-2 sticky top-0 flex justify-end border-b bg-white px-4 py-2">
        <div className="flex items-center gap-5">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              router.push(
                `/incidents/${params.referenceNumber}?${existing_params}`,
              )
            }
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              router.push(
                `/incidents/${params.referenceNumber}?${existing_params}`,
              )
            }
          >
            <Printer className="h-4 w-4" />
          </Button>
          <DispatchEmailDialog
            {...{ incident, isOpened, setIsOpened, handleOpenEmailDialog }}
          />
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              router.push(
                `/incidents/${params.referenceNumber}?${existing_params}`,
              )
            }
          >
            <Languages className="h-4 w-4" />
          </Button>
          <Button variant={"outline"} size={"sm"} asChild>
            <Link
              href={`/incidents/${params.referenceNumber}/view?${existing_params}`}
            >
              Reading View
            </Link>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
