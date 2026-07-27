"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState } from "react";

type Item = {
  id: number;
  name: string;
  designation: string;
  image: string;
};

type AnimatedTooltipMotionProps = {
  items?: Item[];
  size?: "sm" | "lg";
};

const defaultItems: Item[] = [
  {
    id: 1,
    name: "Yoga",
    designation: "Website Developer",
    image: "https://images.shadcnspace.com/assets/profiles/user-1.jpg",
  },
  {
    id: 2,
    name: "5S Studio",
    designation: "Game Creator",
    image: "https://images.shadcnspace.com/assets/profiles/user-2.jpg",
  },
  {
    id: 3,
    name: "Community",
    designation: "Player Support",
    image: "https://images.shadcnspace.com/assets/profiles/user-3.jpg",
  },
  {
    id: 4,
    name: "Beastfall Team",
    designation: "Content Support",
    image: "https://images.shadcnspace.com/assets/profiles/user-4.jpg",
  },
];

function TooltipItem({
  item,
  size = "sm",
  activeId,
  setActiveId,
}: {
  item: Item;
  size?: "sm" | "lg";
  activeId: number | null;
  setActiveId: (id: number | null) => void;
}) {
  const open = activeId === item.id;
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), {
    stiffness: 100,
    damping: 15,
  });
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), {
    stiffness: 100,
    damping: 15,
  });

  return (
    <div className="group relative">
      <motion.div
        style={{ translateX, rotate }}
        className={`pointer-events-none absolute -top-20 left-1/2 z-40 -translate-x-1/2 flex-col items-center rounded-md bg-[#2563EB] px-4 py-2 text-xs shadow-xl group-hover:flex ${open ? "flex" : "hidden"}`}
      >
        <p className="whitespace-nowrap text-sm font-medium text-white">
          {item.name}
        </p>
        <p className="whitespace-nowrap text-xs text-white/70">
          {item.designation}
        </p>
      </motion.div>

      <img
        onClick={() => setActiveId(open ? null : item.id)}
        onMouseMove={(event) =>
          x.set(event.nativeEvent.offsetX - event.currentTarget.offsetWidth / 2)
        }
        src={item.image}
        alt={item.name}
        width={56}
        height={56}
        className={`${size === "lg" ? "h-28 w-28" : "h-14 w-14"} cursor-pointer rounded-full border-2 border-black object-cover object-top transition duration-300 group-hover:z-30 group-hover:scale-110`}
      />
    </div>
  );
}

export default function AnimatedTooltipMotion({
  items = defaultItems,
  size = "sm",
}: AnimatedTooltipMotionProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className={`flex items-center ${size === "lg" ? "-space-x-7" : "-space-x-3"}`}>
      {items.map((item) => (
        <TooltipItem
          key={item.id}
          item={item}
          size={size}
          activeId={activeId}
          setActiveId={setActiveId}
        />
      ))}
    </div>
  );
}
