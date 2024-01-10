import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { countries } from "@/lib/countries";
import { PersonInvolved } from "@/typings";
import { Trash } from "lucide-react";

interface PeopleInvolvedAccordProps {
  peopleInvolved: PersonInvolved[];
  handleDeletePerson: (id: string) => void;
}

export const PeopleInvolvedAccord: React.FC<PeopleInvolvedAccordProps> = ({
  peopleInvolved,
  handleDeletePerson,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {peopleInvolved?.map((person) => {
        const nationality = countries.find(
          (country) => country.code === person.nationality,
        );

        return (
          <AccordionItem value={person.id} key={person.id}>
            <AccordionTrigger className="text-xs capitalize">
              {person.name}
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              <div className="flex items-center justify-between">
                <div className="">
                  <p className="">
                    <span className="font-semibold">Nationality:</span>{" "}
                    {nationality?.name}
                  </p>
                  <p className="">
                    <span className="font-semibold">ID No.:</span>{" "}
                    {person.identity_number}
                  </p>

                  <p className="">
                    <span className="font-semibold">Remarks:</span>{" "}
                    {person.remarks}
                  </p>
                </div>
                <div className="">
                  <Trash
                    className="h-4 w-4 hover:cursor-pointer"
                    onClick={() => handleDeletePerson(person.id)}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
