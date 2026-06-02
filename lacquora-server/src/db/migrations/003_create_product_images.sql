-- Migration 003: Product images (one-to-many)
CREATE TABLE IF NOT EXISTS product_images (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER      NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT         NOT NULL,
  alt         VARCHAR(255) NOT NULL DEFAULT '',
  width       INTEGER,
  height      INTEGER,
  sort_order  INTEGER      NOT NULL DEFAULT 0,
  is_cover    BOOLEAN      NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_cover      ON product_images(product_id, is_cover) WHERE is_cover = true;
