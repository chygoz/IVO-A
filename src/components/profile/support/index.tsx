import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const support = [{ name: "Chat" }, { name: "Email" }, { name: "Instagram" }];

function SupportComponent() {
  return (
    <div>
      <h3 className="text-xl font-semibold">Support</h3>
      <p>Get help from us using any of our channels below</p>
      <Separator className="my-2" />
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-3 mt-12"
      >
        {support.map((detail, index) => (
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

export default SupportComponent;
