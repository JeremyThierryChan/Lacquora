-- Migration 006: Journal posts
CREATE TYPE journal_category AS ENUM (
  'guitar_knowledge','lacquer_art','3d_printing','artist_stories','brand_news'
);
CREATE TYPE post_status AS ENUM ('draft','published','archived');

CREATE TABLE IF NOT EXISTS journal_posts (
  id              SERIAL PRIMARY KEY,
  slug            VARCHAR(255)     NOT NULL UNIQUE,
  category        journal_category NOT NULL,
  author_id       UUID             REFERENCES users(id) ON DELETE SET NULL,

  title_zh        VARCHAR(500)     NOT NULL,
  title_en        VARCHAR(500)     NOT NULL,
  excerpt_zh      TEXT,
  excerpt_en      TEXT,
  content_zh      TEXT,            -- Markdown
  content_en      TEXT,            -- Markdown
  cover_image     TEXT,

  tags            TEXT[]           NOT NULL DEFAULT '{}',

  seo_title       VARCHAR(255),
  seo_description VARCHAR(500),
  og_image        TEXT,

  read_time_min   INTEGER          NOT NULL DEFAULT 5,
  view_count      INTEGER          NOT NULL DEFAULT 0,

  status          post_status      NOT NULL DEFAULT 'draft',
  published_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_journal_slug        ON journal_posts(slug);
CREATE INDEX idx_journal_category    ON journal_posts(category);
CREATE INDEX idx_journal_status      ON journal_posts(status);
CREATE INDEX idx_journal_published   ON journal_posts(published_at DESC) WHERE status = 'published';
CREATE INDEX idx_journal_tags        ON journal_posts USING gin(tags);

CREATE TRIGGER journal_posts_updated_at
  BEFORE UPDATE ON journal_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
