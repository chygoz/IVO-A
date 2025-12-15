import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const legal = [{ name: "Privacy Policy" }, { name: "Terms of Use" }];

function LegalComponent() {
  return (
    <div>
      <h3 className="text-xl font-semibold">Legal</h3>
      <p>Find our Terms of Use and Privacy Policy below.</p>
      <Separator className="my-2" />

      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3 mt-12"
      >
        {legal.map((detail, index) => (
          <AccordionItem key={index.toString()} value={`item-${index + 1}`}>
            <AccordionTrigger>{detail.name}</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default LegalComponent;
