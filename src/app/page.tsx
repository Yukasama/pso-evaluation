"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import Skeleton from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import PageLayout from "@/components/shared/page-layout";
import { globalBest } from "@/config/global-best";
import { bestScores } from "@/config/best-scores";
import { bestWeights } from "@/config/best-weights";
import { currentWeights } from "@/config/current-weights";
import { currentScores } from "@/config/current-scores";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RotateCcw, RotateCw } from "lucide-react";

const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-2 text-sm">
        <p>Particle: {payload[0].value.toFixed(2)}</p>
        <p>Score: {payload[1].value.toFixed(2)}</p>
      </Card>
    );
  }
  return null;
};

export default function Page() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [isDiashowRunning, setIsDiashowRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [diashowSpeed, setDiashowSpeed] = useState<number>(1);
  const [xMax, setXMax] = useState<number>(6);
  const [yMax, setYMax] = useState<number>(530);
  const [xMin, setXMin] = useState<number>(-4);
  const [yMin, setYMin] = useState<number>(-300);
  const [phase1, setPhase1] = useState<number>(35);
  const [phase2, setPhase2] = useState<number>(20);
  const [phase3, setPhase3] = useState<number>(20);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const startDiashow = () => {
    setIsDiashowRunning(true);
    intervalId.current = setInterval(() => {
      setSliderValue((prev) =>
        prev < currentWeights[0].length ? prev + 1 : 1
      );
    }, diashowSpeed * 1000);
  };

  const pauseDiashow = () => {
    setIsPaused(true);
    if (intervalId.current) clearInterval(intervalId.current);
  };

  const resumeDiashow = () => {
    setIsPaused(false);
    intervalId.current = setInterval(() => {
      setSliderValue((prev) => (currentWeights[0].length ? prev + 1 : 1));
    }, diashowSpeed * 1000);
  };

  const cancelDiashow = () => {
    setIsDiashowRunning(false);
    setIsPaused(false);
    if (intervalId.current) clearInterval(intervalId.current);
    setSliderValue(1);
  };

  useEffect(() => {
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const initialChecks = [
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  const [checks, setChecks] = useState(initialChecks);

  const handleCheckboxChange = (index: number) => {
    const updatedChecks = [...checks];
    updatedChecks[index] = !updatedChecks[index];
    setChecks(updatedChecks);
  };

  if (
    !currentWeights.length ||
    !bestWeights.length ||
    !currentScores.length ||
    !bestScores.length
  )
    return (
      <div className="f-box mt-[370px]">
        <div className="f-col gap-2.5">
          <h2 className="text-zinc-600 dark:text-zinc-400 text-lg">
            Internal Server Error
          </h2>
          <p className="text-slate-400 dark:text-slate-200 text-sm">
            Data to be displayed might be incomplete.
          </p>
        </div>
      </div>
    );

  const current: any[] = [];
  for (let i = 0; i < currentWeights.length; i++) {
    const currentPlaceholder: any[] = [];
    for (let j = 0; j < currentWeights[i].length; j++) {
      if (checks[j])
        currentPlaceholder.push({
          x: currentWeights[i][j][sliderValue],
          y: currentScores[j][sliderValue],
        });
    }
    current.push(currentPlaceholder);
  }

  const best: any[] = [];
  for (let i = 0; i < bestWeights.length; i++) {
    const bestPlaceholder: any[] = [];
    for (let j = 0; j < bestWeights[i].length; j++) {
      if (checks[j])
        bestPlaceholder.push({
          x: bestWeights[i][j][sliderValue],
          y: bestScores[j][sliderValue],
        });
    }
    best.push(bestPlaceholder);
  }

  return (
    <PageLayout
      title="Stormcloud4 | Particle Swarm Weight Optimization"
      description="Weight Optimization Analysis for Stormcloud4 using Particle Swarm Optimization"
      className={`${
        sliderValue < phase1
          ? "bg-slate-900"
          : sliderValue < phase1 + phase2
          ? "bg-slate-900/50"
          : "bg-slate-950"
      }`}>
      <div className="p-1 space-y-5">
        <div className="flex gap-5">
          <Card className="space-y-6">
            <CardHeader>
              <div className="flex justify-between">
                <div className="space-y-1.5">
                  <CardTitle>Iteration Slider</CardTitle>
                  <CardDescription>
                    Current Iteration: {sliderValue}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() =>
                      setSliderValue(sliderValue === 1 ? 1 : sliderValue - 1)
                    }>
                    <RotateCcw className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="subtle"
                    size="sm"
                    onClick={() =>
                      setSliderValue(
                        sliderValue + 1 > currentWeights[0][0].length
                          ? currentWeights[0][0].length
                          : sliderValue + 1
                      )
                    }>
                    <RotateCw className="h-4 w-4" />
                    Next
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Slider
                defaultValue={[1]}
                max={70}
                min={1}
                value={[sliderValue]}
                className="w-96"
                onValueChange={(e: any) => setSliderValue(Number(e))}
              />
            </CardContent>
            <CardFooter className="gap-3 items-end">
              <div className="w-full">
                <p className="text-sm px-1 pb-1 font-medium">
                  Iteration Speed (in seconds)
                </p>
                <Input
                  type="number"
                  placeholder="Diashow Iteration Speed"
                  defaultValue={1}
                  onChange={(e: any) => setDiashowSpeed(e.target.value)}
                />
              </div>

              {!isDiashowRunning && !isPaused ? (
                <Button
                  className="bg-primary hover:bg-primary/80 whitespace-nowrap"
                  onClick={startDiashow}>
                  Start Diashow
                </Button>
              ) : (
                <>
                  {isPaused ? (
                    <Button
                      className="bg-primary hover:bg-primary/80 whitespace-nowrap"
                      onClick={resumeDiashow}>
                      Resume
                    </Button>
                  ) : (
                    <Button
                      className="bg-primary hover:bg-primary/80 whitespace-nowrap"
                      onClick={pauseDiashow}>
                      Pause
                    </Button>
                  )}
                  <Button
                    className="bg-red-500 hover:bg-red-500/80 whitespace-nowrap"
                    onClick={cancelDiashow}>
                    Cancel
                  </Button>
                </>
              )}
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Particle Controls</CardTitle>
              <CardDescription>
                Modify the appearance of particles
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-8 gap-5">
              {checks.map((isChecked, i) => (
                <div key={i} className="flex items-center justify-end gap-1.5">
                  <p className="text-sm">{i + 1}</p>
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => handleCheckboxChange(i)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Dimension Controls</CardTitle>
              <CardDescription>
                Modify the dimensions of the chart
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm px-1 pb-1 font-medium">xMin</p>
                <Input
                  type="number"
                  value={xMin}
                  className="w-40"
                  onChange={(e: any) => setXMin(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="text-sm px-1 pb-1 font-medium">xMax</p>
                <Input
                  type="number"
                  value={xMax}
                  className="w-40"
                  onChange={(e: any) => setXMax(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="text-sm px-1 pb-1 font-medium">yMin</p>
                <Input
                  type="number"
                  value={yMin}
                  className="w-40"
                  onChange={(e: any) => setYMin(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="text-sm px-1 pb-1 font-medium">yMax</p>
                <Input
                  type="number"
                  value={yMax}
                  className="w-40"
                  onChange={(e: any) => setYMax(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Phase Controls</CardTitle>
              <CardDescription>Modify the phase intervals</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm px-1 pb-1 font-medium">Phase 1</p>
                <Input
                  type="number"
                  value={phase1}
                  className="w-40"
                  onChange={(e: any) => setPhase1(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="text-sm px-1 pb-1 font-medium">Phase 2</p>
                <Input
                  type="number"
                  value={phase2}
                  className="w-40"
                  onChange={(e: any) => setPhase2(Number(e.target.value))}
                />
              </div>
              <div>
                <p className="text-sm px-1 pb-1 font-medium">Phase 3</p>
                <Input
                  type="number"
                  value={phase3}
                  className="w-40"
                  onChange={(e: any) => setPhase3(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <Separator />
        <div className="grid grid-cols-3 gap-5">
          {[...Array(currentWeights.length)].map((_, i) => (
            <Card
              key={i}
              className="w-full max-w-[600px]"
              style={{ height: 350 }}>
              <CardHeader>
                <CardTitle>Weight {i + 1}</CardTitle>
                <CardDescription>
                  Particle Data for Weight {i + 1}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton isLoaded={mounted} className="rounded-md">
                  {mounted && (
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart
                        width={500}
                        height={250}
                        className="bg-card"
                        margin={{
                          top: 6,
                          right: 40,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          type="number"
                          dataKey="x"
                          fontSize={14}
                          domain={[xMin, xMax]}
                        />
                        <YAxis
                          type="number"
                          dataKey="y"
                          fontSize={14}
                          domain={[yMin, yMax]}
                        />
                        {/* @ts-ignore */}
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter
                          data={current[i]}
                          name="Current Particle Scores"
                          fill="#19E363"
                        />
                        <Scatter
                          data={best[i]}
                          name="Best Particle Scores"
                          fill="#2d82e3"
                        />
                        <Scatter
                          data={[
                            {
                              x: globalBest.weights[i],
                              y: globalBest.score,
                            },
                          ]}
                          name="Global Best"
                          fill="#9340ed"
                        />
                        <Legend
                          height={32}
                          wrapperStyle={{ fontSize: "14px", marginLeft: 20 }}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  )}
                </Skeleton>
              </CardContent>
            </Card>
          ))}
          S
        </div>
      </div>
    </PageLayout>
  );
}
