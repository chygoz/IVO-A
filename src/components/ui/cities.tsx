"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { findCities } from "@/data/locations/states";

type City = {
  label: string;
  value: string;
};
type NigerianCitiesProps = {
  state: string;
  city: City | null;
  setCity: React.Dispatch<React.SetStateAction<City | null>>;
};

export default function NigerianCities({
  city,
  setCity,
  state,
}: NigerianCitiesProps) {
  const cities = findCities(state);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {city ? <span className="capitalize">{city.label}</span> : <>Select a city</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 pb-4" side="right" align="start">
          <Command>
            <CommandInput placeholder="Search City..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {cities.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setCity(
                        cities.find((priority) => priority.value === value) ||
                          null
                      );
                      setOpen(false);
                    }}
                  >
                    {status.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
