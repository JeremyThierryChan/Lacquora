-- Migration 008: Seed data (development only)

-- Default admin user (password: Admin@Lacquora2026)
INSERT INTO users (email, password_hash, name, role) VALUES
  ('admin@lacquora.com',
   '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/pq8x.Dz9.',
   'LACQUORA Admin',
   'admin')
ON CONFLICT (email) DO NOTHING;

-- Sample products
INSERT INTO products (sku, series, title_zh, title_en, subtitle, craft_type, price_min, price_max, lead_time_days, featured, status) VALUES
  ('LQ-QJ-001', 'lacquer', '戗金弦月', 'Qian Jin — Crescent Moon',
   'Gold thread on Deep Burgundy Urushi', 'qian_jin', 8800000, 12000000, 150, true, 'published'),
  ('LQ-MP-002', 'lacquer', '螺钿海浪', 'Mother of Pearl — Ocean Wave',
   'Abalone inlay on Midnight Black Urushi', 'mother_of_pearl', 9500000, 13500000, 180, true, 'published'),
  ('LQ-UR-003', 'lacquer', '大漆素黑', 'Urushi — Void Black',
   '80-layer pure urushi, mirror polish', 'urushi', 6800000, 9800000, 120, false, 'published'),
  ('LQ-ME-004', 'lacquer', '莳绘松鹤', 'Maki-e — Pine & Crane',
   'Gold & silver powder on Crimson Red', 'maki_e', 12800000, 18000000, 210, true, 'sold'),
  ('FT-GY-001', 'future', '拓扑一号', 'Gyroid I',
   'Gyroid lattice body · Carbon-PLA · Semi-hollow', '3d_print', 2800000, 4500000, 45, true, 'published'),
  ('FT-VD-002', 'future', '虚形', 'Void Form',
   'Parametric hollow body · Multi-material · Headless', '3d_print', 3200000, 5500000, 60, false, 'published'),
  ('MB-001', 'master', '朱龙', 'Vermilion Dragon',
   'Maki-e + Qian Jin · Alder body · Ebony board', 'maki_e', 18000000, 30000000, 365, true, 'sold')
ON CONFLICT (sku) DO NOTHING;

-- Sample gallery items
INSERT INTO gallery_items (title, category, craft, image_url, aspect, is_featured, sort_order) VALUES
  ('Qian Jin No. 3',       'lacquer',   '戗金',    'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800', 'tall',  true,  1),
  ('Future Void I',        'future',    '3D Print','https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 'short', false, 2),
  ('Urushi Midnight',      'lacquer',   '大漆',    'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800', 'short', false, 3),
  ('Master One — Vermilion','master',   '莳绘',    'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800', 'tall',  true,  4),
  ('Workshop — Detail',    'lifestyle', NULL,      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800', 'short', false, 5),
  ('Mother of Pearl Wave', 'lacquer',   '螺钿',    'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800', 'tall',  false, 6)
ON CONFLICT DO NOTHING;
