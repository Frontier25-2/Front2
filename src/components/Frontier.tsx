"use client";

import { section } from "inspector/promises";
import React, { useState } from "react";

export default function Frontier() {
    const [riskLevel, setRiskLevel] = useState(50); // 기본값 50%

    // 리스크 및 수익률 (예시)
    const expectedRisk = (10 + (riskLevel / 100) * 20).toFixed(1); // 10~30%
    const expectedReturn = (5 + (riskLevel / 100) * 10).toFixed(2); // 5~15%

    // 슬라이더 색상 계산
    const darkGray = "#111827";
    const lightGray = "#e5e7eb";
    const sliderBackground = `linear-gradient(to right, ${darkGray} 0%, ${darkGray} ${riskLevel}%, ${lightGray} ${riskLevel}%, ${lightGray} 100%)`;

    return (
        <div>
            <section
                style={{
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.5rem",
                    padding: "1.5rem",
                    width: "100%",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                }}
            >
                <h3
                    style={{
                        fontWeight: 600,
                        fontSize: "1.5rem",
                        color: "#0f172a",
                        marginBottom: 8,
                    }}
                >
                    효율적 프론티어
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#3c4552" }}>
                    리스크와 수익률의 관계를 시각화하고 최적 포트폴리오를 찾아보세요
                </p>
            </section>
            {/* ------------------------ 리스크 허용도 설정 ------------------------ */}
            <section>
                <div
                    style={{
                        marginTop: "2rem",
                        border: "1px solid #cbd5e1",
                        borderRadius: "1rem",
                        padding: "1.5rem",
                        backgroundColor: "white",
                    }}
                >
                    {/* 제목 */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1.2rem" }}>🎯</span>
                        <p
                            style={{
                                fontWeight: 600,
                                fontSize: "1.1rem",
                                color: "#111827",
                                margin: 0,
                            }}
                        >
                            리스크 허용도 설정
                        </p>
                    </div>

                    <p
                        style={{
                            fontSize: "0.9rem",
                            color: "#6b7280",
                            marginTop: "0.5rem",
                            marginBottom: "1rem",
                        }}
                    >
                        귀하의 리스크 선호도에 맞는 최적 포트폴리오를 찾아드립니다
                    </p>

                    {/* ------------------- 슬라이더 영역 ------------------- */}
                    <div style={{ marginTop: "1rem", position: "relative" }}>
                        <p
                            style={{
                                fontWeight: 500,
                                fontSize: "1rem",
                                color: "#1f2937",
                                marginBottom: "0.5rem",
                            }}
                        >
                            리스크 허용 수준
                        </p>

                        {/* 실시간 퍼센트 표시 */}
                        <div
                            style={{
                                position: "absolute",
                                right: 0,
                                top: "-0.2rem",
                                backgroundColor: "#f3f4f6",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "0.5rem",
                                fontWeight: 600,
                                fontSize: "0.9rem",
                                color: "#111827",
                            }}
                        >
                            {riskLevel}%
                        </div>

                        {/* 슬라이더 바 */}
                        <div style={{ position: "relative", width: "100%" }}>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={riskLevel}
                                onChange={(e) => setRiskLevel(Number(e.target.value))}
                                style={{
                                    width: "100%",
                                    height: "10px",
                                    borderRadius: "5px",
                                    background: sliderBackground,
                                    outline: "none",
                                    appearance: "none",
                                    cursor: "pointer",
                                }}
                            />

                            {/* 토글 버튼 스타일 */}
                            <style jsx>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: white;
                border: 2px solid ${darkGray};
                cursor: grab;
                margin-top: -5px;
              }
            `}</style>
                        </div>

                        {/* 보수적 ~ 중립적 ~ 공격적 */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginTop: "0.5rem",
                            }}
                        >
                            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>보수적</span>
                            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>중립적</span>
                            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>공격적</span>
                        </div>
                    </div>

                    {/* -------------------- 최적 포트폴리오 추천 -------------------- */}
                    <div
                        style={{
                            marginTop: "1.5rem",
                            backgroundColor: "#E9EFF2",
                            borderRadius: "0.75rem",
                            padding: "1rem 1.25rem",
                            border: "1px solid #cbd5e1",
                        }}
                    >
                        <p
                            style={{
                                fontWeight: 600,
                                color: "#111827",
                                marginBottom: "0.5rem",
                            }}
                        >
                            최적 포트폴리오 추천
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                            }}
                        >
                            <div>
                                <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>
                                    예상 리스크
                                </p>
                                <p
                                    style={{
                                        color: "#BF092F",
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        margin: "0.25rem 0 0 0",
                                    }}
                                >
                                    {expectedRisk}%
                                </p>
                            </div>
                            <div>
                                <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: 0 }}>
                                    기대 수익률
                                </p>
                                <p
                                    style={{
                                        color: "#3B9797",
                                        fontSize: "1.5rem",
                                        fontWeight: 700,
                                        margin: "0.25rem 0 0 0",
                                    }}
                                >
                                    {expectedReturn}%
                                </p>
                            </div>
                        </div>

                        <p
                            style={{
                                fontSize: "0.85rem",
                                color: "#374151",
                                marginTop: "0.75rem",
                            }}
                        >
                            설정하신 리스크 허용도를 기반으로 최적의 포트폴리오를 추천합니다. 이
                            포트폴리오는 효율적 프론티어 상에서 가장 적합한 위치에 있습니다.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
