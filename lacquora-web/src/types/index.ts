// ─── Product ───────────────────────────────────────────
export type ProductSeries = 'lacquer' | 'future' | 'master'
export type ProductStatus = 'draft' | 'published' | 'sold'
export type CraftType =
  | 'qian_jin'
  | 'mother_of_pearl'
  | 'urushi'
  | 'maki_e'
  | '3d_print'
  | 'standard'

export interface ProductImage {
  id: number
  url: string
  alt: string
  sortOrder: number
  isCover: boolean
}

export interface Product {
  id: number
  sku: string
  series: ProductSeries
  titleZh: string
  titleEn: string
  subtitle: string
  descriptionZh: string
  descriptionEn: string
  priceMin: number
  priceMax: number
  leadTimeDays: number
  status: ProductStatus
  featured: boolean
  images: ProductImage[]
  craftType?: CraftType
  createdAt: string
  updatedAt: string
}

// ─── Gallery ───────────────────────────────────────────
export type GalleryCategory = 'all' | 'lacquer' | 'future' | 'master' | 'lifestyle'

export interface GalleryItem {
  id: number
  productId?: number
  title: string
  category: GalleryCategory
  imageUrl: string
  videoUrl?: string
  isFeatured: boolean
  sortOrder: number
  width?: number
  height?: number
}

// ─── Custom Order ──────────────────────────────────────
export type BodyShape =
  | 'strat'
  | 'tele'
  | 'super_strat'
  | 'flying_v'
  | 'explorer'
  | 'headless'
  | 'custom'

export type WoodMaterial = 'alder' | 'ash' | 'mahogany' | 'walnut' | 'maple'

export type CraftOption =
  | 'standard'
  | 'lacquer'
  | 'gold_carving'
  | 'mother_of_pearl'
  | 'urushi'
  | 'custom_artwork'

export type OrderStatus =
  | 'pending'
  | 'reviewing'
  | 'quoted'
  | 'confirmed'
  | 'in_progress'
  | 'delivered'

export interface HardwareConfig {
  bridge: string
  pickups: string
  neck: string
  fretboard: string
}

export interface CustomOrder {
  id?: number
  referenceNo?: string
  status?: OrderStatus
  bodyShape: BodyShape
  woodMaterial: WoodMaterial
  craftType: CraftOption
  hardwareConfig: HardwareConfig
  referenceImages: string[]
  notes: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerCountry: string
}

// ─── Journal ───────────────────────────────────────────
export type JournalCategory =
  | 'guitar_knowledge'
  | 'lacquer_art'
  | '3d_printing'
  | 'artist_stories'
  | 'brand_news'

export interface JournalPost {
  id: number
  slug: string
  category: JournalCategory
  titleZh: string
  titleEn: string
  contentZh: string
  contentEn: string
  coverImage: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  publishedAt: string
  status: 'draft' | 'published'
}

// ─── Inquiry ───────────────────────────────────────────
export type InquiryType = 'general' | 'custom' | 'enterprise' | 'press'

export interface Inquiry {
  type: InquiryType
  name: string
  email: string
  phone?: string
  country: string
  message: string
}

// ─── API ───────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  meta?: {
    total: number
    page: number
    pageSize: number
    pageCount: number
  }
}

export interface ApiError {
  status: number
  message: string
  details?: Record<string, string[]>
}

// ─── UI ────────────────────────────────────────────────
export type Locale = 'zh' | 'en' | 'fr' | 'de' | 'ja'

export interface NavItem {
  label: string
  path: string
  children?: NavItem[]
}

export interface SeoMeta {
  title: string
  description: string
  image?: string
  type?: string
}
