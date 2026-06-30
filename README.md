# 🌴 KSR Coconuts™ — Premium Luxury Agriculture Experience

An ultra-premium, cinematic, and responsive agriculture brand experience built for **KSR Coconuts™** (based in Ethakota, East Godavari, Andhra Pradesh). The platform showcases organic, farm-fresh tender coconuts, mature coconuts, copra, and cold-pressed coconut oil, delivering farm-to-door direct logistics and B2B wholesale distribution.

Designed to meet the visual and interactive standards of leading luxury and tech landing pages (such as Apple, Tesla, and Rolex events).

---

## ✨ Features & Visual System

### 1. Luxury Visuals & Motion Overlays
*   **🌿 Drifting Leaves Background**: An optimized HTML5 Canvas simulation rendering coconut leaves drifting smoothly across the viewport, featuring mouse-interaction parallax, scale variations, and realistic rotational sways.
*   **✨ Upward Floating Fireflies**: Soft-glowing particle system (in emerald green and white nodes) that rises with organic wind shifts and interactive cursor repulsion.
*   **☀ Hero Sunlight Rays**: Dynamic golden-green gradient light beams projecting from the top right with realistic volumetric flickering.
*   **🌫 Cinematic Mist Overlay**: Radial gradients and low-opacity fog sways that mimic the morning moisture of rural coconut orchards.
*   **🟢 Animated Glow Blobs**: Massive, blurred green radial sways floating in the background with `backdrop-filter: blur(120px)` to elevate visual depth.
*   **🍃 Swaying Palm Shadows**: Volumetric top-left and top-right leaf shadow animations cast organically across the landing layout.

### 2. Glassmorphic Navigation & Global Bars
*   **📊 Reading Scroll Progress Bar**: A thin, responsive gradient line (`#00C853` to `#A7F45D`) fixed at the top of the viewport indicating scroll progress.
*   **🏷️ Live Price Ticker**: A scrolling marquee ticker displaying current prices (e.g. *Ethakota Tender Coconut: ₹35*, *Copra: ₹120/kg*, *Cold-pressed Oil: ₹240/L*) for ultimate transparency.
*   **🔔 Sticky Glass Header**: Transitioning glass navbar (`backdrop-filter: blur(20px)`) that darkens, shrinks, and applies shadows smoothly (400ms) as the user scrolls.
*   **🌿 Wiggling Logo**: Animated leaf-wiggle effect and 1.03x scale transition on logo hover.

### 3. Launch Countdown Popup Overlay
*   **⏱️ 3D Flip Countdown**: Tracks the official launch target date (`2026-07-01 10:00:00 IST`) with rotating 3D flip card animations on digit change.
*   **🎊 Confetti System**: Burst of custom shapes (leaves, coconuts, sparkles, green circles) on loading completion, order success, or special events.
*   **🔄 smart Refresh Lock**: Stores a visitor session log (`ksr_visit_count`) in `localStorage` to reveal the countdown on exactly **every 2nd page refresh/visit** (automatically bypassed after the launch date).

### 4. Products & Order Management
*   **📦 Glassmorphism Product Cards**: Styled with `rounded-[2rem]` (32px), gradient card borders, and star rating glow effects.
*   **📱 Hover Zoom & Lift**: Lift translation (`translateY(-10px)`), scale scaling (`1.02`), and shadow glow on hover.
*   **💬 Context-Aware WhatsApp Message Generator**: A custom utility `generateWhatsAppMessage` automatically infers button and section context to draft formatted, emoji-aligned, mobile-friendly WhatsApp pre-fills (e.g., product details for orders, dealer files for wholesale).

### 5. Logistical Calculators & Localizations
*   **🚪 Delivery Estimator Card**: custom dropdown select detailing delivery zones (Ethakota local, Ravulapalem, Amalapuram, Kakinada) and distance.
*   **🗣️ Full Telugu/English Translations**: Multi-language toggling across all modules including announcement popups, contact forms, and pricing structures.

---

## 🛠️ Tech Stack & Architecture

*   **Framework**: Next.js (TypeScript, React 19, Turbopack)
*   **Styling**: Tailwind CSS v4, Custom CSS3 Keyframe Animations
*   **Animations**: Framer Motion
*   **Icons**: Lucide React
*   **Graphics & Assets**: High-resolution photorealistic AI-generated orchard backgrounds and product assets

---

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18.0.0 or higher)
*   npm or yarn

### Installation
1.  Clone the repository and navigate to the directory:
    ```bash
    cd L1
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Development
Start the local development server with Hot Reloading:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to inspect the application.

### Build & Compilation
Generate a production-ready, optimized static build:
```bash
npm run build
```

---

## 📁 File Structure Highlights

*   [`src/utils/whatsapp.ts`](file:///d:/L1/L1/src/utils/whatsapp.ts): Dynamic context-based WhatsApp enquiry message compiler.
*   [`src/utils/confetti.ts`](file:///d:/L1/L1/src/utils/confetti.ts): Reusable HTML5 Canvas custom particle confetti burst (leaves, coconuts, sparkles).
*   [`src/components/PremiumCanvasBackground.tsx`](file:///d:/L1/L1/src/components/PremiumCanvasBackground.tsx): Advanced background canvas with mist, rays, fireflies, drifting leaves, and blobs.
*   [`src/components/Navbar.tsx`](file:///d:/L1/L1/src/components/Navbar.tsx): Reading scroll progress, live price ticker, and glass transition header.
*   [`src/components/LoadingScreen.tsx`](file:///d:/L1/L1/src/components/LoadingScreen.tsx): Circular loader with dynamic Telugu/English processes and 100% confetti burst.
*   [`src/components/LaunchCountdown.tsx`](file:///d:/L1/L1/src/components/LaunchCountdown.tsx): Standard launch page popup shown on every 2nd refresh.

---

## 📄 License & Intellectual Property

© 2026 KSR Coconuts™. All rights reserved.
**Freshness Beyond Expectations™**
