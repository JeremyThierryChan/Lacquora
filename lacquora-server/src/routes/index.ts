import { Router } from 'express'
import { listProducts, getProduct, getFeaturedProducts } from '../controllers/productController'
import { listGallery, getGalleryItem } from '../controllers/galleryController'
import { listPosts, getPost } from '../controllers/journalController'
import { createOrder } from '../controllers/customOrderController'
import { createInquiry } from '../controllers/inquiryController'
import { submissionLimiter } from '../middleware/rateLimiter'

const router = Router()

// ── Products ──────────────────────────────────────────────────
router.get('/products',          listProducts)
router.get('/products/featured', getFeaturedProducts)
router.get('/products/:id',      getProduct)

// ── Gallery ───────────────────────────────────────────────────
router.get('/gallery',     listGallery)
router.get('/gallery/:id', getGalleryItem)

// ── Journal ───────────────────────────────────────────────────
router.get('/journal',       listPosts)
router.get('/journal/:slug', getPost)

// ── Custom Orders ─────────────────────────────────────────────
router.post('/custom-orders', submissionLimiter, createOrder)

// ── Inquiries ─────────────────────────────────────────────────
router.post('/inquiries', submissionLimiter, createInquiry)

export default router
