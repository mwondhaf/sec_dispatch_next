import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Company } from "@/typings";

export function SelectOrganisation({
  orgs,
  handleSelected,
}: {
  orgs: Company[];
  handleSelected: (selected: any) => void;
}) {
  return (
    <Select onValueChange={(value) => handleSelected(JSON.parse(value))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          {orgs.map((org) => (
            <SelectItem
              key={org.id}
              value={JSON.stringify(org)}
              className="capitalize"
            >
              {org.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
