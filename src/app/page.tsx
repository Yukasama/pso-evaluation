"use client";

import Chart from "@/components/chart";
import PageLayout from "@/components/shared/page-layout";

interface Props {}

export default function page({}: Props) {
  const data = [
    {
      name: "2013",
      uv: 0.4,
    },
    {
      name: "2014",
      uv: 0.3,
      pv: 0.6,
      fv: 0.8,
    },
    {
      name: "2015",
      uv: 0.5,
    },
    {
      name: "2015",
      uv: 0.5,
    },
    {
      name: "2015",
      uv: 0.5,
    },
  ];
  return (
    <PageLayout
      title="Chart Overview"
      description="See your evaluation charts here">
      <Chart data={data} />
    </PageLayout>
  );
}
