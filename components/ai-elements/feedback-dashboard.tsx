"use client";

import { Button } from "@/components/ui/button";
import { Download, BarChart3, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { downloadPDF } from "@/lib/pdf-generator";
import { useRef } from "react";

export interface PerformanceMetrics {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  accuracy: number;
  domain: string;
  topic: string;
  interviewType: "cv" | "domain";
  questionDetails: Array<{
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    category: string;
  }>;
}

interface FeedbackDashboardProps {
  metrics: PerformanceMetrics;
}

export function FeedbackDashboard({ metrics }: FeedbackDashboardProps) {
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Data for charts
  const scoreData = [
    { name: "Correct", value: metrics.correctAnswers, fill: "#10b981" },
    { name: "Incorrect", value: metrics.incorrectAnswers, fill: "#ef4444" },
  ];

  const performanceData = [
    {
      category: "Accuracy",
      percentage: metrics.accuracy,
    },
    {
      category: "Score",
      percentage: (metrics.score / metrics.totalQuestions) * 100,
    },
  ];

  const categoryBreakdown = metrics.questionDetails.reduce((acc, q) => {
    const existing = acc.find((item) => item.category === q.category);
    if (existing) {
      existing.total += 1;
      if (q.isCorrect) existing.correct += 1;
    } else {
      acc.push({
        category: q.category,
        correct: q.isCorrect ? 1 : 0,
        total: 1,
      });
    }
    return acc;
  }, [] as Array<{ category: string; correct: number; total: number }>);

  const categoryData = categoryBreakdown.map((item) => ({
    category: item.category,
    score: Math.round((item.correct / item.total) * 100),
  }));

  const handleDownloadPDF = async () => {
    if (dashboardRef.current) {
      await downloadPDF(dashboardRef.current, metrics);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      <div ref={dashboardRef} className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(15,23,42,0.3)]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            Interview Performance Report
          </h2>
          <p className="text-slate-400">
            {metrics.interviewType === "cv" ? "CV-Based" : "Domain-Specific"} Interview • {metrics.domain} • {metrics.topic}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-sky-500/10 border border-sky-400/30 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Total Questions</p>
            <p className="text-3xl font-bold text-sky-400">{metrics.totalQuestions}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Correct</p>
            <p className="text-3xl font-bold text-emerald-400">{metrics.correctAnswers}</p>
          </div>
          <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Incorrect</p>
            <p className="text-3xl font-bold text-red-400">{metrics.incorrectAnswers}</p>
          </div>
          <div className="bg-orange-500/10 border border-orange-400/30 rounded-xl p-4">
            <p className="text-slate-400 text-sm">Accuracy</p>
            <p className="text-3xl font-bold text-orange-400">{metrics.accuracy.toFixed(1)}%</p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Pie Chart */}
          <div className="bg-slate-700/20 border border-slate-600/30 rounded-xl p-4">
            <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="size-4 text-sky-400" />
              Answer Distribution
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Performance */}
          <div className="bg-slate-700/20 border border-slate-600/30 rounded-xl p-4">
            <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-400" />
              Performance Metrics
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                  }}
                />
                <Bar dataKey="percentage" fill="#38bdf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        {categoryData.length > 0 && (
          <div className="bg-slate-700/20 border border-slate-600/30 rounded-xl p-4 mb-8">
            <h3 className="text-slate-200 font-semibold mb-4">
              Performance by Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="category" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                  }}
                  formatter={(value) => `${value}%`}
                />
                <Bar dataKey="score" fill="#f97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Question Details */}
        <div className="bg-slate-700/20 border border-slate-600/30 rounded-xl p-4 mb-8">
          <h3 className="text-slate-200 font-semibold mb-4">Question Details</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {metrics.questionDetails.map((detail, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border-l-4 ${
                  detail.isCorrect
                    ? "bg-emerald-500/10 border-l-emerald-400"
                    : "bg-red-500/10 border-l-red-400"
                }`}
              >
                <p className="text-slate-100 text-sm font-medium mb-1">
                  Q{idx + 1}: {detail.question}
                </p>
                <p className={`text-xs ${detail.isCorrect ? "text-emerald-300" : "text-red-300"}`}>
                  Your Answer: {detail.userAnswer}
                </p>
                {!detail.isCorrect && (
                  <p className="text-xs text-orange-300">
                    Correct Answer: {detail.correctAnswer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <Button
          onClick={handleDownloadPDF}
          className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white h-10 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        >
          <Download className="size-4" />
          Download Report as PDF
        </Button>
      </div>
    </div>
  );
}
