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
import { Organisation } from "@/typings";

export function SelectOrganisation({
  orgs,
  handleSelected,
}: {
  orgs: Organisation[];
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
          {/* <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
