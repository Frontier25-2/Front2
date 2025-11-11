"use client";
import React, { useState } from "react";

interface Portfolio {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  risk: string;
  expectedReturn: string;
  reliability: string;
  themeColor: string;
  icon: string;
}

const portfolios: Portfolio[] = [
  {
    id: "minVar",
    title: "최소 분산 포트폴리오",
    subtitle: "Minimum Variance Portfolio",
    description: "변동성을 최소화하여 안정적인 수익을 추구합니다",
    risk: "12.5%",
    expectedReturn: "8.2%",
    reliability: "87",
    themeColor: "#3B9797",
    icon: "🛡️",
  },
  {
    id: "maxSharpe",
    title: "최대 샤프 포트폴리오",
    subtitle: "Maximum Sharpe Ratio",
    description: "위험 대비 수익률을 최대화하는 최적 포트폴리오입니다",
    risk: "18.3%",
    expectedReturn: "12.7%",
    reliability: "92",
    themeColor: "#BF092F",
    icon: "📈",
  },
  {
    id: "riskParity",
    title: "리스크 패리티",
    subtitle: "Risk Parity",
    description: "각 자산의 리스크 기여도를 균등하게 분배합니다",
    risk: "15.1%",
    expectedReturn: "9.8%",
    reliability: "85",
    themeColor: "#244272",
    icon: "⚖️",
  },
  {
    id: "maxDivers",
    title: "최대 분산비율",
    subtitle: "Maximum Diversification",
    description: "다각화를 통해 비체계적 위험을 최소화합니다",
    risk: "14.2%",
    expectedReturn: "10.3%",
    reliability: "89",
    themeColor: "#000000",
    icon: "⚡",
  },
];

export function hexToRgba(hex: string, alpha: number): string {
  let cleanHex = hex.trim().toLowerCase();
  if (cleanHex.startsWith("#")) cleanHex = cleanHex.slice(1);
  if (cleanHex.length === 3)
    cleanHex = cleanHex.split("").map((c) => c + c).join("");
  if (cleanHex.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function PortfolioSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  /** 상단 카드들 */
  const portfolioCards = (
    <>
      <div style={{ marginBottom: 24 }}>
        <h3
          style={{
            fontWeight: 600,
            fontSize: "1.5rem",
            color: "#0f172a",
            marginBottom: 8,
          }}
        >
          자산배분 모델 추천
        </h3>
        <p style={{ fontSize: "0.875rem", color: "#3c4552" }}>
          투자 성향과 목표에 맞는 최적의 자산배분 모델을 선택하세요
        </p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {portfolios.map((p) => {
          const isSelected = selectedId === p.id;
          const transparentColor = hexToRgba(p.themeColor, 0.15);

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedId(p.id)}
              style={{
                flex: "1 1 48%",
                backgroundColor: "white",
                borderRadius: 12,
                padding: "20px 24px",
                cursor: "pointer",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 6,
                textAlign: "left",
                border: isSelected ? "3px solid black" : "1px solid #c0c0c0",
                boxShadow: "0 2px 2px rgba(0,0,0,0.1)",
                position: "relative",
              }}
            >
              {isSelected && (
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "24px",
                    fontSize: "30px",
                    color: p.themeColor,
                  }}
                >
                  ★
                </span>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    backgroundColor: transparentColor,
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 24,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      color: "#0F3B3B",
                      fontWeight: 600,
                      marginBottom: 5,
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#7B9B9B",
                      marginTop: 0,
                    }}
                  >
                    {p.subtitle}
                  </p>
                </div>
              </div>

              <p style={{ fontSize: "1rem", color: "#3B5050" }}>
                {p.description}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "#607D7D" }}>
                    리스크
                  </span>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: p.themeColor,
                    }}
                  >
                    {p.risk}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "#607D7D" }}>
                    기대수익률
                  </span>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: p.themeColor,
                    }}
                  >
                    {p.expectedReturn}
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: "0.85rem", color: "#607D7D" }}>
                    신뢰도
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        color: p.themeColor,
                      }}
                    >
                      {p.reliability}
                    </span>
                    <span
                      style={{
                        backgroundColor: p.themeColor,
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "2px 8px",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                      }}
                    >
                      점
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );

  /** 하단 성능 비교 테이블 */
  const performanceTable = (
    <div
      style={{
        width: "100%",
        borderRadius: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        padding: "24px",
        marginTop: "32px",
      }}
    >
      <h3
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          color: "#111827",
          marginBottom: 8,
        }}
      >
        모델 성능 비교
      </h3>
      <p
        style={{
          color: "#6b7280",
          fontSize: "0.9rem",
          marginBottom: 16,
        }}
      >
        각 모델의 주요 지표를 비교하여 최적의 선택을 하세요
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                padding: "12px 8px",
                color: "#374151",
                fontWeight: 600,
                borderBottom: "2px solid #e5e7eb",
                textAlign: "left",
              }}
            >
              지표
            </th>
            {portfolios.map((p) => (
              <th
                key={p.id}
                style={{
                  padding: "12px 8px",
                  color: selectedId === p.id ? "#b91c1c" : "#374151",
                  fontWeight: 600,
                  borderBottom: "2px solid #e5e7eb",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedId(p.id)}
              >
                {p.title.replace("포트폴리오", "")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ["연간 기대수익률", "expectedReturn"],
            ["연간 변동성", "risk"],
            ["샤프 비율", ""],
            ["최대 낙폭 (MDD)", ""],
            ["신뢰도 점수", "reliability"],
          ].map(([label, key]) => (
            <tr key={label}>
              <td
                style={{
                  padding: "12px 8px",
                  color: "#374151",
                  fontWeight: 600,
                  borderBottom: "1px solid #e5e7eb",
                  textAlign: "left",
                }}
              >
                {label}
              </td>
              {portfolios.map((p) => (
                <td
                  key={p.id}
                  style={{
                    padding: "12px 8px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {(p as any)[key] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  /** 하단 버튼 */
  const actionButton = (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
      <button
        type="button"
        disabled={!selectedId}
        onClick={() => {
          if (!selectedId) return;
          alert(`${selectedId} 포트폴리오로 구성합니다.`);
        }}
        style={{
          padding: "14px 28px",
          borderRadius: "8px",
          border: "none",
          fontSize: "1rem",
          fontWeight: 600,
          color: "#fff",
          cursor: selectedId ? "pointer" : "not-allowed",
          backgroundColor: selectedId ? "#b91c1c" : "#6b7280",
          transition: "background-color 0.2s",
        }}
      >
        선택한 모델로 포트폴리오 구성하기
      </button>
    </div>
  );

  return (
    <>
      {portfolioCards}
      {performanceTable}
      {actionButton}
    </>
  );
}
