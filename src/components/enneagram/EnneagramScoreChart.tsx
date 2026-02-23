"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useEnneagramTheme } from "@/contexts/EnneagramThemeContext";
import { TYPE_LABELS } from "@/constants/enneagram";

interface EnneagramScoreChartProps {
  scores: Record<number, number>;
  primaryType: number;
}

export default function EnneagramScoreChart({
  scores,
  primaryType,
}: EnneagramScoreChartProps) {
  const { colors } = useEnneagramTheme();

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((t) => ({
    type: t,
    name: TYPE_LABELS[t],
    score: scores[t] ?? 0,
  }));

  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-theme-text-muted/20" />
          <XAxis
            type="number"
            tick={{ fill: "var(--theme-text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--theme-text-muted)" }}
            tickLine={{ stroke: "var(--theme-text-muted)" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={80}
            tick={{ fill: "var(--theme-text)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--theme-surface)",
              border: "1px solid var(--theme-primary)",
              borderRadius: "12px",
            }}
            labelStyle={{ color: "var(--theme-text)" }}
            formatter={(value) => [`${value ?? 0}점`, "점수"]}
            labelFormatter={(name) => name}
          />
          <Bar dataKey="score" radius={[0, 4, 4, 0]} maxBarSize={28}>
            {data.map((entry) => (
              <Cell
                key={entry.type}
                fill={
                  entry.type === primaryType
                    ? colors.primary
                    : "var(--theme-text-muted)"
                }
                opacity={entry.type === primaryType ? 1 : 0.5}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
