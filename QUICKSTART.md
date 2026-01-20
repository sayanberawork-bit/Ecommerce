# 🚀 Quick Start Guide - E-Commerce App

## 1️⃣ Installation (30 seconds)

```bash
npm install
```

## 2️⃣ Start Development Server

```bash
npm run dev
```

Open: **http://localhost:3000**

## 3️⃣ Login with Demo Account

### Customer
```
Email: user@test.com
Password: demo123
```

### Admin
```
Email: admin@test.com
Password: admin123
```

### Support
```
Email: support@test.com
Password: support123
```

## 📚 Folder Guide

| Folder | Purpose |
|--------|---------|
| `src/app` | Pages & API routes |
| `src/components` | React components |
| `src/context` | State management |
| `src/data` | Mock data |

## 🎯 What You Can Do

### As Customer
✅ Browse products  
✅ Add to cart  
✅ View order history  
✅ Download invoices  

### As Admin
✅ View analytics  
✅ Sales charts  
✅ Revenue reports  

### As Support
✅ View tickets  
✅ Contact customers  
✅ Resolve issues  

## 🔧 Key Commands

```bash
npm run dev        # Start development
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Check for errors
```

## 📁 Important Files

- **Authentication:** `src/app/api/auth/[...nextauth]/route.ts`
- **Cart Logic:** `src/context/CartContext.tsx`
- **Products:** `src/data/products.ts`
- **Styles:** `tailwind.config.ts`

## 🌐 Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page |
| `/login` | Login |
| `/cart` | Shopping cart |
| `/orders` | Order history |
| `/admin` | Admin dashboard |
| `/support` | Support portal |

## 💾 Environment Setup

Create `.env.local`:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 🎨 Customize

### Change App Name
Edit: `src/components/Navbar.tsx` line 25

### Add Products
Edit: `src/data/products.ts`

### Modify Styles
Edit: `tailwind.config.ts`

---

**Next:** Read [COMPLETE_GUIDE.md](./COMPLETE_GUIDE.md) for detailed documentation!
