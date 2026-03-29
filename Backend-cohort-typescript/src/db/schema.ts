import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 45 }).notNull(), // not null means required
    lastName: varchar('last_name', { length: 45 }),
    email: varchar('email', { length: 322 }).notNull().unique(),
    password: varchar('password', { length: 66 }), // 50 is the right but to keep buffer 
    isVerified: boolean('is_verified').default(false).notNull(),
    salt: text('salt'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updateAt: timestamp('updated_at').$onUpdate(() => new Date())

})
