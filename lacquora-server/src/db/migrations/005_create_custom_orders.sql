-- Migration 005: Custom orders
CREATE TYPE order_status AS ENUM (
  'pending','reviewing','quoted','confirmed','in_progress','delivered','cancelled'
);
CREATE TYPE body_shape_type AS ENUM (
  'strat','tele','super_strat','flying_v','explorer','headless','custom'
);
CREATE TYPE wood_material_type AS ENUM ('alder','ash','mahogany','walnut','maple');
CREATE TYPE craft_option_type  AS ENUM (
  'standard','lacquer','gold_carving','mother_of_pearl','urushi','custom_artwork'
);

CREATE TABLE IF NOT EXISTS custom_orders (
  id                SERIAL PRIMARY KEY,
  reference_no      VARCHAR(20)         NOT NULL UNIQUE,
  status            order_status        NOT NULL DEFAULT 'pending',

  -- Instrument specification
  body_shape        body_shape_type     NOT NULL,
  wood_material     wood_material_type  NOT NULL,
  craft_type        craft_option_type   NOT NULL,
  hardware_config   JSONB               NOT NULL DEFAULT '{}',
  reference_images  TEXT[]              NOT NULL DEFAULT '{}',
  notes             TEXT,

  -- Customer info
  customer_name     VARCHAR(255)        NOT NULL,
  customer_email    VARCHAR(255)        NOT NULL,
  customer_phone    VARCHAR(50),
  customer_country  VARCHAR(100)        NOT NULL,

  -- Admin fields
  quoted_price      INTEGER,            -- CNY cents
  quoted_lead_time  INTEGER,            -- days
  admin_notes       TEXT,
  pdf_url           TEXT,               -- generated PDF path
  assigned_to       UUID                REFERENCES users(id) ON DELETE SET NULL,

  created_at        TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_custom_orders_status       ON custom_orders(status);
CREATE INDEX idx_custom_orders_email        ON custom_orders(customer_email);
CREATE INDEX idx_custom_orders_reference_no ON custom_orders(reference_no);
CREATE INDEX idx_custom_orders_created_at   ON custom_orders(created_at DESC);

CREATE TRIGGER custom_orders_updated_at
  BEFORE UPDATE ON custom_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
