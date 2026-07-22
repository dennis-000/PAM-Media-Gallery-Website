# PAM Media — Fine Art Photography & Studio Operating System (Studio OS)

> **PAM Media Studio OS** is the internal operating system powering Ghana’s premier creative media house. Built to the aesthetic and functional standards of **Stripe, Linear, Vercel, and Notion**.

---

## 🌟 Studio OS System Architecture & Modules

```
PAM Media Studio OS
├── 1. Command Dashboard (/admin)
│   ├── Decision Metrics: Lifetime Revenue (GHS 485k), Delivery Velocity (4.2 Days), Storage Vault (7.4 TB), Repeat Clients (34.2%)
│   ├── Active Studio Projects Workflow Teaser
│   ├── Inquiry Channel Breakdown: Instagram (42%), Website (28%), WhatsApp (18%), Referrals (12%)
│   └── Real-time Client Inbox & Audit Log Feed
├── 2. Bookings Pipeline (/admin/bookings)
│   └── Searchable directory with status filters (Pending, Confirmed, Completed, Cancelled) & approval actions
├── 3. Production Calendar (/admin/calendar)
│   └── Multi-view shoot schedule (Monthly, Weekly, Daily, Timeline) with color-coded categories
├── 4. Projects Kanban Pipeline (/admin/projects)
│   └── Linear-style workflow stages: Booked -> Planning -> Shooting -> Editing -> Review -> Gallery Ready -> Completed
├── 5. Client 360° Directory (/admin/clients)
│   └── 125+ client profiles, lifetime value, contact info, shoot history, and studio VVIP notes
├── 6. Galleries Management (/admin/galleries)
│   └── PIN security controls (demo PIN 2026, 7788, 1234), watermark toggles, hide originals, and client portal view
├── 7. Dropbox-Style Upload Queue (/admin/uploads)
│   └── Large drag-and-drop ingestion queue, Sharp WebP tier generation, EXIF parsing, and batch upload progress
├── 8. Invoices & Billing (/admin/invoices)
│   └── Financial breakdown, deposit receipts, paid/unpaid status, GHS & USD pricing
├── 9. Services Catalog (/admin/services)
│   └── Package tier manager for Weddings, Corporate, Portraits, Galas, Commercial Campaigns, and Cinema Video
├── 10. Testimonials Manager (/admin/testimonials)
│   └── Social proof review approval and homepage feature toggles
├── 11. Journal & Blog Publisher (/admin/blog)
│   └── Article publishing engine for wedding inspiration and branding guides
├── 12. Client Communications Inbox (/admin/messages)
│   └── Multi-channel messaging threads (WhatsApp, Email, Web) with quick studio reply builder
├── 13. Team & RBAC Permissions (/admin/team)
│   └── Role-Based Access Control: Studio Owner, Lead Photographer, Retouching Editor, Administrator
├── 14. Executive Decision Reports (/admin/reports)
│   └── Financial intelligence, inquiry channels, storage vault growth, and gallery view metrics
└── 15. Studio Settings (/admin/settings)
    └── Business branding, email notification templates, Cloudflare R2 bucket setup, and integration keys
```

---

## ⚡ Seeded 5-Year Operating Data Store

All widgets, charts, tables, kanban boards, and messages are backed by 5 years of realistic operating seed data in `persistentDb`:
- **125+ Client Profiles**
- **372+ Bookings**
- **46 Active Projects**
- **18 Scheduled Shoots**
- **21 Client Galleries**
- **GHS 485,000 Total Lifetime Revenue**
- **7.4 TB Cloudflare R2 Storage Used**

---

## 🚀 Running the Studio OS Locally

```bash
# Navigate to project directory
cd d:\PAM_Media

# Start Next.js development server
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the Studio OS.
