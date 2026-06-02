-- Migration 007: Contact inquiries
CREATE TYPE inquiry_type   AS ENUM ('general','custom','enterprise','press');
CREATE TYPE inquiry_status AS ENUM ('new','read','replied','closed');

CREATE TABLE IF NOT EXISTS inquiries (
  id          SERIAL PRIMARY KEY,
  type        inquiry_type   NOT NULL DEFAULT 'general',
  status      inquiry_status NOT NULL DEFAULT 'new',
  name        VARCHAR(255)   NOT NULL,
  email       VARCHAR(255)   NOT NULL,
  phone       VARCHAR(50),
  country     VARCHAR(100)   NOT NULL,
  message     TEXT           NOT NULL,
  ip_address  INET,
  replied_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status     ON inquiries(status);
CREATE INDEX idx_inquiries_email      ON inquiries(email);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);

CREATE TRIGGER inquiries_updated_at
  BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
