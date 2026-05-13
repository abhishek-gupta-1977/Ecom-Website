# Full-Stack E-Commerce Platform

**A production-ready, end-to-end e-commerce platform with real payments, admin analytics, and a premium UI — built from scratch.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongoosejs.com/)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Razorpay](https://img.shields.io/badge/Payments-Razorpay-02042B?logo=razorpay&logoColor=white)](https://razorpay.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> 💼 **Currently open to Full Stack Developer roles (Remote & On-site)** — Let's connect!

[Live Demo](https://ecommerce-project-tan-alpha.vercel.app/) • [LinkedIn](https://www.linkedin.com/in/abhishek-gupta-1aa879307/) • [X](https://x.com/abhhhhhiiiiii)

---

## 📌 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [API Reference](#-api-reference)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Challenges & Learnings](#-challenges--learnings)
- [About Me](#-about-me)
- [Get In Touch](#-get-in-touch)

---


Most e-commerce tutorials stop at CRUD. **This one doesn't.**

This is a fully functional, production-grade e-commerce platform that handles the **complete user journey** — from account creation with email verification, to browsing products, managing a cart, completing a real Razorpay payment, and viewing orders. Admins get a dedicated dashboard with live sales analytics powered by Recharts.

**What makes this stand out:**
- 🔒 Complete auth pipeline: Register → Email verify → Login → JWT sessions → OTP-based password reset
- 💳 Real Razorpay payment integration with **HMAC-SHA256 signature verification** (fraud prevention)
- 📊 Admin analytics dashboard with live revenue area charts
- 🖼️ Cloudinary CDN for all image storage — fully stateless server
- ⚡ React 19 + Vite 8 + Redux Persist for a blazing fast, state-persistent frontend

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/logout with token-based sessions
- 📧 **Email Verification** — New users verify their account via a tokenized link (expires in 1hr)
- 🔑 **OTP Password Reset** — Time-limited OTP (10 min) sent via Nodemailer for password recovery
- 🛍️ **Product Browsing** — Filter by brand, category, search by name, sort by price (low→high / high→low)
- 🖼️ **Multi-Image Products** — Admins upload multiple product images stored on Cloudinary CDN
- 🛒 **Persistent Cart** — Add, update quantity, remove items — cart survives page refresh via Redux Persist
- 💳 **Razorpay Payments** — Full checkout: order creation → payment popup → server-side signature verification
- 📦 **Order Tracking** — Orders move through Pending → Paid → Failed with full history view
- 📊 **Admin Sales Dashboard** — KPI cards (users, products, orders, revenue) + revenue area chart over time
- 👥 **Admin User Management** — View all users, inspect individual profiles and their order history
- 🏷️ **Admin Product Management** — Add, edit, delete products with multi-image upload
- 👤 **Profile Management** — Update name, address, phone, city, zip, and profile picture
- 🛡️ **Role-Based Access Control** — `admin` and `user` roles enforced at middleware level AND frontend route level
- 🎠 **Hero Carousel** — Full-screen Swiper.js slider with image + video slides and autoplay
- 🌟 **Bento Grid UI** — Modern layout with premium fashion brand imagery
- ⭐ **Reviews Section** — Customer review cards with marquee animation
- 📱 **Responsive Design** — Tailwind CSS with mobile-first layout

---

## 🎥 Demo

> 📸 Add screenshots of your app here — home page, products, cart, checkout, and admin dashboard.

```
screenshots/
├── home.png
├── products.png
├── cart.png
├── checkout.png
├── admin-dashboard.png
└── admin-products.png
```

> 💡 **Pro tip:** Record a 60-second Loom walkthrough and paste the link above. It's the single biggest factor in getting recruiter attention.

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react&logoColor=black) | UI framework |
| ![Vite](https://img.shields.io/badge/-Vite_8-646CFF?logo=vite&logoColor=white) | Build tool & dev server |
| ![TailwindCSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white) | Utility-first styling |
| ![shadcn/ui](https://img.shields.io/badge/-shadcn%2Fui-000000) | Accessible component library |
| ![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?logo=redux&logoColor=white) | Global state management |
| ![Redux Persist](https://img.shields.io/badge/-Redux_Persist-764ABC) | Persist cart & user across refreshes |
| ![React Router v7](https://img.shields.io/badge/-React_Router_v7-CA4245?logo=reactrouter&logoColor=white) | Client-side routing |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4) | HTTP client |
| ![Recharts](https://img.shields.io/badge/-Recharts-22B5BF) | Sales analytics charts |
| ![Swiper.js](https://img.shields.io/badge/-Swiper.js-6332F6) | Hero carousel |
| ![Sonner](https://img.shields.io/badge/-Sonner-000000) | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | Runtime |
| ![Express 5](https://img.shields.io/badge/-Express_5-000000?logo=express&logoColor=white) | Web framework |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | NoSQL database |
| ![Mongoose](https://img.shields.io/badge/-Mongoose-880000) | ODM / schema modeling |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=jsonwebtokens&logoColor=white) | Auth tokens |
| ![Bcrypt](https://img.shields.io/badge/-Bcrypt-003A70) | Password hashing (10 salt rounds) |
| ![Cloudinary](https://img.shields.io/badge/-Cloudinary-3448C5?logo=cloudinary&logoColor=white) | Image CDN |
| ![Razorpay](https://img.shields.io/badge/-Razorpay-02042B?logo=razorpay&logoColor=white) | Payment gateway |
| ![Nodemailer](https://img.shields.io/badge/-Nodemailer-0F9DCE) | Email (OTP + verification) |
| ![Multer](https://img.shields.io/badge/-Multer-FF6600) | Multipart file uploads |

---

## 📊 Results / Performance

| Metric | Detail |
|---|---|
| Frontend build | Vite 8 — near-instant HMR, optimized production bundle |
| State persistence | Redux Persist — cart and user session survive hard refresh |
| Image delivery | Cloudinary CDN — global edge caching, no server storage |
| Payment security | HMAC-SHA256 signature verification on every payment |
| Password security | bcrypt with 10 salt rounds |
| API design | Versioned REST API (`/api/v1/...`) — production-ready structure |

---

## 🏗 Architecture

```
Ecom-Website/
├── backend/
│   ├── config/razorpay.js         # Razorpay SDK init
│   ├── controller/
│   │   ├── userController.js      # Register, login, verify, OTP, profile update
│   │   ├── productController.js   # CRUD + multi-image Cloudinary upload
│   │   ├── cartController.js      # Add, update qty, remove, fetch cart
│   │   └── orderController.js     # Create order, verify payment, sales stats
│   ├── database/db.js             # MongoDB connection
│   ├── EmailVerify/
│   │   ├── sendOTP.js             # Nodemailer OTP email
│   │   └── verifyEmail.js         # Tokenized verification email
│   ├── middleware/
│   │   ├── isAuthenticated.js     # JWT guard + admin check
│   │   └── multer.js              # Memory-based uploads
│   ├── models/                    # Mongoose schemas
│   ├── routes/                    # Express routers
│   ├── utils/
│   │   ├── cloudinary.js
│   │   └── datauri.js             # Buffer → DataURI for Cloudinary
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── ui/                # shadcn/ui primitives
        │   ├── Navbar.jsx         # Auth-aware nav + cart badge
        │   ├── Hero.jsx           # Swiper carousel (image + video)
        │   ├── BentoGrid.jsx      # Brand grid layout
        │   ├── ProductCard.jsx    # Product tile + add to cart
        │   ├── AddressForm.jsx    # Checkout + Razorpay trigger
        │   └── ProtectedRoute.jsx # Auth + admin route guard
        ├── pages/
        │   ├── Home / Products / Cart / Profile
        │   ├── Login / SignUP / ForgotPassword / ChangePassword
        │   └── admin/
        │       ├── AdminSales.jsx     # Revenue charts + KPI cards
        │       ├── AdminProduct.jsx   # Product CRUD UI
        │       ├── AdminOrders.jsx
        │       ├── AdminUsers.jsx
        │       └── UserInfo.jsx
        └── redux/
            ├── store.js           # Persisted Redux store
            ├── userSlice.js
            ├── productSlice.js
            └── cartSlice.js
```

### Payment Flow

```
User clicks "Pay Now"
  → POST /api/v1/order/create  (cart items + total)
  → Backend creates Razorpay order → saves to DB (status: Pending)
  → Razorpay checkout popup opens in browser
  → User completes payment
  → Razorpay returns: razorpay_order_id + razorpay_payment_id + signature
  → POST /api/v1/order/verify
  → Backend: HMAC-SHA256(order_id | payment_id, secret) === signature ?
      ✅ Match  → status: Paid,   cart cleared
      ❌ No match → status: Failed
```

---

## 📡 API Reference

### 👤 User — `/api/v1/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ❌ | Register + send verification email |
| POST | `/verify` | ❌ | Verify email via token |
| POST | `/resend-verification` | ❌ | Resend verification email |
| POST | `/login` | ❌ | Login, returns JWT |
| POST | `/logout` | ✅ | Logout |
| POST | `/forgot-password` | ❌ | Send OTP to email |
| POST | `/verify-otp/:email` | ❌ | Validate OTP |
| PUT | `/change-password/:email` | ❌ | Reset password |
| GET | `/all-user` | ✅ Admin | List all users |
| GET | `/get-user/:userId` | ✅ Admin | Get user by ID |
| PUT | `/update/:id` | ✅ | Update profile + photo |

### 📦 Products — `/api/v1/product`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/add` | ✅ Admin | Add product + images |
| GET | `/getallproducts` | ❌ | Fetch all products |
| DELETE | `/delete/:productId` | ✅ Admin | Delete product |
| PUT | `/update/:productId` | ✅ Admin | Update product + images |

### 🛒 Cart — `/api/v1/cart`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/add` | ✅ | Add item |
| GET | `/` | ✅ | Get cart |
| PUT | `/update` | ✅ | Update quantity |
| DELETE | `/remove` | ✅ | Remove item |

### 💳 Orders — `/api/v1/order`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/create` | ✅ | Create Razorpay order |
| POST | `/verify` | ✅ | Verify payment + update status |
| GET | `/history` | ✅ | User order history |
| GET | `/sales` | ✅ Admin | Sales stats + revenue chart data |

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or [Atlas](https://cloud.mongodb.com))
- Razorpay account — use test mode keys
- Cloudinary account — free tier works
- Gmail with App Password enabled

### Clone & Install

```bash
# Clone the repo
git clone https://github.com/abhishek-gupta-1977/Ecom-Website.git
cd Ecom-Website

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Run Locally

```bash
# Terminal 1 — Backend (from /backend folder)
node server.js
# → http://localhost:7001

# Terminal 2 — Frontend (from /frontend folder)
npm run dev
# → http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` inside `backend/`:

```env
PORT=7001
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY=rzp_test_xxxxxxxxxxxxxxxx
RAZORPAY_SECRET=your_razorpay_secret

MAIL_USER=your_gmail@gmail.com
MAIL_PASS=your_gmail_app_password
```

> ⚠️ Never commit `.env` — it is already in `.gitignore`.

---

## 🧠 Challenges & Learnings

### 1. Razorpay Signature Verification — Preventing Fraud
After payment, anyone could theoretically call `/order/verify` with a fake payment ID. The fix: the backend generates its own HMAC-SHA256 signature from `order_id + "|" + payment_id` using the secret key, and compares it to what Razorpay sent. If they don't match, the order stays `Failed` — no manual override possible.

### 2. Stateless File Uploads with Cloudinary
Saving files to disk breaks on cloud deployments. Instead, Multer buffers uploads in memory, the Buffer gets converted to a DataURI string via a utility function, and that string is sent directly to Cloudinary. The server never touches the filesystem — fully cloud-ready.

### 3. Cart Persistence with Redux Persist
Cart items vanishing on page refresh is a classic UX problem. By wrapping the Redux store with `redux-persist` and a custom storage adapter, both the cart and user session survive hard refreshes — without making any API calls on load.

### 4. JWT Email Verification with Expiry Handling
The verification link contains a JWT that expires in 1 hour. On click, the backend decodes it — if expired, it returns a specific error code so the frontend can show a "Resend email" button rather than a confusing generic error.

### 5. Double-Layer Route Protection
Admin routes are protected at two levels: `isAdmin` middleware blocks unauthorized API requests, and `<ProtectedRoute adminOnly>` in React redirects non-admins before any API call is even made — preventing both data leaks and unnecessary network requests.

---

## 🙋‍♂️ About Me

Hi, I'm **Abhishek Gupta** — a Full Stack Developer from Kota, Rajasthan 🇮🇳, passionate about building real-world, production-quality web applications.

I built StyleCart to go beyond tutorial-level work and tackle real production challenges: secure auth pipelines, payment gateway integration with fraud prevention, cloud media delivery, and an admin experience with live analytics.

---

## 📬 Get In Touch

Interested in collaborating or hiring? I'd love to hear from you!

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?logo=linkedin&logoColor=white)](#)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5722)](#)
[![Email](https://img.shields.io/badge/Email-Reach%20Out-EA4335?logo=gmail&logoColor=white)](mailto:your@email.com)

> 💼 **Currently seeking Full Stack Developer roles — Remote & On-site**

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Made with ❤️ by Abhishek Gupta</p>
