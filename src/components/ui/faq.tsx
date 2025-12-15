import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    name: "Who can use Spotfinda?",
    content: (
      <p>
        Spotfinda is designed for recreational players looking for a place to
        play, pitch/facility owners wanting to manage bookings, and event
        organizers needing to coordinate matches, leagues, or tournaments.
      </p>
    ),
  },
  {
    name: "Is Spotfinda available as a mobile app?",
    content: (
      <p>
        Spotfinda, is currently not available as a mobile app. You don’t have to
        worry, our mobile is currently being developed and all our users will be
        notified once it’s available.
      </p>
    ),
  },
  {
    name: "How do I sign up for Spotfinda?",
    content: (
      <p>
        Signing up for Spotfinda is simple. You can create an account by
        providing your basic information, verifying your details, and logging
        in. Depending on your needs, you can sign up as a recreational player,
        pitch owner, or event organizer.
      </p>
    ),
  },
  {
    name: "Can I cancel or reschedule a booking?",
    content: (
      <p>
        Yes, you can cancel or reschedule your booking through the Spotfinda
        platform. Please check our cancellation policy for more details on
        refunds and rescheduling options.
      </p>
    ),
  },
  {
    name: "Is it safe to make payments on Spotfinda?",
    content: (
      <p>
        Absolutely. Spotfinda uses secure payment gateways to ensure that all
        transactions are safe and protected. Your financial information is
        handled with the utmost care.
      </p>
    ),
  },
  {
    name: "What customer support does Spotfinda offer to facility managers?",
    content: (
      <p>
        You have access to a 24/7 email support and phone support during
        business hours. We also offer onboarding assistance.
      </p>
    ),
  },
  {
    name: "Have more questions?",
    content: (
      <p>
        Contact our Partner Support team at partners@spotfinda.com or call us at
        +2349066467943
      </p>
    ),
  },
];

function FaqsComponent() {
  return (
    <div className="bg-[#FDF3EE] min-h-[773px] py-16">
      <div className="max-w-[1000px] mx-auto w-full px-4">
        <h3 className="text-[#0E1D39] font-bold text-2xl sm:text-4xl text-center">
          Frequently Asked Questions
        </h3>
        <Accordion type="single" collapsible className="w-full mt-20">
          {faqs.map((faq, index) => (
            <AccordionItem key={index.toString()} value={`item-${index + 1}`}>
              <AccordionTrigger className="font-bold text-left text-lg sm:text-2xl">
                {faq.name}
              </AccordionTrigger>
              <AccordionContent className="sm:text-xl max-w-[900px]">
                {faq.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FaqsComponent;
