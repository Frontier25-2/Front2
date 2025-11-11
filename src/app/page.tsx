"use client";

import { useState } from "react";
// 새로 만든 컴포넌트들을 임포트합니다. 경로를 꼭 확인해 주세요!
import DataCollect from "@/components/DataCollect";
import ModelSelect from "@/components/ModelSelect";
import Frontier from "@/components/Frontier";
import AiAnalysis from "@/components/AiAnalysis";


const tabs = [
  { id: "data", label: "자료 수집", icon: "🗄️" },
  { id: "model", label: "모델 추천", icon: "📈" },
  { id: "efficient", label: "효율적 프론티어", icon: "📊" },
  { id: "ai", label: "AI 분석", icon: "💬" },
];

export default function Page() {
  const [selectedTab, setSelectedTab] = useState("data");

  // 공통 스타일
  const navStyle = {
    display: "flex",
    backgroundColor: "white",
    borderRadius: "0.5rem", // rounded-lg 약 8px
    boxShadow:
      "0 4px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)", // 그림자 효과
    marginTop: "1rem",
    padding: "0.25rem", // p-1 = 4px
    width: "var(--screen-width-80)", // <-- 화면 너비의 80% (이 부분은 유지됩니다)
    // 필요하다면 여기에 최대 너비 제한 (예: maxWidth: "64rem")을 추가할 수 있습니다.
    marginLeft: "auto",
    marginRight: "auto",
  };

  const buttonBaseStyle = {
    display: "flex",
    alignItems: "center",
    // 탭 버튼의 크기를 `--screen-width-80`에 맞추기 위해 flex-grow를 추가합니다.
    flexGrow: 1, // <--- 이 부분이 핵심이에요! 사용 가능한 공간을 균등하게 분배합니다.
    justifyContent: "center", // <--- 이 부분도 추가했어요! 버튼 내 내용을 중앙 정렬합니다.
    gap: "0.5rem", // gap-2 = 8px
    // flex-grow가 적용되면 paddingLeft/Right는 내부 콘텐츠에 대한 여백으로 작동합니다.
    paddingLeft: "1.5rem", // px-6 = 24px
    paddingRight: "1.5rem",
    paddingTop: "0.5rem", // py-2 = 8px
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

  // 콘텐츠영역 스타일
  const contentStyle = {
    width: "var(--screen-width-80)", // <-- 콘텐츠 영역도 80% 너비로 지정
    // 기존 maxWidth가 있었다면 이곳에 추가 (예: maxWidth: "64rem")
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2rem", // mt-6 = 48px
    padding: "0rem", // p-4 = 16px
    fontSize: "1rem",
    color: "#374151", // text-gray-700
  };

  return (
    <main style={{ padding: "1rem" }}>
      <nav style={navStyle}>
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab.id;
          const buttonStyle = {
            ...buttonBaseStyle,
            backgroundColor: isSelected ? "#16476A" : "transparent", // 선택된 탭 배경색 (기존 bg-blue-900)
            color: isSelected ? "white" : "#374151", // 선택된 탭 글자색 (기존 text-white or text-gray-700)
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

      <section style={contentStyle}>
        {selectedTab === "data" && <DataCollect />}
        {selectedTab === "model" && <ModelSelect />}
        {selectedTab === "efficient" && <Frontier />}
        {selectedTab === "ai" && <AiAnalysis />}
      </section>
    </main>
  );
}