"use client";
import { Button } from "@/components/ui/button";
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
  const router = useRouter();
  const existing_params = useSearchParams();
  if (!params.referenceNumber) return <div>Not found</div>;

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
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={() =>
              router.push(
                `/incidents/${params.referenceNumber}?${existing_params}`,
              )
            }
          >
            <Mail className="h-4 w-4" />
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
