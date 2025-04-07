"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57", "#ffc0cb"];

const fakeTopHolders = [
  { address: "Wallet1", percentage: 25 },
  { address: "Wallet2", percentage: 15 },
  { address: "Wallet3", percentage: 10 },
  { address: "Wallet4", percentage: 4 },
  { address: "Wallet5", percentage: 2 },
  { address: "Others", percentage: 44 },
];

export default function Home() {
  const [input, setInput] = useState("");
  const [showResult, setShowResult] = useState(false);

  const top5Sum = fakeTopHolders.slice(0, 5).reduce((acc, cur) => acc + cur.percentage, 0);
  const top10Sum = top5Sum + fakeTopHolders.slice(5, 10).reduce((acc, cur) => acc + (cur.percentage || 0), 0);

  const handleAnalyze = () => {
    setShowResult(true);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">🧠 Solana 大户雷达</h1>

      <div className="mb-4">
        <label className="block mb-2 text-lg">请输入项目主要钱包地址（多个用逗号分隔）：</label>
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="wallet1, wallet2, wallet3" />
      </div>

      <Button onClick={handleAnalyze} className="mb-6">开始分析</Button>

      {showResult && (
        <div className="space-y-6">
          <div className="text-xl font-semibold">资金集中度分析结果：</div>
          <div className="text-md">
            Top 5 持仓总占比：<span className="font-bold"> {top5Sum.toFixed(1)}%</span> {top5Sum > 50 ? "⚠️ 集中度偏高" : "✅ 分布较为健康"}<br />
            Top 10 持仓总占比：<span className="font-bold"> {top10Sum.toFixed(1)}%</span>
          </div>

          <div className="h-96">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={fakeTopHolders}
                  dataKey="percentage"
                  nameKey="address"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >
                  {fakeTopHolders.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-md text-yellow-700 font-medium">
            结论：{top5Sum > 50 ? "⚠️ 该项目资金高度集中，存在操盘风险" : "✅ 暂无异常集中迹象"}
          </div>
        </div>
      )}
    </main>
  );
}
