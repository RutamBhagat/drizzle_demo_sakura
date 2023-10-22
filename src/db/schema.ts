import {
  bigint,
  bigserial,
  boolean,
  char,
  date,
  decimal,
  doublePrecision,
  integer,
  interval,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  address: varchar("address", { length: 256 }),
  score: integer("score"),
});

export const moodEnum = pgEnum("moodEnum", ["sad", "ok", "happy"]);

export const testTable = pgTable("testTable", {
  id: bigserial("id", { mode: "bigint" }).primaryKey(),
  qty: bigint("qty", { mode: "bigint" }),
  price: decimal("price", { precision: 7, scale: 2 }),
  score: doublePrecision("score"),
  delivered: boolean("delivered"),
  article: text("article"),
  description: varchar("description", { length: 256 }),
  name: char("name", { length: 10 }),
  data: json("data").notNull(),
  startAt: timestamp("start_at", { precision: 0, withTimezone: false }).defaultNow(),
  time: timestamp("time", { mode: "date" }).defaultNow(),
  createdAtDate: date("created_at_date", { mode: "date" }).defaultNow(),
  timeInterval: interval("time_interval"),
  mood: moodEnum("mood").default("ok"),
});
