CREATE extension IF NOT EXISTS vector;

CREATE TABLE "chunks" (
  "id" UUID DEFAULT gen_random_uuid(),
  "chunk_index" INTEGER,
  "course_id" UUID ,
  "user_id" UUID ,
  "document_id" UUID ,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "content" TEXT,
  "embeddings" vector(1536),
  PRIMARY KEY("id"),
  FOREIGN KEY("document_id") REFERENCES documents("id") ON DELETE CASCADE,
  FOREIGN KEY("course_id") REFERENCES courses("id") ON DELETE CASCADE,
  FOREIGN KEY("user_id") REFERENCES users("id") ON DELETE CASCADE
  
);