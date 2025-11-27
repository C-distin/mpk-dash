import { relations } from "drizzle-orm"
import {
  pgTable,
  text,
  bigint,
  timestamp,
  boolean,
  integer,
  index,
  uuid,
  varchar,
  numeric,
  check,
  jsonb,
  date,
} from "drizzle-orm/pg-core"

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role").default("user").notNull(),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
})

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonated_by"),
  },
  (table) => [index("session_userId_idx").on(table.userId)]
)

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)]
)

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
)

export const rateLimit = pgTable("rate_limit", {
  id: text("id").primaryKey(),
  key: text("key"),
  count: integer("count"),
  lastRequest: bigint("last_request", { mode: "number" }),
})

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}))

// sql to drizzle-orm
// Clients table
export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  address: text("address"),
  totalShipments: integer("total_shipments").default(0),
  totalSpent: numeric("total_spent").default("0"),
  joinDate: date("join_date").defaultNow(),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Batches table
export const batches = pgTable(
  "batches",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    batchNumber: varchar("batch_number").notNull().unique(),
    type: varchar("type").notNull(),
    containerSize: varchar("container_size").notNull(),
    status: varchar("status").notNull().default("At China Warehouse"),
    totalPackages: integer("total_packages").default(0),
    totalWeight: numeric("total_weight").default("0.00"),
    totalCbm: numeric("total_cbm").default("0.00"),
    utilizationPercentage: integer("utilization_percentage").default(0),
    capacityLimit: numeric("capacity_limit").default("0.00"),
    estimatedDeparture: date("estimated_departure"),
    estimatedArrival: date("estimated_arrival"),
    totalCost: numeric("total_cost").default("0.00"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  }
  // (table) => ({
  //   typeCheck: check(
  //     "batches_type_check",
  //     `${table.type} = ANY (ARRAY['air'::character varying, 'sea'::character varying])`
  //   ),
  // })
)

// Shipments table
export const shipments = pgTable(
  "shipments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id").references(() => clients.id),
    trackingNumber: text("tracking_number").notNull().unique(),
    type: text("type").notNull(),
    status: text("status").default("At China Warehouse"),
    clientName: text("client_name").notNull(),
    clientPhone: text("client_phone"),
    itemNumber: text("item_number"),
    packages: integer("packages").default(0),
    weight: numeric("weight"),
    cbm: numeric("cbm"),
    cost: numeric("cost").default("0"),
    eta: date("eta"),
    notes: text("notes"),
    sendNotification: boolean("send_notification").default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    batchId: uuid("batch_id").references(() => batches.id),
    clientEmail: text("client_email"),
    etd: date("etd"),
  }
  // (table) => ({
  //   typeCheck: check("shipments_type_check", `${table.type} = ANY (ARRAY['air'::text, 'sea'::text])`),
  // })
)

// Batch shipments junction table
export const batchShipments = pgTable("batch_shipments", {
  id: uuid("id").primaryKey().defaultRandom(),
  batchId: uuid("batch_id").references(() => batches.id),
  shipmentId: uuid("shipment_id").references(() => shipments.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// Invoices table
export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id),
  clientName: text("client_name").notNull(),
  amount: numeric("amount").notNull(),
  currency: text("currency").default("USD"),
  status: text("status").default("Pending"),
  dueDate: date("due_date").notNull(),
  items: jsonb("items").notNull().default([]),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Payments table
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id").references(() => clients.id),
  clientName: text("client_name").notNull(),
  amount: numeric("amount").notNull(),
  currency: text("currency").default("USD"),
  paymentMode: text("payment_mode").notNull(),
  transactionId: text("transaction_id").notNull(),
  status: text("status").default("Completed"),
  invoiceNumber: text("invoice_number"),
  receiptNumber: text("receipt_number"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  referenceNumber: varchar("reference_number").notNull().unique(),
})

// Payment shipments junction table
export const paymentShipments = pgTable("payment_shipments", {
  id: uuid("id").primaryKey().defaultRandom(),
  paymentId: uuid("payment_id")
    .notNull()
    .references(() => payments.id),
  shipmentId: uuid("shipment_id")
    .notNull()
    .references(() => shipments.id),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// Pricing rates table
export const pricingRates = pgTable(
  "pricing_rates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    shipmentType: varchar("shipment_type").notNull(),
    ratePerKg: numeric("rate_per_kg"),
    ratePerCbm: numeric("rate_per_cbm"),
    exchangeRate: numeric("exchange_rate").default("1.0"),
    isActive: boolean("is_active").default(true),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).defaultNow(),
  }
  // (table) => ({
  //   shipmentTypeCheck: check(
  //     "pricing_rates_shipment_type_check",
  //     `${table.shipmentType} = ANY (ARRAY['air'::character varying, 'sea'::character varying])`
  //   ),
  // })
)
