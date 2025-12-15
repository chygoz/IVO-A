"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  AlertTriangle,
  Edit,
  Check,
  X,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  IVariant,
  IGallery,
  ProductColor,
} from "@/app/(protected)/dashboard/products/[slug]/types";

// Define ProductSize type based on the IVariant interface
interface ProductSize {
  name: string;
  code: string;
  displayName: string;
  sortOrder: number;
}

// Define common sizes for quick selection
export const commonSizes = [
  { name: "6", code: "6", displayName: "Size 6", sortOrder: 1 },
  { name: "8", code: "8", displayName: "Size 8", sortOrder: 2 },
  { name: "10", code: "10", displayName: "Size 10", sortOrder: 3 },
  { name: "12", code: "12", displayName: "Size 12", sortOrder: 4 },
  { name: "14", code: "14", displayName: "Size 14", sortOrder: 5 },
  { name: "16", code: "16", displayName: "Size 16", sortOrder: 6 },
  { name: "18", code: "18", displayName: "Size 18", sortOrder: 7 },
  { name: "20", code: "20", displayName: "Size 20", sortOrder: 8 },
];

// Define common colors for quick selection
const commonColors = [
  { name: "Black", code: "BLK", hex: "#000000" },
  { name: "White", code: "WHT", hex: "#FFFFFF" },
  { name: "Red", code: "RED", hex: "#FF0000" },
  { name: "Blue", code: "BLU", hex: "#0000FF" },
  { name: "Green", code: "GRN", hex: "#008000" },
  { name: "Yellow", code: "YLW", hex: "#FFFF00" },
  { name: "Purple", code: "PRP", hex: "#800080" },
  { name: "Pink", code: "PNK", hex: "#FFC0CB" },
  { name: "Orange", code: "ORG", hex: "#FFA500" },
  { name: "Grey", code: "GRY", hex: "#808080" },
];

interface VariantsEditorProps {
  variants: IVariant[];
  onChange: (variants: IVariant[]) => void;
  basePrice: {
    currency: "USD" | "NGN";
    value: string;
  };
}

interface VariantFormValues {
  _id?: string;
  sku: string;
  quantity: number;
  size: ProductSize;
  color: ProductColor;
  price: {
    currency: "USD" | "NGN";
    value: string;
  };
  active: boolean;
  gallery?: IGallery[];
  pendingQuantity?: number;
  status?: "in-stock" | "out-of-stock" | "limited-stock";
}

export default function VariantsEditor({
  variants,
  onChange,
  basePrice,
}: VariantsEditorProps) {
  const [editingVariant, setEditingVariant] =
    useState<VariantFormValues | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Get unique colors and sizes from variants
  const uniqueColors = Array.from(
    new Map(
      variants.filter((v) => v.color).map((v) => [v.color.code, v.color])
    ).values()
  );

  const uniqueSizes = Array.from(
    new Map(
      variants.filter((v) => v.size).map((v) => [v.size.code, v.size])
    ).values()
  ).sort((a, b) => a.sortOrder - b.sortOrder);

  // Handle editing a variant
  const handleEditVariant = (variant: IVariant) => {
    setEditingVariant({
      _id: variant._id,
      sku: variant.sku,
      quantity: variant.quantity,
      size: variant.size,
      color: variant.color,
      price: variant.price
        ? {
            currency: variant.price.currency as "USD" | "NGN",
            value: variant.price.value,
          }
        : { ...basePrice },
      active: variant.active,
      gallery: variant.gallery,
      pendingQuantity: variant.pendingQuantity,
      status: variant.status,
    });
    setIsDialogOpen(true);
    setIsCreating(false);
  };

  // Handle creating a new variant
  const handleCreateVariant = () => {
    setEditingVariant({
      _id: "", // Empty string for new variants
      sku: generateSku(),
      quantity: 0,
      size: commonSizes[2], // Default to Medium
      color: commonColors[0], // Default to Black
      price: { ...basePrice },
      active: true,
      gallery: [], // Empty array for new variants
      pendingQuantity: 0, // Zero for new variants
    });
    setIsDialogOpen(true);
    setIsCreating(true);
  };

  // Generate a SKU based on product code and variant details
  const generateSku = () => {
    const timestamp = new Date().getTime().toString().substring(9);
    return `SKU-${timestamp}`;
  };

  // Save variant changes
  const handleSaveVariant = () => {
    if (!editingVariant) return;

    // Validate required fields
    if (!editingVariant.color || !editingVariant.size) {
      setError("Please select both color and size");
      return;
    }

    // Check for duplicate SKU (excluding current variant when editing)
    const isDuplicate = variants.some(
      (v) => v.sku === editingVariant.sku && v._id !== editingVariant._id
    );
    if (isDuplicate) {
      setError("A variant with this SKU already exists");
      return;
    }

    setError("");

    if (isCreating) {
      // Add new variant
      const newVariant: IVariant = {
        ...editingVariant,
        _id: editingVariant._id || "", // Use existing _id or empty string
        gallery: editingVariant.gallery || [], // Use existing gallery or empty array
        pendingQuantity: editingVariant.pendingQuantity || 0, // Use existing pendingQuantity or 0
        status:
          editingVariant.quantity === 0
            ? "out-of-stock"
            : editingVariant.quantity < 5
            ? "limited-stock"
            : "in-stock",
      };
      onChange([...variants, newVariant]);
    } else {
      // Update existing variant
      const updatedVariants: IVariant[] = variants.map((v) =>
        v.sku === editingVariant.sku
          ? {
              ...v,
              ...editingVariant,
              status:
                editingVariant.quantity === 0
                  ? "out-of-stock"
                  : editingVariant.quantity < 5
                  ? "limited-stock"
                  : "in-stock",
            }
          : v
      );
      onChange(updatedVariants);
    }

    setIsDialogOpen(false);
    setEditingVariant(null);
  };

  // Delete a variant
  const handleDeleteVariant = (sku: string) => {
    const updatedVariants = variants.filter((v) => v.sku !== sku);
    onChange(updatedVariants);
  };

  // Bulk create variants
  const handleBulkCreateVariants = () => {
    if (selectedSizes.length === 0 || selectedColors.length === 0) {
      return;
    }

    const newVariants: IVariant[] = [];

    selectedSizes.forEach((sizeCode) => {
      const size = commonSizes.find((s) => s.code === sizeCode);

      selectedColors.forEach((colorCode) => {
        const color = commonColors.find((c) => c.code === colorCode);

        if (size && color) {
          const timestamp = new Date().getTime().toString().substring(9);
          const sku = `${color.code}-${size.code}-${timestamp}`;

          // Check if variant already exists
          const variantExists = variants.some(
            (v) => v.size?.code === size.code && v.color?.code === color.code
          );

          if (!variantExists) {
            newVariants.push({
              _id: "", // Temporary ID, will be assigned by backend
              sku,
              quantity: 0,
              pendingQuantity: 0,
              status: "out-of-stock",
              gallery: [],
              price: { ...basePrice },
              active: true,
              size,
              color,
            } as IVariant);
          }
        }
      });
    });

    onChange([...variants, ...newVariants]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">Product Variants</h3>
          <p className="text-sm text-muted-foreground">
            Manage the different variations of your product
          </p>
        </div>
        <Button onClick={handleCreateVariant}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Variant
        </Button>
      </div>

      {variants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-muted p-3">
              <PlusCircle className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No variants yet</h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Get started by adding variants to your product.
              <br />
              Variants can have different sizes, colors, and prices.
            </p>
            <Button className="mt-4" onClick={handleCreateVariant}>
              Add Your First Variant
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variants.map((variant) => (
                <TableRow key={variant.sku}>
                  <TableCell className="font-mono text-xs">
                    {variant.sku}
                  </TableCell>
                  <TableCell>
                    {variant.size ? (
                      <Badge variant="outline">
                        {variant.size.displayName || variant.size.name}
                      </Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    {variant.color ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="h-4 w-4 rounded-full border"
                          style={{ backgroundColor: variant.color.hex }}
                        />
                        {variant.color.name}
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {variant.price
                      ? formatCurrency(
                          parseInt(variant.price.value),
                          variant.price.currency as "USD" | "NGN"
                        )
                      : formatCurrency(
                          parseInt(basePrice.value),
                          basePrice.currency as "USD" | "NGN"
                        )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col">
                      <span>{variant.quantity}</span>
                      {variant.pendingQuantity ? (
                        <span className="text-xs text-muted-foreground">
                          {variant.pendingQuantity} pending
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        variant.status === "in-stock"
                          ? "success"
                          : variant.status === "limited-stock"
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {variant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={variant.active}
                      onCheckedChange={(checked) => {
                        const updatedVariants = variants.map((v) =>
                          v.sku === variant.sku ? { ...v, active: checked } : v
                        );
                        onChange(updatedVariants);
                      }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditVariant(variant)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteVariant(variant.sku)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Bulk Creation Card */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Bulk Create Variants</CardTitle>
          <CardDescription>
            Quickly create multiple variants by selecting sizes and colors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="mb-2 block">Select Sizes</Label>
            <ToggleGroup
              type="multiple"
              variant="outline"
              value={selectedSizes}
              onValueChange={setSelectedSizes}
              className="flex flex-wrap gap-2"
            >
              {commonSizes.map((size) => (
                <ToggleGroupItem
                  key={size.code}
                  value={size.code}
                  aria-label={size.displayName}
                  className="px-3 py-1"
                >
                  {size.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div>
            <Label className="mb-2 block">Select Colors</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {commonColors.map((color) => (
                <Button
                  key={color.code}
                  type="button"
                  variant={
                    selectedColors.includes(color.code) ? "default" : "outline"
                  }
                  className="h-10 justify-start px-3"
                  onClick={() => {
                    if (selectedColors.includes(color.code)) {
                      setSelectedColors(
                        selectedColors.filter((c) => c !== color.code)
                      );
                    } else {
                      setSelectedColors([...selectedColors, color.code]);
                    }
                  }}
                >
                  <div
                    className="mr-2 h-4 w-4 rounded-full border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm">
              {selectedSizes.length} sizes × {selectedColors.length} colors ={" "}
              {selectedSizes.length * selectedColors.length} new variants
            </p>
            <Button
              onClick={handleBulkCreateVariants}
              disabled={
                selectedSizes.length === 0 || selectedColors.length === 0
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Variants
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Variant Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Add New Variant" : "Edit Variant"}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Create a new variant with unique properties"
                : "Modify the properties of this variant"}
            </DialogDescription>
          </DialogHeader>

          {editingVariant && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Input
                    id="sku"
                    value={editingVariant.sku}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        sku: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0"
                    value={editingVariant.quantity}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        quantity: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Select
                    value={editingVariant.size?.code}
                    onValueChange={(value) => {
                      const selectedSize = commonSizes.find(
                        (s) => s.code === value
                      );
                      if (selectedSize) {
                        setEditingVariant({
                          ...editingVariant,
                          size: selectedSize,
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Common Sizes</SelectLabel>
                        {commonSizes.map((size) => (
                          <SelectItem key={size.code} value={size.code}>
                            {size.displayName} ({size.name})
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Select
                    value={editingVariant.color?.code}
                    onValueChange={(value) => {
                      const selectedColor = commonColors.find(
                        (c) => c.code === value
                      );
                      if (selectedColor) {
                        setEditingVariant({
                          ...editingVariant,
                          color: selectedColor,
                        });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Common Colors</SelectLabel>
                        {commonColors.map((color) => (
                          <SelectItem key={color.code} value={color.code}>
                            <div className="flex items-center">
                              <div
                                className="mr-2 h-3 w-3 rounded-full"
                                style={{ backgroundColor: color.hex }}
                              />
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="flex">
                  <Select
                    value={editingVariant.price?.currency}
                    onValueChange={(value) => {
                      setEditingVariant({
                        ...editingVariant,
                        price: {
                          ...editingVariant.price,
                          currency: value as "USD" | "NGN",
                        },
                      });
                    }}
                  >
                    <SelectTrigger className="w-20 rounded-r-none">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="NGN">NGN</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    className="flex-1 rounded-l-none"
                    placeholder="0.00"
                    value={editingVariant.price?.value}
                    onChange={(e) =>
                      setEditingVariant({
                        ...editingVariant,
                        price: {
                          ...editingVariant.price,
                          value: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="active"
                  checked={editingVariant.active}
                  onCheckedChange={(checked) =>
                    setEditingVariant({
                      ...editingVariant,
                      active: checked,
                    })
                  }
                />
                <Label htmlFor="active">Active</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveVariant}>
              {isCreating ? "Create Variant" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
