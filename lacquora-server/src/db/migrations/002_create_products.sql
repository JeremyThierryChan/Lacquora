-- Migration 002: Products table
CREATE TYPE product_series AS ENUM ('lacquer','future','master');
CREATE TYPE product_status AS ENUM ('draft','published','sold');
CREATE TYPE craft_type    AS ENUM ('qian_jin','mother_of_pearl','urushi','maki_e','3d_print','standard');

CREATE TABLE IF NOT EXISTS products (
  id              SERIAL PRIMARY KEY,
  sku             VARCHAR(50)     NOT NULL UNIQUE,
  series          product_series  NOT NULL,
  title_zh        VARCHAR(255)    NOT NULL,
  title_en        VARCHAR(255)    NOT NULL,
  subtitle        VARCHAR(500),
  description_zh  TEXT,
  description_en  TEXT,
  craft_type      craft_type,
  price_min       INTEGER         NOT NULL DEFAULT 0,  -- stored in CNY cents
  price_max       INTEGER         NOT NULL DEFAULT 0,
  lead_time_days  INTEGER         NOT NULL DEFAULT 90,
  weight_grams    INTEGER,
  featured        BOOLEAN         NOT NULL DEFAULT false,
  sort_order      INTEGER         NOT NULL DEFAULT 0,
  status          product_status  NOT NULL DEFAULT 'draft',
  seo_title       VARCHAR(255),
  seo_description VARCHAR(500),
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_series  ON products(series);
CREATE INDEX idx_products_status  ON products(status);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = true;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
