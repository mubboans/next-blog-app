import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";
export const blogTable  = pgTable("blogs", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    body: text().notNull(),
    orgId: varchar().notNull(),
    userId: varchar().notNull(),
});

export type createBlog = typeof blogTable.$inferInsert;
export type selectBlog = typeof blogTable.$inferSelect;
