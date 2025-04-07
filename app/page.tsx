"use client";

import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");

  const handleAnalyze = () => {
    alert(`分析钱包地址: ${address}`);
    // 后续可以添加分析逻辑
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Solana 大户雷达 🚀</h1>
      <input
        type="text"
        placeholder="请输入钱包地址"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border px-4 py-2 rounded w-full max-w-md"
      />
      <button
        onClick={handleAnalyze}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        开始分析
      </button>
    </main>
  );
}