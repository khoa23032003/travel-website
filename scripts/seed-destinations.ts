import fs from "fs";
import path from "path";

type PlaceKind = "province" | "island" | "archipelago";

type PlaceClassification =
  | "major-city"
  | "standard-province"
  | "island"
  | "archipelago";

type SeedItem = {
  id: string;
  slug: string;
  name: string;
  kind: PlaceKind;
  classification: PlaceClassification;
  lat: number | null;
  lon: number | null;
  wikipediaTitle: string;
  description: string;
  image: string;
  wikipediaUrl: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  featured: boolean;
  source: "wikipedia" | "fallback";
};

const PLACES = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bắc Giang",
  "Bắc Kạn",
  "Bạc Liêu",
  "Bắc Ninh",
  "Bến Tre",
  "Bình Định",
  "Bình Dương",
  "Bình Phước",
  "Bình Thuận",
  "Cà Mau",
  "Cao Bằng",
  "Đắk Lắk",
  "Đắk Nông",
  "Điện Biên",
  "Đồng Nai",
  "Đồng Tháp",
  "Gia Lai",
  "Hà Giang",
  "Hà Nam",
  "Hà Tĩnh",
  "Hải Dương",
  "Hậu Giang",
  "Hòa Bình",
  "Hưng Yên",
  "Khánh Hòa",
  "Kiên Giang",
  "Kon Tum",
  "Lai Châu",
  "Lâm Đồng",
  "Lạng Sơn",
  "Lào Cai",
  "Long An",
  "Nam Định",
  "Nghệ An",
  "Ninh Bình",
  "Ninh Thuận",
  "Phú Thọ",
  "Phú Yên",
  "Quảng Bình",
  "Quảng Nam",
  "Quảng Ngãi",
  "Quảng Ninh",
  "Quảng Trị",
  "Sóc Trăng",
  "Sơn La",
  "Tây Ninh",
  "Thái Bình",
  "Thái Nguyên",
  "Thanh Hóa",
  "Thừa Thiên Huế",
  "Tiền Giang",
  "Trà Vinh",
  "Tuyên Quang",
  "Vĩnh Long",
  "Vĩnh Phúc",
  "Yên Bái",
] as const;

const ISLANDS = [
  "Phú Quốc",
  "Côn Đảo",
  "Lý Sơn",
  "Cát Bà",
  "Cù Lao Chàm",
  "Bình Ba",
  "Bình Hưng",
  "Nam Du",
  "Hòn Sơn",
  "Điệp Sơn",
] as const;

const ARCHIPELAGOS = ["Hoàng Sa", "Trường Sa"] as const;

const MAJOR_CITIES = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
];

const DELAY_MS = 2000;
const OUTPUT_FILE = path.join(process.cwd(), "data", "destinations.json");

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const createSlug = (text: string) =>
  text
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const getClassification = (
  name: string,
  kind: PlaceKind,
): PlaceClassification => {
  if (kind === "province") {
    return MAJOR_CITIES.includes(name) ? "major-city" : "standard-province";
  }
  return kind;
};

// Mở rộng bộ lọc ảnh chuẩn để loại bỏ triệt để sơ đồ, bản đồ hành chính, quốc kỳ, huy hiệu bằng cả tiếng Anh và tiếng Việt
const isValidImage = (url?: string) => {
  if (!url) return false;
  const l = url.toLowerCase();
  return !(
    l.endsWith(".svg") ||
    l.includes("map") ||
    l.includes("ban_do") ||
    l.includes("bando") ||
    l.includes("vi_tri") ||
    l.includes("emblem") ||
    l.includes("quoc_huy") ||
    l.includes("huy_hieu") ||
    l.includes("logo") ||
    l.includes("bieu_trung") ||
    l.includes("coat_of_arms") ||
    l.includes("coa") ||
    l.includes("flag") ||
    l.includes("quoc_ky") ||
    l.includes("co_hieu")
  );
};

function getWikiCandidates(place: string, kind: PlaceKind): string[] {
  if (place === "Hồ Chí Minh") return ["Thành_phố_Hồ_Chí_Minh"];
  if (place === "Thừa Thiên Huế")
    return ["Thừa_Thiên_Huế", "Tỉnh_Thừa_Thiên_Huế"];

  const base = place.replace(/\s+/g, "_").replace(/-/g, "_");
  if (kind === "province") return [base, `Tỉnh_${base}`, `Thành_phố_${base}`];
  if (kind === "island") return [base, `Đảo_${base}`, `Huyện_đảo_${base}`];
  if (kind === "archipelago") return [base, `Quần_đảo_${base}`];
  return [base];
}

async function fetchWikiSummary(title: string) {
  try {
    const url = `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "VietnamExplorer/3.0" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

// Hàm mới: Đào sâu vào thư viện ảnh của bài viết để "cứu vớt" các ảnh thực tế phong cảnh
async function fetchWikiAlternativeImage(
  title: string,
): Promise<string | null> {
  try {
    const url = `https://vi.wikipedia.org/api/rest_v1/page/media-list/${encodeURIComponent(title)}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "VietnamExplorer/3.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();

    if (!data.items || !Array.isArray(data.items)) return null;

    for (const item of data.items) {
      // Chỉ lấy các file dạng ảnh hiển thị công khai và có dữ liệu cấu hình srcset
      if (item.type === "image" && item.srcset && item.srcset.length > 0) {
        // Lấy ảnh ở độ phân giải cao nhất (thường nằm ở cuối mảng srcset)
        const imgUrl = item.srcset[item.srcset.length - 1].src;
        // Wikipedia đôi khi trả về link dạng //upload.wikimedia... cần chuẩn hóa sang https:
        const fullUrl = imgUrl.startsWith("//") ? `https:${imgUrl}` : imgUrl;

        if (isValidImage(fullUrl)) {
          return fullUrl;
        }
      }
    }
    return null;
  } catch (err) {
    return null;
  }
}

async function getPlace(name: string, kind: PlaceKind): Promise<SeedItem> {
  const slug = createSlug(name);
  const candidates = getWikiCandidates(name, kind);
  const fallbackImage = `https://picsum.photos/seed/${slug}/1000/667`;

  for (const candidate of candidates) {
    const data = await fetchWikiSummary(candidate);
    if (!data || !data.title) continue;

    const extract = data.extract ? data.extract.replace(/\n/g, " ").trim() : "";
    let image = data.thumbnail?.source || "";

    // CẢI TIẾN: Nếu ảnh đại diện lỗi/hoặc bị loại bỏ do là bản đồ/quốc huy...
    if (!isValidImage(image)) {
      // Chạy đi tìm ảnh thay thế khác nằm ngay trong bài viết đó
      const altImage = await fetchWikiAlternativeImage(candidate);
      if (altImage) {
        image = altImage;
      } else {
        image = fallbackImage; // Đường lui cuối cùng nếu bài viết toàn chữ và bản đồ
      }
    }

    if (extract) {
      return {
        id: slug,
        slug,
        name,
        kind,
        classification: getClassification(name, kind),
        lat: data.coordinates?.lat || null,
        lon: data.coordinates?.lon || null,
        wikipediaTitle: candidate,
        description: extract,
        image,
        wikipediaUrl: data.content_urls?.desktop?.page || "",
        seoTitle: `${name} | Vietnam Explorer`,
        seoDescription:
          extract.length > 160 ? extract.slice(0, 157) + "..." : extract,
        keywords: [name, `${name} du lịch`, `${name} Việt Nam`],
        featured: false,
        source: image === fallbackImage ? "fallback" : "wikipedia",
      };
    }
  }

  return {
    id: slug,
    slug,
    name,
    kind,
    classification: getClassification(name, kind),
    lat: null,
    lon: null,
    wikipediaTitle: candidates[0],
    description: `${name} là một điểm đến tuyệt vời tại Việt Nam đang chờ bạn khám phá.`,
    image: fallbackImage,
    wikipediaUrl: "",
    seoTitle: `${name} | Vietnam Explorer`,
    seoDescription: `Khám phá vẻ đẹp của ${name} cùng hệ thống Vietnam Explorer.`,
    keywords: [name, `${name} du lịch`, `${name} Việt Nam`],
    featured: false,
    source: "fallback",
  };
}

async function seed() {
  console.log("🚀 Seed started...\n");

  const allPlaces = [
    ...PLACES.map((name) => ({ name, kind: "province" as const })),
    ...ISLANDS.map((name) => ({ name, kind: "island" as const })),
    ...ARCHIPELAGOS.map((name) => ({ name, kind: "archipelago" as const })),
  ];

  const destinations: SeedItem[] = [];

  for (const item of allPlaces) {
    console.log(`📍 Fetching: ${item.name}`);
    try {
      const data = await getPlace(item.name, item.kind);
      destinations.push(data);
      console.log(
        `  -> ${data.source === "wikipedia" ? "✅ Success" : "⚠️ Fallback"} (Lat: ${data.lat || "N/A"}, Lon: ${data.lon || "N/A"})`,
      );
    } catch (error) {
      console.error(`❌ Failed hard: ${item.name}`);
    }
    await sleep(DELAY_MS);
  }

  const dataDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(destinations, null, 2), "utf8");

  console.log("\n🎉 Done!");
  console.log(`📄 Saved ${destinations.length} destinations to ${OUTPUT_FILE}`);
}

seed().catch((error) => {
  console.error("❌ Seed crashed:", error);
  process.exit(1);
});
