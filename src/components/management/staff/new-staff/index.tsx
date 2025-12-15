"use client";
import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import StaffForm from "./form";

function AddNewStaff() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Staff</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Staff</SheetTitle>
          <SheetDescription>
            <p className="mb-6">Fill in the following information</p>
          </SheetDescription>
        </SheetHeader>
        <StaffForm close={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}

export default AddNewStaff;
