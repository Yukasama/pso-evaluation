"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import Skeleton from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: any;
  payload: any;
  label: any;
}) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2">
        <p className="text-[15px]">{label}</p>
        <p className="text-sm text-[#19E363]">
          {(payload[0].value * 100).toFixed(2)}%
        </p>
      </Card>
    );
  }
  return null;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: any[];
}

export default function Chart({ data, className, ...props }: Props) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(1);

  useEffect(() => {
    setMounted(true);
  }, []);

  let newData = data;

  return (
    <Card
      className={cn(className, "w-full max-w-[600px]")}
      style={{ height: 350 }}
      {...props}>
      <CardHeader>
        <CardTitle>Particles</CardTitle>
        <CardDescription>Current Iteration: {sliderValue}</CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton isLoaded={mounted} className="rounded-md">
          {mounted && (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart
                width={500}
                height={250}
                data={data.slice(
                  sliderValue === 1 ? 1 : sliderValue - 1,
                  sliderValue + 2
                )}
                className="bg-card"
                margin={{
                  top: 6,
                  right: 40,
                }}>
                <defs>
                  <linearGradient id="uv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#19E363" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#19E363" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                {/* @ts-ignore */}
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#19E363"
                  name="Particle Score"
                  fill="url(#uv)"
                  dot
                />
                <ReferenceLine
                  y={0.6}
                  strokeDasharray="3 3"
                  stroke="gray"
                  label="Global Best"
                />
                <ReferenceLine
                  y={0.4}
                  strokeDasharray="3 3"
                  stroke="gray"
                  label="Local Best"
                />
                <Legend
                  height={32}
                  margin={{ left: 20 }}
                  wrapperStyle={{ fontSize: "14px" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </Skeleton>
      </CardContent>
      <Slider
        defaultValue={[1]}
        max={70}
        min={1}
        onValueChange={(e: any) => setSliderValue(e)}
      />
    </Card>
  );
}
