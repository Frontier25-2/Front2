"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api.ts";
import DataCollect from "@/components/DataCollect";
import ModelSelect from "@/components/ModelSelect";
import Frontier from "@/components/Frontier";
import AiAnalysis from "@/components/AiAnalysis";

// 탭 설정
const tabs = [
  { id: "data", label: "자료 수집", icon: "🗄️" },
  { id: "model", label: "모델 추천", icon: "📈" },
  { id: "efficient", label: "효율적 프론티어", icon: "📊" },
  { id: "ai", label: "AI 분석", icon: "💬" },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("data");
  const [msg, setMsg] = useState("");

  // Flask 서버 연결 테스트
  useEffect(() => {
    api
      .get("/analytics/hello")
      .then((res) => setMsg(res.data.message))
      .catch((err) => console.error("API Error:", err));
  }, []);

  // 공통 스타일
  const navStyle = {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow:
      "0 4px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
    marginTop: "1rem",
    padding: "0.25rem",
    width: "var(--screen-width-80)",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const buttonBaseStyle = {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    gap: "0.5rem",
    paddingLeft: "1.5rem",
    paddingRight: "1.5rem",
    paddingTop: "0.5rem",
    paddingBottom: "0.5rem",
    borderRadius: "0.5rem",
    whiteSpace: "nowrap",
    cursor: "pointer",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    fontWeight: "500",
    userSelect: "none",
    transition: "background-color 0.2s ease, color 0.2s ease",
  };

  const contentStyle = {
    width: "var(--screen-width-80)",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2rem",
    padding: "0rem",
    fontSize: "1rem",
    color: "#374151",
  };

  return (
    <main style={{ padding: "1rem" }}>
      {/* Flask 연결 테스트 문구 */}
      <h2 style={{ textAlign: "center", color: "#2563EB" }}>
        {msg || "Flask 연결 중..."}
      </h2>

      {/* 탭 네비게이션 */}
      <nav style={navStyle}>
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab.id;
          const buttonStyle = {
            ...buttonBaseStyle,
            backgroundColor: isSelected ? "#16476A" : "transparent",
            color: isSelected ? "white" : "#374151",
          };

          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              role="tab"
              aria-selected={isSelected}
              style={buttonStyle}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 탭 콘텐츠 */}
      <section style={contentStyle}>
        {selectedTab === "data" && <DataCollect />}
        {selectedTab === "model" && <ModelSelect />}
        {selectedTab === "efficient" && <Frontier />}
        {selectedTab === "ai" && <AiAnalysis />}
      </section>
    </main>
  );
}
