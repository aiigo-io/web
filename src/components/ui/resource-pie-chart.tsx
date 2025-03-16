import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "../../lib/utils";

interface ResourceData {
  name: string;
  value: number;
  icon?: React.ReactNode;
  color: string;
}

interface PieChartComponentProps {
  data: ResourceData[];
  title?: string;
  description?: string;
}

const RADIAN = Math.PI / 180;
const GRADIENT_COLORS = [
  "from-purple-200 via-violet-400 to-indigo-600",
];

const ResourcePieChart: React.FC<PieChartComponentProps> = ({
  data,
  title = "Resource Allocation",
  description = "Current system resource distribution"
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.2);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl overflow-hidden relative border border-[#222] shadow-md shadow-black/30">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 blur-3xl">
          {GRADIENT_COLORS.map((_, index) => (
            <svg
              key={index}
              className="absolute"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 50}%`,
                transform: `translate(-50%, -50%) scale(${Math.random() * 0.5 + 0.5})`,
                opacity: 0.2,
              }}
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="50"
                fill="url(#gradient-bg)"
                className="opacity-30"
              />
            </svg>
          ))}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient-bg" gradientTransform={`rotate(${rotation})`}>
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="relative z-10 p-4">
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/50 mb-4">{description}</p>
      </div>
      
      <div className="relative z-10 p-4">
        <div ref={containerRef} className="w-full h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                innerRadius={60}
                paddingAngle={4}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                className="drop-shadow-xl"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-opacity duration-300"
                    style={{
                      filter: activeIndex === index ? "brightness(1.2) drop-shadow(0 0 8px rgba(0,0,0,0.3))" : "none",
                      transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                      opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#1a1a1a]/90 backdrop-blur-sm p-3 rounded-lg border border-[#333] shadow-lg">
                        <div className="flex items-center gap-2">
                          {data.icon && <div className="text-white">{data.icon}</div>}
                          <p className="text-sm font-medium text-white">{data.name}</p>
                        </div>
                        <p className="text-lg font-bold text-white">{data.value}%</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
          <AnimatePresence>
            {data.map((resource, index) => (
              <motion.div
                key={resource.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg",
                  activeIndex === index 
                    ? "bg-[#1a1a1a] border border-[#333] shadow-lg" 
                    : "bg-[#111] border border-[#222]"
                )}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{
                  borderLeft: `3px solid ${resource.color}`,
                }}
              >
                <div className="p-2 rounded-full mb-2" style={{ backgroundColor: resource.color + "20" }}>
                  {resource.icon || <div className="w-5 h-5 rounded-full" style={{ backgroundColor: resource.color }} />}
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold" style={{ color: resource.color }}>{resource.value}%</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export { ResourcePieChart, type ResourceData }; 