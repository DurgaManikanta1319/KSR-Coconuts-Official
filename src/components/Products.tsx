'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

interface ProductItem {
  id: string;
  title: string;
  desc: string;
  price: string;
  rating: number;
  stock: boolean;
  image: string;
  color: string;
  badge: string;
}

export const Products: React.FC = () => {
  const { t } = useApp();

  const productsData: ProductItem[] = [
    {
      id: 'tender',
      title: t.products.items.tender.title,
      desc: t.products.items.tender.desc,
      price: "₹35 / piece",
      rating: 4.9,
      stock: true,
      image: "/products/tender/tender.jpg",
      color: "from-emerald-500/10 to-teal-500/10",
      badge: "BEST SELLER"
    },
    {
      id: 'mature',
      title: t.products.items.mature.title,
      desc: t.products.items.mature.desc,
      price: "₹30 / piece",
      rating: 4.8,
      stock: true,
      image: "/products/mature/mature.png",
      color: "from-amber-600/10 to-yellow-600/10",
      badge: "ESSENTIAL"
    },
    {
      id: 'water',
      title: t.products.items.water.title,
      desc: t.products.items.water.desc,
      price: "₹40 / bottle",
      rating: 4.9,
      stock: true,
      image: "/products/water/water.jpg",
      color: "from-sky-500/10 to-blue-500/10",
      badge: "HIGHLY RATED"
    },
    {
      id: 'dry',
      title: t.products.items.dry.title,
      desc: t.products.items.dry.desc,
      price: "₹180 / kg",
      rating: 4.7,
      stock: true,
      image: "/products/dry/dry.jpg",
      color: "from-orange-600/10 to-yellow-700/10",
      badge: "NATURAL"
    },
    {
      id: 'copra',
      title: t.products.items.copra.title,
      desc: t.products.items.copra.desc,
      price: "₹120 / kg",
      rating: 4.8,
      stock: true,
      image: "/products/copra/copra.jpg",
      color: "from-amber-800/10 to-yellow-900/10",
      badge: "OIL MILL GRADE"
    },
    {
      id: 'oil',
      title: t.products.items.oil.title,
      desc: t.products.items.oil.desc,
      price: "₹240 / Litre",
      rating: 5,
      stock: true,
      image: "/products/oil/oil.jpg",
      color: "from-yellow-500/10 to-amber-500/10",
      badge: "100% COLD-PRESSED"
    },
    {
      id: 'husk',
      title: t.products.items.husk.title,
      desc: t.products.items.husk.desc,
      price: "₹5 / piece",
      rating: 4.6,
      stock: true,
      image: "/products/husk/husk.jpg",
      color: "from-stone-600/10 to-orange-800/10",
      badge: "ECO-FRIENDLY"
    },
    {
      id: 'shell',
      title: t.products.items.shell.title,
      desc: t.products.items.shell.desc,
      price: "₹8 / kg",
      rating: 4.7,
      stock: true,
      image: "/products/shell/shell.jpg",
      color: "from-neutral-700/10 to-stone-900/10",
      badge: "RAW CRAFT"
    },
    {
      id: 'leaves',
      title: t.products.items.leaves.title,
      desc: t.products.items.leaves.desc,
      price: "₹10 / bundle",
      rating: 4.8,
      stock: true,
      image: "/products/leaves/leaves.jpg",
      color: "from-green-500/10 to-emerald-600/10",
      badge: "FRESH CUT"
    },
    {
      id: 'bulk',
      title: t.products.items.bulk.title,
      desc: t.products.items.bulk.desc,
      price: "Custom Pricing",
      rating: 4.9,
      stock: true,
      image: "/products/bulk/bulk.jpg",
      color: "from-emerald-700/10 to-amber-700/10",
      badge: "WHOLESALE VALUE"
    },
  ];

  const handleOrder = (productName: string) => {
    // Import dynamically or run directly
    const { triggerConfetti } = require('@/utils/confetti');
    triggerConfetti();
    
    const { generateWhatsAppMessage } = require('@/utils/whatsapp');
    const url = generateWhatsAppMessage('products', 'Order Now', productName);
    window.open(url, '_blank');
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden bg-bg-base/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Organic Catalog
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold font-poppins text-text-base mt-4 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t.products.title}
          </motion.h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full" />
          <motion.p
            className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-inter font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.products.subtitle}
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {productsData.map((product) => (
            <motion.div
              key={product.id}
              className="glow-card glass-panel rounded-[2rem] overflow-hidden flex flex-col justify-between group min-h-[430px] border border-black/5 dark:border-[#1b3f27]/30 hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(74,222,128,0.15)] shine-sweep transition-all duration-350"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              {/* Product Visual Container with gradient background */}
              <div className="h-44 relative flex items-center justify-center bg-[#07160c] dark:bg-[#07160c] overflow-hidden border-b border-card-border">
                {/* Main Product Image */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Blending Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07160c]/60 via-transparent to-transparent pointer-events-none" />
                <div className={`absolute inset-0 bg-gradient-to-tr ${product.color} opacity-25 pointer-events-none`} />

                {/* Product Badge Left */}
                <span className="absolute top-3.5 left-3.5 text-[8px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900/80 dark:bg-black/60 border border-primary/20 text-primary-light">
                  {product.badge}
                </span>

                {/* Star Rating Badge Right with Glow */}
                <span className="absolute top-3.5 right-3.5 flex items-center space-x-0.5 text-[8px] font-extrabold px-2 py-0.5 rounded bg-neutral-900/80 dark:bg-black/60 border border-amber-500/30 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]">
                  <Star className="w-2.5 h-2.5 fill-amber-500 stroke-none" />
                  <span>{product.rating}</span>
                </span>
              </div>

              {/* Product Info Description */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Stock Status Indicator with Glow */}
                  <span className="text-[9px] font-bold text-primary dark:text-primary-light uppercase tracking-widest flex items-center space-x-1.5 mb-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse inline-block" />
                    <span>{product.stock ? t.products.inStock : t.products.outOfStock}</span>
                  </span>

                  <h3 className="text-base font-bold font-poppins text-text-base leading-snug group-hover:text-primary transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 font-inter font-light mt-2 line-clamp-3 leading-relaxed">
                    {product.desc}
                  </p>
                </div>

                {/* Price & Order Trigger flex layout */}
                <div className="mt-4 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50 flex items-center justify-between">
                  <div>
                    <div className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-poppins">
                      TODAY'S PRICE
                    </div>
                    <div className="text-base font-bold font-manrope text-primary dark:text-primary-light mt-0.5">
                      {product.price}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOrder(product.title)}
                    className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-primary dark:bg-[#0d2417] dark:hover:bg-primary border border-neutral-200 dark:border-primary/25 text-neutral-600 dark:text-primary hover:text-white dark:hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-sm hover:shadow-md"
                    title="Order via WhatsApp"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
