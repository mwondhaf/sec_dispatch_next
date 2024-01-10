"use client";
import React, { use, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { Filter, ListFilter, ScanSearch, Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";

const severityOptions = [
  { value: "any", label: "Any" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

const LeftBarTopMenu = () => {
  const router = useRouter();
  const params = useSearchParams();
  const severity = params.get("severity");

  const [search, setSearch] = React.useState<string>("");
  // const [query] = useDebounce(search, 800);

  const handleFilterBySeverity = (value: string) => {
    if (value === "any") return router.push(`/incidents`);
    router.push(`/incidents?severity=${value}`);
  };

  // on pressing enter, it should not be called again
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFilterBySearch();
    }

    // if key is backspace and search is empty, it should not be called again
    if (e.key === "Backspace" && search === "") {
      handleFilterBySearch();
    }
  };

  const handleFilterBySearch = () => {
    if (search === "") return router.push(`/incidents`);
    router.push(`/incidents?search=${search}`);

    // setSearch("");
  };

  return (
    <div className="sticky top-0 flex justify-between border-b bg-white px-5 py-2">
      <div className="flex items-center gap-5">
        <Select
          onValueChange={(value) => handleFilterBySeverity(value)}
          value={severity ? severity : "any"}
        >
          <SelectTrigger className="w-[100px] border-0 text-xs font-bold text-primary">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {severityOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  className="text-xs"
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="relative w-[240px]">
          <Input
            className="text-xs font-bold text-primary"
            type="text"
            placeholder="Search"
            defaultValue={params.get("search") ? search : ""}
            onKeyDown={(e) => onEnter(e)}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <Button
            onClick={() => handleFilterBySearch()}
            variant={"ghost"}
            size={"icon"}
            className="absolute right-2 top-1/2 -translate-y-1/2 transform text-primary"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        {/* <Button
          asChild
          size={"icon"}
          variant={"ghost"}
          className="hover:cursor-pointer"
        >
          <Link href={"/filter"}>
            <ListFilter className="h-5 w-5 text-primary/90" />
          </Link>
        </Button> */}
      </div>
      <Button asChild size={"sm"}>
        <Link href={`/incidents/new?${params}`}>New</Link>
      </Button>
    </div>
  );
};

export default LeftBarTopMenu;
