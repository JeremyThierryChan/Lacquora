-- Migration 004: Gallery items
CREATE TYPE gallery_category AS ENUM ('lacquer','future','master','lifestyle');

CREATE TABLE IF NOT EXISTS gallery_items (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER          REFERENCES products(id) ON DELETE SET NULL,
  title       VARCHAR(255)     NOT NULL,
  category    gallery_category NOT NULL,
  craft       VARCHAR(100),
  image_url   TEXT             NOT NULL,
  video_url   TEXT,
  width       INTEGER,
  height      INTEGER,
  aspect      VARCHAR(20)      NOT NULL DEFAULT 'short' CHECK (aspect IN ('short','tall')),
  is_featured BOOLEAN          NOT NULL DEFAULT false,
  sort_order  INTEGER          NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gallery_category   ON gallery_items(category);
CREATE INDEX idx_gallery_featured   ON gallery_items(is_featured) WHERE is_featured = true;
CREATE INDEX idx_gallery_sort       ON gallery_items(sort_order);

CREATE TRIGGER gallery_items_updated_at
  BEFORE UPDATE ON gallery_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
