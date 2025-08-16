
## 🚀 Project Idea: **Charity Connect CRM Lite**

A simplified platform for charities to manage donors, donations, and campaigns. It’s like a mini-version of the Beacon CRM you saw in the JD.

---

### **Core Features**

1. **Frontend (React + TypeScript + Material UI)**

   * Dashboard showing **total donations**, recent donors, and active campaigns.
   * Form to **add new donors and donations**.
   * Table/list of donors with **filtering and search**.
   * Use **React Hooks** (`useState`, `useEffect`, `useContext`) for state.
   * Use **Material UI** for design (cards, tables, buttons).
   * Add tests with **Jest + React Testing Library**.

---

2. **Backend (Node.js + Express + GraphQL + PostgreSQL)**

   * REST API endpoints:

     * `POST /donors` → add a donor
     * `GET /donors` → get all donors
     * `GET /donors/:id` → get one donor
     * `GET /stats` → total donations, average donation
   * Add a **GraphQL endpoint** for advanced queries:

     * Example: `donors(filter: { minDonation: 50 }) { name, donationAmount }`
   * Use **dotenv** for environment variables.
   * Include **error handling middleware**.

---

3. **Database (PostgreSQL)**

   * Tables:

     * `donors (id, name, email, created_at)`
     * `donations (id, donor_id, amount, date)`
   * Relationships: `donations.donor_id → donors.id` (foreign key).
   * Write queries:

     * **SELECT with JOIN** (donors and their donations).
     * **Aggregates**: total donations, average donation, donations per donor.

---

4. **AWS Lambda / Serverless (Conceptual)**

   * Extract one function (e.g., “send thank you email when a donation is created”)
   * Implement as a standalone Node.js function.
   * You don’t need real AWS deploy — just structure it like a Lambda (handler function, event input).
   * Understand **event-driven** vs server-based.

---

### **Stretch Goals (if time permits)**

* Add **authentication** (JWT or simple sessions).
* Deploy frontend + backend with **Docker Compose** (like we did).
* Try connecting an AWS service (S3 for donor documents or Lambda simulation).

---

### **What You’ll Learn**

✅ JavaScript + TypeScript fundamentals (objects, async/await, destructuring).
✅ React hooks, component state, MUI styling.
✅ Backend API with Express + GraphQL.
✅ SQL queries + PostgreSQL schema design.
✅ Error handling, dotenv config, testing.
✅ AWS Lambda concepts (event-driven).

---

Task

### Project setup


