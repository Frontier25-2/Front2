import React, { useState } from "react";

export default function DataCollect() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        alert(`검색어: ${searchTerm}`);
    };

    // 하드코딩된 주식 데이터 배열
    const stockData = [
        { code: "005930", name: "삼성전자", price: "71,200원", change: "+1.2%", changeColor: "red" },
        { code: "000660", name: "SK하이닉스", price: "129,500원", change: "-0.8%", changeColor: "blue" },
        { code: "035720", name: "카카오", price: "48,500원", change: "+2.3%", changeColor: "red" },
        { code: "035420", name: "NAVER", price: "195,000원", change: "+0.5%", changeColor: "red" },
        { code: "051910", name: "LG화학", price: "385,000원", change: "+1.7%", changeColor: "red" },
    ];

    return (
        <div>
            <section
                style={{
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    width: "100%",  // 부모 너비(상위 컴포넌트가 지정한 너비)를 모두 채웁니다.
                    backgroundColor: "white",
                    boxSizing: "border-box", // 패딩과 border를 포함해서 100% 너비 계산하도록
                }}
            >
                <h2
                    style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: "0.5rem",
                        color: "#0f172a",
                    }}
                >
                    네이버 금융 데이터 수집
                </h2>
                <p
                    style={{
                        fontSize: "0.9rem",
                        color: "#64748b",
                        marginBottom: "1rem",
                    }}
                >
                    종목 코드 또는 종목명을 검색하여 데이터를 수집하세요
                </p>

                <div
                    style={{
                        display: "flex",
                        gap: "0.5rem",
                        width: "100%",    // 부모인 section 가로 공간을 전부 사용
                    }}
                >
                    <input
                        type="text"
                        placeholder="종목 검색 (예: 삼성전자, 005930)"
                        value={searchTerm}
                        onChange={handleInputChange}
                        style={{
                            flexGrow: 1,       // flex: 1 효과로 남은 공간 모두 차지
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.375rem",
                            border: "1px solid #cbd5e1",
                            backgroundColor: "#F8FAFB",
                            fontSize: "1rem",
                            outlineColor: "#3b82f6",
                            transition: "outline-color 0.2s ease",
                            boxSizing: "border-box", // 입력 창 내부 패딩 포함해서 크기 계산
                        }}
                        onFocus={(e) => (e.currentTarget.style.outlineColor = "#0f172a")}
                        onBlur={(e) => (e.currentTarget.style.outlineColor = "transparent")}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            backgroundColor: "#16476A",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "0.375rem",
                            fontWeight: 600,
                            fontSize: "1rem",
                            cursor: "pointer",
                            border: "none",
                            transition: "background-color 0.3s ease",
                            flexShrink: 0,  // 버튼 크기 고정, 축소되지 않게
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1e40af")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                        type="button"
                    >
                        검색
                    </button>
                </div>
            </section>

            <section
                style={{
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    marginTop: "1.5rem",
                    width: "100%",  // 부모 너비(상위 컴포넌트가 지정한 너비)를 모두 채웁니다.
                    backgroundColor: "white",
                    boxSizing: "border-box", // 패딩과 border를 포함해서 100% 너비 계산하도록
                }}
            >
                {/* 하드코딩 주식 데이터 표 */}
                <div
                    style={{
                        paddingLeft: "0.5rem",
                        maxWidth: "100%",
                        overflowX: "auto", // 모바일 등 좁은 화면에서 가로스크롤 가능
                    }}
                >
                    <h3
                        style={{
                            fontWeight: 600,
                            marginBottom: "0.5rem",
                            color: "#0f172a",
                        }}
                    >
                        수집된 주식 데이터
                    </h3>
                    <p
                        style={{
                            fontSize: "0.875rem",
                            color: "#64748b",
                            marginBottom: "1rem",
                        }}
                    >
                        총 {stockData.length}개 종목
                    </p>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            textAlign: "left",
                            fontSize: "0.9rem",
                            color: "#334155",
                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ padding: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>종목코드</th>
                                <th style={{ padding: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>종목명</th>
                                <th style={{ padding: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>현재가</th>
                                <th style={{ padding: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>등락률</th>
                                <th style={{ padding: "0.5rem", borderBottom: "1px solid #e5e7eb", width: "40px" }}>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stockData.map(({ code, name, price, change, changeColor }) => (
                                <tr key={code} style={{ borderBottom: "1px solid #f1f5f9" }}>
                                    <td style={{ padding: "0.5rem" }}>{code}</td>
                                    <td style={{ padding: "0.5rem" }}>{name}</td>
                                    <td style={{ padding: "0.5rem" }}>{price}</td>
                                    <td
                                        style={{
                                            padding: "0.5rem",
                                            color: changeColor,
                                            fontWeight: "600",
                                        }}
                                    >
                                        {change}
                                    </td>
                                    <td style={{ padding: "0.5rem" }}>
                                        <button
                                            type="button"
                                            style={{
                                                background: "transparent",
                                                border: "none",
                                                color: "black",
                                                fontWeight: "bold",
                                                fontSize: "1.1rem",
                                                cursor: "pointer",
                                            }}
                                            aria-label={`종목 ${name} 삭제`}
                                            onClick={() => {
                                                // 삭제 기능은 아직 구현하지 않아요.
                                                alert(`삭제 기능은 아직 구현되지 않았습니다: ${name}`);
                                            }}
                                        >
                                            ×
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}