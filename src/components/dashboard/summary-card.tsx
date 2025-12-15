"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Package,
  Users,
  UserPlus,
  TrendingUp,
  LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SummaryCard as SummaryCardType } from "./types";

const iconMap: Record<string, LucideIcon> = {
  "shopping-bag": ShoppingBag,
  package: Package,
  users: Users,
  "user-plus": UserPlus,
};

interface SummaryCardProps {
  data: SummaryCardType;
  index: number;
}

export default function SummaryCard({ data, index }: SummaryCardProps) {
  const Icon = iconMap[data.icon] || ShoppingBag;

  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div variants={cardAnimation} initial="hidden" animate="visible">
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{data.title}</p>
              <h3 className="text-2xl font-bold">{data.value}</h3>

              {data.increment && (
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+{data.increment}</span>
                </div>
              )}
            </div>

            <div className="p-2 bg-primary/10 text-primary rounded-md">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
