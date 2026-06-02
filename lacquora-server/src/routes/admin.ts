import { Router } from 'express'
import { authenticate, requireRole } from '../middleware/auth'
import { authLimiter } from '../middleware/rateLimiter'
import { login, me } from '../controllers/authController'
import {
  listProducts, createProduct, updateProduct, deleteProduct,
} from '../controllers/productController'
import { listGallery } from '../controllers/galleryController'
import { listOrders, getOrder, updateOrder } from '../controllers/customOrderController'
import { listInquiries, updateInquiry } from '../controllers/inquiryController'

const router = Router()

// ── Auth (public) ──────────────────────────────────────────────
router.post('/auth/login', authLimiter, login)
router.get('/auth/me', authenticate, me)

// All routes below require authentication
router.use(authenticate)

// ── Products (admin + editor) ──────────────────────────────────
router.get('/products',       listProducts)
router.post('/products',      requireRole('admin','editor'), createProduct)
router.put('/products/:id',   requireRole('admin','editor'), updateProduct)
router.delete('/products/:id',requireRole('admin'),          deleteProduct)

// ── Gallery (admin + editor) ───────────────────────────────────
router.get('/gallery', listGallery)

// ── Custom Orders ──────────────────────────────────────────────
router.get('/custom-orders',     listOrders)
router.get('/custom-orders/:id', getOrder)
router.put('/custom-orders/:id', requireRole('admin','editor'), updateOrder)

// ── Inquiries ──────────────────────────────────────────────────
router.get('/inquiries',     listInquiries)
router.put('/inquiries/:id', requireRole('admin','editor'), updateInquiry)

export default router
