# Taxi Queue App

## Features of the Widget
The widget should manage two queues:
1. **People Queue**: Tracks the number of people waiting for a taxi.
2. **Taxi Queue**: Tracks the number of taxis available.

### Operations
1. **People Joining the Queue**:  
   - Add 1 to the **People Queue**.

2. **People Leaving the Queue**:  
   - Remove 1 from the **People Queue**.

3. **Taxis Joining the Queue**:  
   - Add 1 to the **Taxi Queue**.

4. **Taxis Leaving the Queue**:  
   - Remove 1 from the **Taxi Queue**.  
   - Remove 12 people from the **People Queue**.  
   - A taxi can only leave if there are at least 12 people in the **People Queue**.



## Notes
- Ensure that the app maintains the conditions for a taxi departure.
- Handle edge cases like attempting to remove a person or taxi when the respective queues are empty.
- Extend functionality as needed for a larger system.


### Project Report: NestJS, Drizzle ORM, and React Setup

---

## **NestJS**

### **Setup Steps**
1. **Initialize NestJS Project:**
   - Created a new NestJS project using the Nest CLI.
   - Installed necessary packages:
     ```bash
     npm install @nestjs/config @nestjs/typeorm @nestjs/common
     ```

2. **Configure Drizzle ORM:**
   - Installed Drizzle ORM:
     ```bash
     npm install drizzle-orm drizzle-orm/pg
     ```
   - Set up PostgreSQL as the database.
   - Created schema definitions using `pgTable` for entities: `rankTable`, `taxiRouteTable`, `queueTable`, and `queueRouteTable`.

3. **Implemented Core Features:**
   - Added services for:
     - Creating routes (`addRoute` method).
     - Deleting related routes based on conditions.
     - Fetching route details with relations using `leftJoin`.

---

### **Bugs and Solutions**

#### Bug 1: `Property 'leftJoin' does not exist on type...`
- **Cause:** Misconfiguration of the Drizzle ORM query builder.
- **Solution:** Updated Drizzle ORM setup to correctly initialize relationships. Ensured proper usage of `leftJoin` in query building.

#### Bug 2: Duplicate routes creation in `addRoute`:
- **Cause:** When re-creating a deleted route, the arrival route was also duplicated.
- **Solution:** Modified the `addRoute` method to first check for existing routes using a `select` query before inserting new records.

---

## **Drizzle ORM**

### **Setup Steps**
1. **Schema Definition:**
   - Created `pgTable` entities for database tables (`rank`, `route`, `queue`, `queue_route`).

2. **Relationships:**
   - Added foreign key references between tables (`fromRankId`, `toRankId` in `route`, and `queueId` in `queue_route`).

3. **Query Optimization:**
   - Wrote queries for filtering and joining tables:
     - Fetch routes by `queueId`.
     - Filter ranks not associated with specific routes.

---

### **Bugs and Solutions**

#### Bug 1: Missing `queueId` in Query Results
- **Cause:** Joins didn't fetch `queueId` from the `queue_route` table.
- **Solution:** Updated query to include `queueId` in the selected fields using `leftJoin`.

#### Bug 2: Incorrect Filtering of Ranks
- **Cause:** Filtering logic for ranks not linked to routes was incorrect.
- **Solution:** Used `filter` and `some` in JavaScript to exclude ranks with matching `toRankId`.

---

## **React**

### **Setup Steps**
1. **Project Initialization:**
   - Created a React project using Vite.
   - Installed Material-UI for components:
     ```bash
     npm install @mui/material @emotion/react @emotion/styled
     ```

2. **Avatar and Images:**
   - Placed static images in the `public` folder and referenced them with relative paths.

3. **Stats Section:**
   - Designed a grid layout using Material-UI to display stats like passengers departed, taxis needed, passengers needed, and fare made.

4. **Route Details Component:**
   - Created a component to display route details:
     - From Rank
     - To Rank
     - Fare
     - Additional analytics

---

### **Bugs and Solutions**

#### Bug 1: Static Images Not Loading
- **Cause:** Incorrect path used in the `src` attribute of the `Avatar` component.
- **Solution:** Updated the path to include `/public`, or used `import.meta.url` for relative references:
  ```jsx
  <Avatar src="/queue.png" alt="Queue" />
  ```

#### Bug 2: Maximum Update Depth Exceeded
- **Cause:** `setQueueId` was called inside the component body instead of within `useEffect`.
- **Solution:** Moved `setQueueId` into a `useEffect`:
  ```jsx
  useEffect(() => {
    setQueueId(Number(id));
  }, [id, setQueueId]);
  ```

#### Bug 3: Grid Items Not Rendering Correctly
- **Cause:** Incorrect use of the `size` prop in Material-UI's `Grid`.
- **Solution:** Updated to use `xs` and `md` props separately:
  ```jsx
  <Grid item xs={12} md={3}>
  ```

---

## **Summary**

### **What We Achieved**
1. **Backend (NestJS + Drizzle ORM):**
   - Set up a CRUD API for managing routes and queues.
   - Resolved issues with duplicate route creation and complex queries using joins and filters.

2. **Frontend (React):**
   - Created a dashboard to display queue and route analytics.
   - Resolved UI issues with static images and grid layouts.

3. **Integrations:**
   - Successfully linked frontend stats with backend queries.

This approach provided a modular and scalable solution to manage and analyze taxi routes and queues effectively.





<!-- Using Drizzle ORM -->


### **Drizzle ORM Commands: A Beginner’s Guide (Using `npx drizzle-kit`)**

Drizzle ORM simplifies database management, and using `npx drizzle-kit` enhances it further by providing easy migration tools. This guide explains the commands you'll commonly use, their purpose, and when to use them.

---

## **1. Install Drizzle ORM**
First, install Drizzle ORM, the PostgreSQL adapter, and `drizzle-kit` CLI tools:
```bash
npm install drizzle-orm drizzle-orm/pg-core
npm install -D drizzle-kit
```

---

## **2. Configure Drizzle ORM**
Set up your database configuration and schema:
1. Create a `db.ts` file to define your database connection:
   ```typescript
   import { drizzle } from 'drizzle-orm/node-postgres';
   import { Pool } from 'pg';

   const pool = new Pool({
       connectionString: process.env.DATABASE_URL,
   });

   export const db = drizzle(pool);
   ```
2. Define tables in separate files using `pgTable`:
   ```typescript
   import { pgTable, integer, text } from 'drizzle-orm/pg-core';

   export const rankTable = pgTable("rank", {
       id: integer().primaryKey().generatedAlwaysAsIdentity(),
       rankName: text().notNull(),
   });
   ```

---

## **3. Initialize Drizzle Configuration**
Create a `.env` file to specify your database connection string:
```plaintext
DATABASE_URL=your_database_connection_string
```

Run the following command to create the initial Drizzle configuration:
```bash
npx drizzle-kit generate:config
```

This will create a `drizzle.config.ts` file in your project.

---

## **4. Generate SQL Migrations**
Whenever you make schema changes (e.g., adding or modifying tables), you need to generate a migration file.

### **Command:**
```bash
npx drizzle-kit generate
```

### **What it does:**
- Compares your current schema files to the database.
- Generates a migration file in the `migrations` folder containing the SQL changes required.

### **When to use:**
- After making changes to your `pgTable` definitions.

---

## **5. Apply Migrations**
Apply the generated migrations to your database.

### **Command:**
```bash
npx drizzle-kit up
```

### **What it does:**
- Executes the migration scripts in the `migrations` folder.
- Updates your database schema to match your Drizzle definitions.

### **When to use:**
- After running `npx drizzle-kit generate` to generate migrations.
- When deploying a project and setting up the database schema on a new server.

---

## **6. Roll Back Changes (Optional)**
If a migration causes issues, you can roll it back.

### **Command:**
```bash
npx drizzle-kit down
```

### **What it does:**
- Reverts the most recent migration applied to the database.

### **When to use:**
- If a migration introduces errors or is unnecessary.

---

## **7. Run Queries**
You can now use Drizzle ORM to interact with your database.

### **Example: Select Query**
```typescript
const routes = await db.select().from(rankTable);
```

### **Example: Insert Query**
```typescript
const newRank = await db.insert(rankTable).values({ rankName: 'Cape Town' }).returning();
```

### **Example: Update Query**
```typescript
await db.update(rankTable).set({ rankName: 'New Name' }).where(eq(rankTable.id, 1));
```

### **Example: Delete Query**
```typescript
await db.delete(rankTable).where(eq(rankTable.id, 1));
```

---

## **Common Issues and Debugging**

### **Issue: Migration Not Applying Changes**
- **Cause:** You forgot to run `npx drizzle-kit generate` after schema updates.
- **Solution:** Run `npx drizzle-kit generate` to regenerate the migration file, then apply it with `npx drizzle-kit up`.

### **Issue: Duplicate Tables**
- **Cause:** You manually modified the database schema without updating Drizzle's schema files.
- **Solution:** Always update schema files and regenerate migrations with `npx drizzle-kit generate`.

---

## **Workflow Summary**
1. Define or update table schemas using `pgTable`.
2. Run `npx drizzle-kit generate` to generate migration files.
3. Apply migrations to the database with `npx drizzle-kit up`.
4. Use Drizzle ORM methods to query and manipulate data.
5. If needed, roll back problematic migrations using `npx drizzle-kit down`.

With these commands, you can efficiently manage your database schema and data using Drizzle ORM!