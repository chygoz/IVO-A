"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Enhanced preset colors with rich, deep shades
const PRESET_COLORS = [
  { name: "Pure White", hex: "#FFFFFF" },
  { name: "Deep Black", hex: "#000000" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Royal Blue", hex: "#4169E1" },
  { name: "Deep Purple", hex: "#483D8B" },
  { name: "Ruby Red", hex: "#9B111E" },
  { name: "Emerald", hex: "#50C878" },
  { name: "Sapphire", hex: "#082567" },
  { name: "Deep Gold", hex: "#B8860B" },
  { name: "Rich Brown", hex: "#8B4513" },
  { name: "Deep Teal", hex: "#004D4D" },
  { name: "Burgundy", hex: "#800020" },
  { name: "Dark Bronze", hex: "#CD7F32" },
  { name: "Deep Violet", hex: "#9400D3" },
  { name: "Midnight Blue", hex: "#191970" },
] as const;

type ColorWheelPickerProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  color: { hex: string; name: string };
  setColor: (color: { hex: string; name: string }) => void;
};

const DOCUMENT_COLORS_KEY = "document_colors";

function ColorWheelPicker({
  open,
  setOpen,
  color,
  setColor,
}: ColorWheelPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [documentColors, setDocumentColors] = useState<
    { hex: string; name: string }[]
  >([]);
  const solidColorRef = useRef<HTMLDivElement>(null);
  const hueSliderRef = useRef<HTMLInputElement>(null);
  const [selectedPosition, setSelectedPosition] = useState({ x: 0.5, y: 0.5 });
  const [hueValue, setHueValue] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [tempColor, setTempColor] = useState({
    hex: color.hex,
    name: color.name,
  });

  useEffect(() => {
    const savedColors = localStorage.getItem(DOCUMENT_COLORS_KEY);
    if (savedColors) {
      setDocumentColors(JSON.parse(savedColors));
    }
  }, []);

  const saveDocumentColor = (newColor: { hex: string; name: string }) => {
    const updatedColors = [
      newColor,
      ...documentColors.filter((c) => c.hex !== newColor.hex).slice(0, 3),
    ];
    setDocumentColors(updatedColors);
    localStorage.setItem(DOCUMENT_COLORS_KEY, JSON.stringify(updatedColors));
  };

  const handleColorSelect = (newColor: { hex: string; name: string }) => {
    setColor(newColor);
    saveDocumentColor(newColor);
    setTempColor(newColor);
  };

  const handleSolidColorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!solidColorRef.current) return;

    const rect = solidColorRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    setSelectedPosition({ x, y });

    const hsl = {
      h: hueValue,
      s: x * 100,
      l: 100 - y * 100,
    };

    const hex = hslToHex(hsl.h, hsl.s, hsl.l);
    handleColorSelect({ hex, name: hex });
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value);
    setHueValue(hue);

    const hsl = {
      h: hue,
      s: selectedPosition.x * 100,
      l: 100 - selectedPosition.y * 100,
    };

    const hex = hslToHex(hsl.h, hsl.s, hsl.l);
    setTempColor({ hex, name: hex });
  };

  const handleHueChangeComplete = () => {
    handleColorSelect(tempColor);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // If input is a valid hex color, update the color
    if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
      handleColorSelect({ hex: e.target.value, name: e.target.value });
    }
    // If input is a color name, try to find it in presets
    else {
      const matchedColor = PRESET_COLORS.find(
        (c) => c.name.toLowerCase() === e.target.value.toLowerCase()
      );
      if (matchedColor) {
        handleColorSelect({ hex: matchedColor.hex, name: matchedColor.name });
      }
    }
  };

  const toggleColorPanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    const rHex = Math.round((r + m) * 255)
      .toString(16)
      .padStart(2, "0");
    const gHex = Math.round((g + m) * 255)
      .toString(16)
      .padStart(2, "0");
    const bHex = Math.round((b + m) * 255)
      .toString(16)
      .padStart(2, "0");

    return `#${rHex}${gHex}${bHex}`.toUpperCase();
  };

  // Get contrast color for text
  const getContrastColor = (hexColor: string): string => {
    hexColor = hexColor.replace("#", "");

    if (hexColor.length === 3) {
      hexColor = hexColor
        .split("")
        .map((char) => char + char)
        .join("");
    }

    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "black" : "white";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          style={{
            backgroundColor: color.hex,
            color: color.hex ? getContrastColor(color.hex) : "#000",
          }}
        >
          {color.name || "Pick a Color"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Color</DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            className="pl-10"
            placeholder='Try "#00c4cc"'
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Document colors */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
                  fill="currentColor"
                />
                <path d="M13 7H11V13H17V11H13V7Z" fill="currentColor" />
              </svg>
            </div>
            <span className="font-medium">Recent colors</span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {/* Color wheel picker button */}
            <button
              className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 flex items-center justify-center "
              onClick={toggleColorPanel}
            >
              <span className="text-white text-2xl">+</span>
            </button>

            {/* Document colors */}
            {documentColors.map((docColor, index) => (
              <button
                key={index}
                className={`w-12 h-12 rounded-full ${
                  docColor.hex === color.hex
                    ? "ring-2 ring-purple-600 ring-offset-2"
                    : "ring-1 ring-gray-300"
                }`}
                style={{ backgroundColor: docColor.hex }}
                onClick={() => handleColorSelect(docColor)}
              />
            ))}
          </div>
        </div>

        {/* Color Picker Panel */}
        {isPanelOpen && (
          <div className="mt-6 border rounded-lg p-4">
            <h3 className="font-medium mb-4">Solid Color</h3>

            {/* Solid color picker */}
            <div
              ref={solidColorRef}
              className="w-full h-32 rounded-lg relative cursor-pointer"
              style={{
                backgroundImage: `linear-gradient(to right, #fff, hsl(${hueValue}, 100%, 50%)), linear-gradient(to bottom, rgba(0,0,0,0), #000)`,
                backgroundBlendMode: "multiply",
              }}
              onClick={handleSolidColorClick}
            >
              {/* Selection indicator */}
              <div
                className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${selectedPosition.x * 100}%`,
                  top: `${selectedPosition.y * 100}%`,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
                }}
              />
            </div>

            {/* Hue slider */}
            <input
              ref={hueSliderRef}
              type="range"
              min="0"
              max="359"
              value={hueValue}
              onChange={handleHueChange}
              onMouseUp={handleHueChangeComplete}
              onTouchEnd={handleHueChangeComplete}
              className="w-full h-6 mt-4"
              style={{
                background:
                  "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
                appearance: "none",
                cursor: "pointer",
                borderRadius: "9999px",
              }}
            />

            {/* Color info */}
            <div className="mt-4 flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: tempColor.hex }}
              />
              <div className="bg-gray-100 px-2 py-1 rounded">
                {tempColor.hex}
              </div>
            </div>
          </div>
        )}
        {/* Default Colors */}
        <h3 className="font-medium mt-6 mb-2">Default Colors</h3>
        <div className="grid grid-cols-8 gap-2">
          {PRESET_COLORS.map((presetColor) => (
            <button
              key={presetColor.hex}
              className={`w-8 h-8 rounded-full ${
                presetColor.hex === color.hex
                  ? "ring-2 ring-purple-600 ring-offset-1"
                  : "ring-1 ring-gray-300"
              }`}
              style={{ backgroundColor: presetColor.hex }}
              onClick={() => handleColorSelect(presetColor)}
              title={presetColor.name}
            />
          ))}
        </div>
        <DialogClose className="bg-primary text-white">Save</DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ColorWheelPicker;
