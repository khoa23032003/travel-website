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

const places = [
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

const islands = [
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

const archipelagos = ["Hoàng Sa", "Trường Sa"] as const;

const MAJOR_CITIES = [
  "Hà Nội",
  "Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
];

const FALLBACK_IMAGE_POOL = [
  "https://images.unsplash.com/photo-1528127269322-539801943592?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508873696983-2df519f0397d?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543633512-4217117da3f1?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605538032432-a9f0c8d9baac?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616483441618-93a8d1162635?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579911364506-699748b61c9e?w=1000&auto=format&fit=crop",
];

const DELAY_MS = 2500;
const OUTPUT_FILE = path.join(process.cwd(), "data", "destinations.json");

const usedImages = new Set<string>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidImage(url: string | undefined): boolean {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return !(
    lowerUrl.endsWith(".svg") ||
    lowerUrl.endsWith(".png") ||
    lowerUrl.includes("map") ||
    lowerUrl.includes("emblem") ||
    lowerUrl.includes("logo") ||
    lowerUrl.includes("coat_of_arms")
  );
}

function getUniqueFallbackImage(slug: string): string {
  const availableImage = FALLBACK_IMAGE_POOL.find(
    (img) => !usedImages.has(img),
  );

  if (availableImage) {
    usedImages.add(availableImage);
    return availableImage;
  }

  return `https://picsum.photos/seed/${slug}/1000/667`;
}

function getClassification(name: string, kind: PlaceKind): PlaceClassification {
  if (kind === "province") {
    return MAJOR_CITIES.includes(name) ? "major-city" : "standard-province";
  }
  return kind;
}

// CẢI TIẾN: Xử lý triệt để chữ đ/Đ trước khi chuẩn hóa NFD xóa dấu tiếng Việt
function createSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toWikipediaTitle(place: string, kind: PlaceKind) {
  if (place === "Hồ Chí Minh") return "Thành_phố_Hồ_Chí_Minh";
  if (place === "Thừa Thiên Huế") return "Thừa_Thien_Huế";
  if (place === "Bà Rịa - Vũng Tàu") return "Bà_Rịa_-_Vũng_Tàu";
  if (place === "Cù Lao Chàm") return "Cù_Lao_Chàm";
  if (place === "Hoàng Sa") return "Hoàng_Sa";
  if (place === "Trường Sa") return "Trường_Sa";
  return place.replace(/\s+/g, "_").replace(/-/g, "_");
}

function buildCandidates(place: string, kind: PlaceKind) {
  const exact = toWikipediaTitle(place, kind);
  const candidates = [exact];
  if (kind === "province") {
    candidates.push(`Tỉnh_${exact}`);
    candidates.push(`Thành_phố_${exact}`);
  }
  if (place === "Hồ Chí Minh") candidates.push("Thành_phố_Hồ_Chí_Minh");
  return Array.from(new Set(candidates));
}

function parseJsonSafe(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function fetchWikipediaSummary(title: string) {
  const url = `https://vi.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "VietnamExplorer/2.0 (educational project)",
      Accept: "application/json",
    },
  });
  const text = await res.text();
  if (text.includes("You are making too many requests")) {
    return { blocked: true as const, data: null };
  }
  return { blocked: false as const, data: parseJsonSafe(text) };
}

async function fetchFallbackWikipediaImage(title: string): Promise<string> {
  try {
    const url = `https://vi.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=1000&titles=${encodeURIComponent(title)}&origin=*`;
    const res = await fetch(url, {
      headers: { "User-Agent": "VietnamExplorer/2.0 (educational project)" },
    });
    const data = await res.json();
    const pages = data?.query?.pages;
    if (pages) {
      const pageId = Object.keys(pages)[0];
      const source = pages[pageId]?.thumbnail?.source;
      if (isValidImage(source)) return source;
    }
  } catch (err) {
    console.error(`⚠️  Lỗi truy vấn ảnh sâu cho tiêu đề: ${title}`);
  }
  return "";
}

function buildSeoDescription(
  name: string,
  kind: PlaceKind,
  description: string,
) {
  const typeText =
    kind === "province" ? "tỉnh thành" : kind === "island" ? "đảo" : "quần đảo";
  const base =
    description?.trim() || `${name} là một ${typeText} nổi bật của Việt Nam.`;
  return base.length > 160 ? base.slice(0, 157) + "..." : base;
}

async function getPlace(place: string, kind: PlaceKind): Promise<SeedItem> {
  const slug = createSlug(place);
  const wikipediaCandidates = buildCandidates(place, kind);
  const classification = getClassification(place, kind);

  let isApiBlocked = false;

  for (const candidate of wikipediaCandidates) {
    const result = await fetchWikipediaSummary(candidate);
    if (result.blocked) {
      isApiBlocked = true;
      break;
    }

    const data = result.data;
    if (!data) continue;

    const title = data.title || place;
    // CẢI TIẾN: Format sạch chuỗi mô tả, xóa bỏ các ký tự xuống dòng (\n) gây lỗi format JSON/Layout
    const extract = data.extract ? data.extract.replace(/\n/g, " ").trim() : "";
    const wikiUrl = data.content_urls?.desktop?.page || "";
    let image = data.thumbnail?.source || "";

    if (!isValidImage(image)) {
      image = "";
    }

    if (!image && candidate) {
      console.log(`🔍 Tìm ảnh chất lượng cao cho: ${candidate}...`);
      image = await fetchFallbackWikipediaImage(candidate);
    }

    let isImageFallbackUsed = false;
    if (!image) {
      image = getUniqueFallbackImage(slug);
      isImageFallbackUsed = true;
    }

    if (title && (extract || image || wikiUrl)) {
      return {
        id: slug,
        slug,
        name: place,
        kind,
        classification,
        wikipediaTitle: candidate,
        description: extract,
        image,
        wikipediaUrl: wikiUrl,
        seoTitle: `${place} | Vietnam Explorer`,
        seoDescription: buildSeoDescription(place, kind, extract),
        keywords: [
          place,
          `${place} du lịch`,
          `${place} Việt Nam`,
          kind === "province"
            ? `${place} tỉnh`
            : kind === "island"
              ? `${place} đảo`
              : `${place} quần đảo`,
        ],
        featured: false,
        source: isImageFallbackUsed ? "fallback" : "wikipedia", // Ghi rõ nếu ảnh phải dùng fallback
      };
    }
  }

  // Tự động tăng thời gian giãn cách nếu phát hiện có dấu hiệu bị Rate Limit
  if (isApiBlocked) {
    console.warn(
      `🚨 Cảnh báo: Wikipedia có thể đã chặn hoặc giới hạn Request (Rate Limit).`,
    );
  }

  return {
    id: slug,
    slug,
    name: place,
    kind,
    classification,
    wikipediaTitle: wikipediaCandidates[0],
    description: "",
    image: getUniqueFallbackImage(slug),
    wikipediaUrl: "",
    seoTitle: `${place} | Vietnam Explorer`,
    seoDescription: `${place} là một điểm đến trong hệ thống dữ liệu Vietnam Explorer.`,
    keywords: [place, `${place} du lịch`, `${place} Việt Nam`],
    featured: false,
    source: "fallback",
  };
}

async function seed() {
  console.log("🚀 Seed started...\n");

  const allPlaces: Array<{ name: string; kind: PlaceKind }> = [
    ...places.map((name) => ({ name, kind: "province" as const })),
    ...islands.map((name) => ({ name, kind: "island" as const })),
    ...archipelagos.map((name) => ({ name, kind: "archipelago" as const })),
  ];

  const destinations: SeedItem[] = [];

  for (const item of allPlaces) {
    console.log(`📍 Fetching: ${item.name}`);

    try {
      const data = await getPlace(item.name, item.kind);
      destinations.push(data);

      // CẢI TIẾN: Log chi tiết trạng thái để dễ kiểm soát tiến trình cào data
      if (data.source === "wikipedia") {
        console.log(`✅ Success [${data.classification}]: ${item.name}`);
      } else {
        console.log(
          `⚠️ Fallback used [${data.classification}]: ${item.name} (Ảnh/Dữ liệu từ Pool dự phòng)`,
        );
      }
    } catch (error) {
      console.error(`❌ Failed hard: ${item.name}`);
      const slug = createSlug(item.name);

      destinations.push({
        id: slug,
        slug,
        name: item.name,
        kind: item.kind,
        classification: getClassification(item.name, item.kind),
        wikipediaTitle: item.name,
        description: "",
        image: getUniqueFallbackImage(slug),
        wikipediaUrl: "",
        seoTitle: `${item.name} | Vietnam Explorer`,
        seoDescription: `${item.name} là một điểm đến...`,
        keywords: [item.name, `${item.name} du lịch`, `${item.name} Việt Nam`],
        featured: false,
        source: "fallback",
      });
    }

    await sleep(DELAY_MS);
  }

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(destinations, null, 2), "utf8");

  console.log("\n🎉 Done!");
  console.log(`📄 Saved ${destinations.length} destinations`);
  console.log(`📁 File: ${OUTPUT_FILE}`);
}

seed().catch((error) => {
  console.error("❌ Seed crashed:", error);
  process.exit(1);
});
