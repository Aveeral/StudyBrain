CREATE TABLE "users" (
    "id" UUID DEFAULT gen_random_uuid(),
    "display_name" TEXT DEFAULT NULL,
    "email" TEXT NOT NULL UNIQUE,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY("id")
)