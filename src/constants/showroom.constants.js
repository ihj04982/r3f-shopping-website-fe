// 파츠별 Matcap 팔레트 정의 (로컬 파일 사용)
export const PART_MATCAP_PALETTES = {
    base: [
        {
            id: "silver",
            name: "Silver Metal",
            matcapUrl: "/models/matcap/silver.png",
            previewColor: "#C0C0C0",
        },
        {
            id: "gold",
            name: "Gold Metal",
            matcapUrl: "/models/matcap/gold.png",
            previewColor: "#FFD700",
        },
    ],
    lense: [
        {
            id: "clear",
            name: "Clear Glass",
            color: "#FFFFFF",
            previewColor: "#F0F0F0",
        },
        {
            id: "dark",
            name: "Dark Glass",
            color: "#2C2C2C",
            previewColor: "#4A4A4A",
        },
    ],
    gem: [
        {
            id: "pearl",
            name: "Pearl Gem",
            matcapUrl: "/models/matcap/pink_pearl.png",
            previewColor: "#F8E6E7",
        },
        {
            id: "skyblue",
            name: "Skyblue Gem",
            matcapUrl: "/models/matcap/skyblue.png",
            previewColor: "#B9F2FF",
        },
        {
            id: "diamond",
            name: "Diamond Gem",
            matcapUrl: "/models/matcap/diamond.png",
            previewColor: "#D4D4D4",
        },
    ],
    tip: [
        {
            id: "black",
            name: "Matte Black",
            matcapUrl: "/models/matcap/black.png",
            previewColor: "#2C2C2C",
        },
        {
            id: "pink",
            name: "Pearl Pink",
            matcapUrl: "/models/matcap/pink_pearl.png",
            previewColor: "#F5E6E7",
        },
    ],
};

// 파츠 이름 매칭 패턴
export const PART_PATTERNS = {
    base: ["base", "torus"],
    lense: ["lense", "uploads_files_2761601_glasses002_1"],
    gem: ["gem"],
    tip: ["tip"],
};

// 기본 파츠 순서 (UI 표시용)
export const PART_ORDER = ["base", "lense", "gem", "tip"];

// 파츠별 기본값 (각 팔레트의 0번째 항목)
export const DEFAULT_PART_COLORS = {
    base: PART_MATCAP_PALETTES.base[0]?.id || "silver", // Silver Metal
    lense: PART_MATCAP_PALETTES.lense[0]?.id || "clear", // Clear Glass
    gem: PART_MATCAP_PALETTES.gem[0]?.id || "pearl", // Pearl Gem
    tip: PART_MATCAP_PALETTES.tip[0]?.id || "black", // Matte Black
};
