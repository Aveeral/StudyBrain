 
CREATE TABLE "courses" (
  "id" UUID DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY("id")
);

CREATE TABLE "documents" (
  "id" UUID DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "course_id" UUID NOT NULL,
  "processed_at" timestamp DEFAULT NULL,
  "processing_status" TEXT DEFAULT 'pending' CHECK(processing_status IN ('pending','ongoing','successful','failed')),
  "uploaded_at" timestamp DEFAULT NOW(),
  PRIMARY KEY("id"),
  FOREIGN KEY("course_id") REFERENCES "courses"("id") ON DELETE CASCADE
);