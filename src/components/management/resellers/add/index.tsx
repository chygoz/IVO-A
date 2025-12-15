"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddResellerForm from "./form";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AddReseller() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Reseller</Button>
      </SheetTrigger>
      <SheetContent className="px-0">
        <ScrollArea className="h-[90vh] px-4">
          <SheetHeader>
            <SheetTitle>Add New Reseller</SheetTitle>
          </SheetHeader>
          <div className="px-2">
            <AddResellerForm open={open} close={() => setOpen(false)} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
