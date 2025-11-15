import React, { useState } from "react";

// --- 1. Naver News API 응답을 위한 타입 정의 ---
interface NewsItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

export default function DataCollect() {
    // --- 기존 State ---
    const [searchTerm, setSearchTerm] = useState("");

    // --- 2. 뉴스 검색 결과를 위한 State 추가 ---
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // --- 3. handleSearch 함수를 API 호출 로직으로 수정 ---
    const handleSearch = async () => {
        // 검색어가 없으면 실행하지 않음
        if (!searchTerm.trim()) {
            alert("검색어를 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setNewsItems([]); // 새 검색 시작 시 이전 결과 초기화

        try {
            // Flask 서버의 /search-news 엔드포인트 호출
            const response = await fetch(`http://127.0.0.1:5000/search-news?query=${encodeURIComponent(searchTerm)}`);


            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Flask 백엔드에서 보낸 에러 처리
            if (data.error) {
                throw new Error(data.error);
            }

            // Naver API에서 보낸 에러 처리 (예: 쿼리 오류)
            if (data.errorCode) {
                throw new Error(`Naver API Error: ${data.errorMessage}`);
            }

            setNewsItems(data.items || []);

        } catch (e: any) {
            console.error('Error fetching news:', e);
            setError(e.message || "뉴스 검색 중 알 수 없는 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 하드코딩된 주식 데이터 배열 (기존 코드)
    const stockData = [
        { code: "005930", name: "삼성전자", price: "71,200원", change: "+1.2%", changeColor: "red" },
        { code: "000660", name: "SK하이닉스", price: "129,500원", change: "-0.8%", changeColor: "blue" },
        { code: "035720", name: "카카오", price: "48,500원", change: "+2.3%", changeColor: "red" },
        { code: "035420", name: "NAVER", price: "195,000원", change: "+0.5%", changeColor: "red" },
        { code: "051910", name: "LG화학", price: "385,000원", change: "+1.7%", changeColor: "red" },
    ];

    return (
        <div>
            {/* --- 데이터 수집 섹션 (기존과 동일) --- */}
            <section
                style={{
                    border: "1px solid #cbd5e1",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                    width: "100%",
                    backgroundColor: "white",
                    boxSizing: "border-box",
                }}
            >
                {/* (h2, p 태그 등 동일...) */}
                <h2 style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "#0f172a",
                }}>
                    네이버 금융 데이터 수집
                </h2>
                <p style={{
                    fontSize: "0.9rem",
                    color: "#64748b",
                    marginBottom: "1rem",
                }}>
                    종목 코드 또는 종목명을 검색하여 데이터를 수집하세요
                </p>

                <div style={{ display: "flex", gap: "0.5rem", width: "100%" }}>
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
                        // 엔터 키로도 검색 실행
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    {/* 검색 */}
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
                        type="button"
                        disabled={isLoading} // 로딩 중 버튼 비활성화
                    >
                        {isLoading ? "검색 중..." : "검색"}
                    </button>
                    {/* 수집 */}
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
                        type="button"
                        disabled={isLoading} // 로딩 중 버튼 비활성화
                    >
                        {"수집"}
                    </button>
                </div>
            </section>

            {/* --- 4. 뉴스 검색 결과 표시 섹션 (★신규 추가★) --- */}
            {/* 로딩, 에러, 또는 검색 결과가 있을 때만 이 섹션을 표시 */}
            {(isLoading || error || newsItems.length > 0) && (
                <section
                    style={{
                        border: "1px solid #cbd5e1",
                        borderRadius: "0.5rem",
                        padding: "1rem",
                        marginTop: "1.5rem", // 위 섹션과의 간격
                        width: "100%",
                        backgroundColor: "white",
                        boxSizing: "border-box",
                    }}
                >
                    <h3
                        style={{
                            fontWeight: 600,
                            marginBottom: "1rem", // 제목과 내용 간격
                            color: "#0f172a",
                        }}
                    >
                        '{searchTerm}' 관련 뉴스
                    </h3>

                    {/* 로딩 중일 때 */}
                    {isLoading && <p>뉴스를 불러오는 중입니다...</p>}

                    {/* 에러 발생 시 */}
                    {error && <p style={{ color: "red", fontWeight: 600 }}>{error}</p>}

                    {/* 결과 표시 (로딩X, 에러X, 아이템 1개 이상) */}
                    {!isLoading && !error && newsItems.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            {newsItems.map((item, index) => (
                                <div key={index} style={{ borderBottom: "1px solid #f1f5f9", paddingBottom: "0.75rem" }}>
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            textDecoration: "none",
                                            color: "#1e3a8a", // 링크 색상
                                            fontWeight: 600,
                                            fontSize: "0.95rem"
                                        }}
                                        // Naver API가 <b> 태그를 포함하므로 HTML로 렌더링
                                        dangerouslySetInnerHTML={{ __html: item.title }}
                                    />
                                    <p
                                        style={{
                                            fontSize: "0.85rem",
                                            color: "#475569",
                                            marginTop: "0.25rem",
                                            // 긴 설명 자르기
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical"
                                        }}
                                        // 설명에도 <b> 태그가 있을 수 있음
                                        dangerouslySetInnerHTML={{ __html: item.description }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 결과가 없을 때 (로딩X, 에러X, 아이템 0개) */}
                    {!isLoading && !error && newsItems.length === 0 && (
                        <p>'{searchTerm}'에 대한 검색 결과가 없습니다.</p>
                    )}
                </section>
            )}

            {/* --- 수집된 주식 데이터 섹션 (기존과 동일) --- */}
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