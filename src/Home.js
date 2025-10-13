import React, { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "./Footer";

export const IMAGE_MAP = {
  logo: "./Elvira (2) (1).png",
  heroBanner:
    "./https://drive.google.com/file/d/1pb1cHvK7UVZUK1QOaBQPEndpbcqXu-gc/view?usp=drive_link",
  exclusiveLuxeElixir:
    "./painted kit.jpg?usp=drive_link?q=80&w=1200&auto=format&fit=crop",
  lorealRoseSerum:
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  sugarLipstickRubyRed:
    "https://images.unsplash.com/photo-1617692859264-6ffea7c3e372?q=80&w=1200&auto=format&fit=crop",
  sugarLipstickPeachPink:
    "https://images.unsplash.com/photo-1623342378281-9b2f4c5c7e4d?q=80&w=1200&auto=format&fit=crop",
  sugarLipstickBerryMauve:
    "https://images.unsplash.com/photo-1630417748827-9c6e2f7a8b9c?q=80&w=1200&auto=format&fit=crop",
  neutrogenaMineralSunscreen:
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop",
  maybellineHairOil:
    "https://images.unsplash.com/photo-1541534401786-3df3a2a2f3f0?q=80&w=1200&auto=format&fit=crop",
  lorealClayMask:
    "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1200&auto=format&fit=crop",
  cetraveCleanser:
    "https://images.unsplash.com/photo-1588459468820-0cfa3d8f6e4e?q=80&w=1200&auto=format&fit=crop",
  macFoundation:
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1200&auto=format&fit=crop",
  maybellineMascara:
    "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1200&auto=format&fit=crop",
  neutrogenaNightCream:
    "https://images.unsplash.com/photo-1525130413817-d45c1d127c42?q=80&w=1200&auto=format&fit=crop",
  ELV: "./Hydrating radiance primer.png",
  spray: "./Infallible setting spray.png",
  blush1: "./sweetcheeks macaron blush .png",
  Damngirl: "./Damn girl.png",
  Uptowngirllengtheningmascara: "./Cheeky statement eyeshadow palette.png",
  Cheekystatementeyeshadowpalette: "./Uptown girl lengthening mascara.png",
  Lastingfix: "./Lasting fix.png",
  Stayhighcollosalmascara: "./Stayhigh collosal mascara.png",
  Hollywoodblush: "./Hollywood blush .png",
  Dreagril: "./Dream Girl .png",
  Headturner: "./Head turner.png",
  Suspense: "./Suspense.png",
  Fearless: "./Fearless.png",
  Strengthen: "./Strengthen.png",
  Thrilling: "./Thrilling.png",
  Transform: "./Transform.png",
  Fairytaleending: "./Fairytaleending.png",
  LazySunday: "./LazySunday.png",
  Majorcrush: "./Majorcrush.png",
  Payday: "./Payday.png",
};

// Improved skin tone detection function using most significant color
const detectSkinTone = (imageData) => {
  const data = imageData.data;
  const colorMap = new Map();

  // Count frequency of each color (quantized to reduce variations)
  for (let i = 0; i < data.length; i += 16) {
    // Sample every 4th pixel for performance
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    // Skip transparent pixels and extreme colors
    if (data[i + 3] < 128) continue;

    // Quantize colors to reduce noise
    const quantizedRed = Math.floor(red / 10) * 10;
    const quantizedGreen = Math.floor(green / 10) * 10;
    const quantizedBlue = Math.floor(blue / 10) * 10;
    const colorKey = `${quantizedRed},${quantizedGreen},${quantizedBlue}`;

    // Basic skin tone range detection
    if (
      red > 80 &&
      red < 255 &&
      green > 40 &&
      green < 240 &&
      blue > 20 &&
      blue < 220 &&
      red > green &&
      green > blue &&
      Math.abs(red - green) > 10 &&
      Math.abs(green - blue) > 10
    ) {
      colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
    }
  }

  if (colorMap.size === 0) return "medium"; // default fallback

  // Find the most frequent skin tone color
  let mostFrequentColor = null;
  let maxCount = 0;

  for (const [colorKey, count] of colorMap.entries()) {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentColor = colorKey;
    }
  }

  if (!mostFrequentColor) return "medium";

  const [r, g, b] = mostFrequentColor.split(",").map(Number);

  // Simplified skin tone classification for MVP
  const brightness = (r + g + b) / 3;

  if (brightness > 200) return "light";
  if (brightness > 140) return "medium";
  return "deep";
};

export default function BeautyShop() {
  const [cart, setCart] = useState([]);
  const [shadeSelection, setShadeSelection] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // New states for skin tone detection
  const [skinTone, setSkinTone] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showSkinToneModal, setShowSkinToneModal] = useState(false);
  const fileInputRef = useRef(null);

  const sampleProducts = useMemo(
    () => [
      {
        id: 9,
        title: "Hydrating radiance primer",
        price: 45.0,
        category: "Makeup",
        brand: "ELV",
        rating: 4.9,
        image: IMAGE_MAP.ELV,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 10,
        title: "Infallible Setting Spray",
        price: 45.0,
        category: "Skincare",
        brand: "L’Oreal Parees",
        rating: 4.9,
        image: IMAGE_MAP.spray,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 11,
        title: "Sweetcheeks Macaron Blush ",
        price: 45.0,
        category: "Makeup",
        brand: "Too Fased",
        rating: 4.9,
        image: IMAGE_MAP.blush1,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 12,
        title: "Damn girl ",
        price: 45.0,
        category: "Makeup",
        brand: "Too Fased",
        rating: 4.9,
        image: IMAGE_MAP.Damngirl,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 13,
        title: "Cheeky Statement Eyeshadow Palette",
        price: 45.0,
        category: "Makeup",
        brand: "SUGAR Cosmetics",
        rating: 4.9,
        image: IMAGE_MAP.Uptowngirllengtheningmascara,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 14,
        title: "Uptown Girl Lengthening Mascara",
        price: 45.0,
        category: "Makeup",
        brand: "SUGAR Cosmetics",
        rating: 4.9,
        image: IMAGE_MAP.Cheekystatementeyeshadowpalette,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 15,
        title: "Lasting Fix",
        price: 20.0,
        category: "Makeup",
        brand: "Maybelline",
        rating: 4.6,
        image: IMAGE_MAP.Lastingfix,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 16,
        title: "Stayhigh Collosal Mascara",
        price: 20.0,
        category: "Makeup",
        brand: "Maybelline",
        rating: 4.6,
        image: IMAGE_MAP.Stayhighcollosalmascara,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 17,
        title: "Hollywood Blush ",
        price: 20.0,
        category: "Makeup",
        brand: "Charlote Tilburry",
        rating: 4.6,
        image: IMAGE_MAP.Hollywoodblush,
        skinTones: ["light", "medium", "deep"],
      },
      {
        id: 18,
        title: "Kae Beauty Luminara Creme Lipstick",
        price: 18.0,
        category: "Makeup",
        brand: "Kae Beauty",
        rating: 4.4,
        image: {
          "Dream Girl": IMAGE_MAP.Dreagril,
          "Head turner": IMAGE_MAP.Headturner,
          Suspense: IMAGE_MAP.Suspense,
        },
        badge: "New",
        shades: ["Dream Girl", "Head turner", "Suspense"],
        skinTones: {
          "Dream Girl": ["light"],
          "Head turner": ["light", "medium", "deep"],
          Suspense: ["medium", "light"],
        },
      },
      {
        id: 19,
        title: "Pure Intent Matte Lipstick",
        price: 18.0,
        category: "Makeup",
        brand: "Rare Beautie",
        rating: 4.4,
        image: {
          Fearless: IMAGE_MAP.Fearless,
          Strengthen: IMAGE_MAP.Strengthen,
          Thrilling: IMAGE_MAP.Thrilling,
          Transform: IMAGE_MAP.Transform,
        },
        badge: "New",
        shades: ["Fearless", "Strengthen", "Thrilling", "Transform"],
        skinTones: {
          Fearless: ["light", "medium"],
          Strengthen: ["dark"],
          Thrilling: ["medium", "light"],
          Transform: ["medium", "light", "deep"],
        },
      },
      {
        id: 20,
        title: "Luminara Creme lipstick",
        price: 600,
        category: "Makeup",
        brand: "L’Oreal Parees",
        rating: 4.3,
        image: {
          "Fairytale Ending": IMAGE_MAP.Fairytaleending,
          "Lazy Sunday": IMAGE_MAP.LazySunday,
          "Major Crush": IMAGE_MAP.Majorcrush,
          "Pay Day": IMAGE_MAP.Payday,
        },
        badge: "New",
        shades: ["Fairytale Ending", "Lazy Sunday", "Major Crush", "Pay Day"],
        skinTones: {
          "Fairytale Ending": ["light"],
          "Major Crush": ["deep", "medium"],
          "Lazy Sunday": ["medium", "deep"],
          "Pay Day": ["light", "deep"],
        },
      },
    ],
    []
  );

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(sampleProducts.map((p) => p.brand)))],
    [sampleProducts]
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        analyzeSkinTone(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeSkinTone = (imageSrc) => {
    setIsAnalyzing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const detectedTone = detectSkinTone(imageData);
        setSkinTone(detectedTone);
        setShowSkinToneModal(true);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setSkinTone("medium"); // fallback
        setShowSkinToneModal(true);
      }
      setIsAnalyzing(false);
    };
    img.src = imageSrc;
  };

  const filteredProducts = useMemo(() => {
    let filtered = sampleProducts;

    // Filter by brand
    if (selectedBrand !== "All") {
      filtered = filtered.filter((p) => p.brand === selectedBrand);
    }

    // Filter by skin tone if detected
    if (skinTone) {
      filtered = filtered.filter((product) => {
        if (product.skinTones) {
          if (Array.isArray(product.skinTones)) {
            return product.skinTones.includes(skinTone);
          } else if (product.shades) {
            // For products with multiple shades, check if any shade matches
            return Object.values(product.skinTones).some((tones) =>
              tones.includes(skinTone)
            );
          }
        }
        return true;
      });
    }

    return filtered;
  }, [selectedBrand, sampleProducts, skinTone]);

  const addToCart = useCallback(
    (product) => {
      const shade = shadeSelection[product.id] || null;
      const uid = `${product.id}-${shade ?? "default"}`;
      const displayImage = product.shades
        ? product.image[shade || product.shades[0]]
        : product.image;

      setCart((prev) => {
        const found = prev.find((it) => it.uid === uid);
        if (found)
          return prev.map((it) =>
            it.uid === uid ? { ...it, qty: it.qty + 1 } : it
          );
        return [
          ...prev,
          {
            uid,
            id: product.id,
            title: product.title,
            price: product.price,
            shade,
            qty: 1,
            image: displayImage,
            brand: product.brand,
          },
        ];
      });
      setDrawerOpen(true);
    },
    [shadeSelection]
  );

  const updateQty = useCallback((uid, delta) => {
    setCart((prev) =>
      prev.map((it) =>
        it.uid === uid ? { ...it, qty: Math.max(1, it.qty + delta) } : it
      )
    );
  }, []);

  const removeFromCart = useCallback((uid) => {
    setCart((prev) => prev.filter((it) => it.uid !== uid));
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + it.price * it.qty, 0),
    [cart]
  );
  const totalItems = useMemo(
    () => cart.reduce((s, it) => s + it.qty, 0),
    [cart]
  );

  const handleCheckout = useCallback(() => {
    const orderData = {
      items: [...cart],
      subtotal: subtotal,
      orderNumber: Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleDateString(),
    };
    setConfirmedOrder(orderData);
    setCart([]);
    setCheckoutComplete(true);
    setShowOrderModal(true);
    setTimeout(() => setCheckoutComplete(false), 2500);
    setDrawerOpen(false);
  }, [cart, subtotal]);

  const handleShadeChange = useCallback((productId, shade) => {
    setShadeSelection((prev) => ({ ...prev, [productId]: shade }));
  }, []);

  const skinToneLabels = {
    light: "Light",
    medium: "Medium",
    deep: "Deep",
  };

  return (
    <div
      className="text-[#0D0D0D] min-h-screen font-sans overflow-hidden"
      style={{ background: "linear-gradient(180deg,#FFF8FA 0%, #FFF1F6 100%)" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root { --pink: #FF69B4; --light-pink: #FFD1DC; --black: #000; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(6px); }
        .hero-bg { background-image: url(${IMAGE_MAP.heroBanner}); background-size: cover; background-position: center; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-animation {
          animation: scroll 20s linear infinite;
        }
        .skin-tone-light { background: #F8D2C6; }
        .skin-tone-medium { background: #C88F6E; }
        .skin-tone-deep { background: #7C4C3A; }
      `}</style>

      {/* NAVBAR */}
      <nav
        className="flex items-center justify-between px-8 py-4 shadow-md sticky top-0 z-40 glass"
        style={{ borderBottom: "3px solid var(--pink)" }}
      >
        <div className="flex items-center gap-3">
          <img
            src={IMAGE_MAP.logo}
            alt="logo"
            className="h-12 w-12 rounded-full border-2"
            style={{ borderColor: "var(--pink)" }}
          />
          <div
            className="font-playfair text-2xl"
            style={{ color: "var(--pink)" }}
          >
            Elvira Beauty
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/about"
            className="px-3 py-2 text-sm rounded-full hover:bg-gray-100 transition-colors"
          >
            About Us
          </Link>

          {/* Skin Tone Detection Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-full font-medium transition-transform hover:scale-105"
            style={{ background: "var(--black)", color: "white" }}
          >
            {skinTone ? `Skin: ${skinToneLabels[skinTone]}` : "Find My Shades"}
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />

          <button
            className="px-3 py-2 text-sm rounded-full"
            style={{ border: "1px solid rgba(0,0,0,0.06)" }}
          >
            Sign in
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative px-4 py-2 rounded-full font-medium transition-transform hover:scale-105"
            style={{ background: "var(--pink)", color: "white" }}
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative text-center h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover filter blur-sm brightness-75"
        >
          <source src="/Product_Ad_Video_Generation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/40" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 space-y-6 md:space-y-8">
          <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl text-white leading-tight">
            Real. Rich. Radiant.
          </h1>
          <p className="text-pink-100 text-base md:text-lg max-w-xl text-center">
            Indulge in the art of beauty — soft textures, luminous colors, and
            timeless glow.
          </p>
        </div>
      </header>

      {/* SALE BANNER */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 overflow-hidden relative">
        <div className="flex whitespace-nowrap scroll-animation">
          <div className="flex items-center gap-8 px-8">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <span key={i} className="text-sm font-medium">
                  ✨ SALE: Get 35% OFF on your first order with code{" "}
                  <span className="font-bold">ELVIRA35</span> ✨
                </span>
              ))}
          </div>
          <div className="flex items-center gap-8 px-8">
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <span key={i} className="text-sm font-medium">
                  ✨SALE: Get 35% OFF on your first order with code{" "}
                  <span className="font-bold">ELVIRA30</span> ✨
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* Skin Tone Detection Result Modal */}
      <AnimatePresence>
        {showSkinToneModal && skinTone && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowSkinToneModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto"
              >
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-center text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    🎨
                  </motion.div>
                  <h3 className="font-playfair text-3xl mb-2">
                    Skin Tone Detected!
                  </h3>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div
                      className={`w-20 h-20 rounded-full mx-auto mb-4 skin-tone-${skinTone} border-4 border-white shadow-lg`}
                    />
                    <h4 className="font-playfair text-2xl mb-2 capitalize">
                      {skinToneLabels[skinTone]} Skin Tone
                    </h4>
                    <p className="text-gray-600">
                      We've filtered products that complement your skin tone
                    </p>
                  </div>

                  <button
                    onClick={() => setShowSkinToneModal(false)}
                    className="w-full py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--pink) 0%, #FF1493 100%)",
                      color: "#fff",
                    }}
                  >
                    Explore Recommended Products
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* EXCLUSIVE PRODUCT SECTION */}
      <section className="relative py-20 text-center bg-gradient-to-r from-[--light-pink] to-white">
        <h2 className="font-playfair text-4xl mb-8 text-[--black]">
          Exclusive Collection Of the Month ✨
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
          <img
            src={IMAGE_MAP.exclusiveLuxeElixir}
            alt="Exclusive Product"
            className="rounded-3xl w-full md:w-1/2 object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
          />
          <div className="md:w-1/2 text-left">
            <h3 className="font-playfair text-3xl mb-4 text-[--pink]">
              PAINTS BUNDLE <br />
              <span className="text-lg md:text-xl font-normal">
                10 Create Paints
              </span>
            </h3>
            <p className="text-sm text-gray-500 mb-2">by PAINTED</p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              All 10 of our original Create Paint shades. Left On Red, Flaming,
              Caution, SMS, Blueprint, Turning Violet, Pinky Promise, Cold Brew,
              Ghosted, and Ink. The ultimate set for any artist to create any
              look imaginable
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xl font-semibold text-[--black]">
                ₹9,000.00
              </span>
              <button
                className="px-6 py-3 rounded-full font-medium shadow-lg transition-transform hover:scale-105"
                style={{ background: "var(--black)", color: "#fff" }}
                onClick={() =>
                  addToCart({
                    id: 999,
                    title: "PAINTS BUNDLE - 10 Create Paints",
                    price: 9000,
                    image: IMAGE_MAP.exclusiveLuxeElixir,
                    brand: "PAINTED",
                    skinTones: ["light", "medium", "deep"],
                  })
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <main className="max-w-7xl mx-auto px-8 py-16 text-center">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="font-playfair text-4xl mb-4 md:mb-0 text-[--black]">
            Our Products
            {skinTone && (
              <span className="text-lg block mt-2 text-pink-600">
                Recommended for {skinToneLabels[skinTone]} skin tone
              </span>
            )}
          </h2>

          {skinTone && (
            <button
              onClick={() => setSkinTone(null)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: "white",
                color: "var(--black)",
                border: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              Clear Skin Tone Filter
            </button>
          )}
        </div>

        {/* BRAND FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className="px-6 py-2 rounded-full font-medium transition-all"
              style={
                selectedBrand === brand
                  ? {
                      background: "var(--pink)",
                      color: "#fff",
                      boxShadow: "0 4px 12px rgba(255,105,180,0.3)",
                    }
                  : {
                      background: "white",
                      color: "var(--black)",
                      border: "1px solid rgba(0,0,0,0.1)",
                    }
              }
            >
              {brand}
            </button>
          ))}
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isLipstick = !!product.shades;
            const displayImage = isLipstick
              ? product.image[shadeSelection[product.id] || product.shades[0]]
              : product.image;

            // Check if current shade is recommended for user's skin tone
            const currentShade =
              shadeSelection[product.id] ||
              (product.shades ? product.shades[0] : null);
            const isShadeRecommended =
              skinTone && product.skinTones && !Array.isArray(product.skinTones)
                ? product.skinTones[currentShade]?.includes(skinTone)
                : true;

            return (
              <article
                key={product.id}
                className="bg-white rounded-3xl p-5 shadow-xl hover:shadow-2xl transition-shadow overflow-hidden border relative"
                style={{ borderColor: "rgba(255,105,180,0.12)" }}
              >
                {/* Consistent badge layout - both badges positioned absolutely */}
                {skinTone && isShadeRecommended && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="text-xs px-2 py-1 rounded-full bg-green-500 text-white font-medium">
                      Recommended
                    </div>
                  </div>
                )}

                {product.badge && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="text-xs px-3 py-1 rounded-full bg-[--pink] text-white font-medium">
                      {product.badge}
                    </div>
                  </div>
                )}

                <div className="overflow-hidden rounded-2xl mb-4 aspect-square">
                  <img
                    src={displayImage}
                    alt={product.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {product.brand}
                </div>
                <h3
                  className="font-playfair text-xl mb-1"
                  style={{ color: "var(--black)" }}
                >
                  {product.title}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    ₹ {product.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-400">
                    ⭐ {product.rating}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full py-3 rounded-full font-medium transition-transform hover:scale-105 mb-3"
                  style={{ background: "var(--black)", color: "#fff" }}
                >
                  Add to cart
                </button>

                {isLipstick && (
                  <div className="flex gap-2 flex-wrap justify-center">
                    {product.shades.map((shade) => {
                      const isRecommended =
                        skinTone &&
                        product.skinTones[shade]?.includes(skinTone);
                      return (
                        <button
                          key={shade}
                          onClick={() => handleShadeChange(product.id, shade)}
                          className="text-xs px-3 py-1 rounded-full transition-all relative"
                          style={
                            shadeSelection[product.id] === shade
                              ? {
                                  background: "var(--pink)",
                                  color: "#fff",
                                  transform: "scale(1.05)",
                                }
                              : {
                                  background: isRecommended
                                    ? "#DCFCE7"
                                    : "var(--light-pink)",
                                  color: "#000",
                                  border: isRecommended
                                    ? "1px solid #22C55E"
                                    : "none",
                                }
                          }
                        >
                          {shade}
                          {isRecommended && skinTone && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </section>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="font-playfair text-2xl mb-4">No products found</h3>
            <p className="text-gray-600 mb-6">
              {skinTone
                ? `We couldn't find products recommended for ${skinToneLabels[skinTone]} skin tone with the current filters.`
                : "Try adjusting your filters to see more products."}
            </p>
            {skinTone && (
              <button
                onClick={() => setSkinTone(null)}
                className="px-6 py-3 rounded-full font-medium transition-all"
                style={{
                  background: "var(--pink)",
                  color: "#fff",
                }}
              >
                Clear Skin Tone Filter
              </button>
            )}
          </div>
        )}
      </main>

      {/* CART DRAWER */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.aside
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ duration: 0.2 }}
            className="fixed right-6 top-6 bottom-6 w-[420px] bg-white rounded-3xl shadow-2xl p-6 z-50 overflow-hidden"
            style={{ border: "2px solid rgba(255,105,180,0.2)" }}
          >
            <div
              className="flex items-center justify-between mb-6 pb-4"
              style={{ borderBottom: "2px solid var(--light-pink)" }}
            >
              <div>
                <h4 className="font-playfair text-2xl text-[--pink]">
                  Your Cart
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="px-4 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm font-medium"
              >
                ✕
              </button>
            </div>

            <div
              className="space-y-4 overflow-auto pr-2"
              style={{ maxHeight: "calc(100% - 240px)" }}
            >
              {cart.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛍️</div>
                  <div className="text-gray-500">Your cart is empty</div>
                  <div className="text-sm text-gray-400 mt-2">
                    Add some products to get started!
                  </div>
                </div>
              )}
              {cart.map((it) => (
                <div
                  key={it.uid}
                  className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors"
                  style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <img
                    src={it.image}
                    alt={it.title}
                    className="w-20 h-20 rounded-xl object-cover shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 mb-1">{it.brand}</div>
                    <div className="font-medium text-sm leading-tight mb-1">
                      {it.title}
                    </div>
                    {it.shade && (
                      <div className="text-xs text-gray-500 mb-2">
                        Shade: {it.shade}
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <div
                        className="text-sm font-semibold"
                        style={{ color: "var(--pink)" }}
                      >
                        ₹ {it.price.toFixed(2)}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(it.uid, -1)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                        >
                          −
                        </button>
                        <div className="w-8 text-center font-medium text-sm">
                          {it.qty}
                        </div>
                        <button
                          onClick={() => updateQty(it.uid, 1)}
                          className="w-7 h-7 rounded-full border flex items-center justify-center hover:bg-gray-100 transition-colors text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(it.uid)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm mt-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-600">Subtotal</div>
                  <div className="text-lg font-semibold">
                    ₹{subtotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div>Shipping</div>
                  <div>FREE</div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full py-4 rounded-full font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--pink) 0%, #FF1493 100%)",
                  color: "#fff",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Checkout toast */}
      <AnimatePresence>
        {checkoutComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-4 rounded-full shadow-2xl z-40"
          >
            <div className="text-lg font-medium">
              Thank you — your order is confirmed 💖
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Confirmation Modal */}
      <AnimatePresence>
        {showOrderModal && confirmedOrder && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowOrderModal(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto"
              >
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-center text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    ✓
                  </motion.div>
                  <h3 className="font-playfair text-3xl mb-2">
                    Order Confirmed!
                  </h3>
                  <p className="text-pink-100">Thank you for your purchase</p>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Order Number
                      </span>
                      <span className="font-bold text-lg">
                        #{confirmedOrder.orderNumber}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Date</span>
                      <span className="text-sm font-medium">
                        {confirmedOrder.date}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-4 text-gray-700">
                      Order Summary
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-auto pr-2">
                      {confirmedOrder.items.map((item) => (
                        <div
                          key={item.uid}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs text-gray-500">
                              {item.brand}
                            </div>
                            <div className="font-medium text-sm">
                              {item.title}
                            </div>
                            {item.shade && (
                              <div className="text-xs text-gray-500">
                                {item.shade}
                              </div>
                            )}
                            <div className="text-sm text-gray-600 mt-1">
                              Qty: {item.qty} ×₹ {item.price.toFixed(2)}
                            </div>
                          </div>
                          <div
                            className="font-semibold"
                            style={{ color: "var(--pink)" }}
                          >
                            ₹{(item.price * item.qty).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        {confirmedOrder.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg">Total</span>
                        <span
                          className="font-bold text-2xl"
                          style={{ color: "var(--pink)" }}
                        >
                          ₹{confirmedOrder.subtotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowOrderModal(false)}
                    className="w-full py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--pink) 0%, #FF1493 100%)",
                      color: "#fff",
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Skin Tone Detection */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowUploadPopup(true)}
        disabled={isAnalyzing}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl z-40 transition-all disabled:opacity-50"
        style={{
          background: "linear-gradient(135deg, var(--pink) 0%, #FF1493 100%)",
        }}
        title="Find Your Perfect Shades"
      >
        {isAnalyzing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            ⏳
          </motion.div>
        ) : (
          "✨"
        )}
      </motion.button>

      {/* Upload Popup Modal */}
      <AnimatePresence>
        {showUploadPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setShowUploadPopup(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto"
              >
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-8 text-center text-white">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-6xl mb-4"
                  >
                    ✨
                  </motion.div>
                  <h3 className="font-playfair text-3xl mb-2">
                    Find Your Perfect Shades
                  </h3>
                  <p className="text-pink-100">
                    Upload a selfie to discover products that complement your
                    skin tone
                  </p>
                </div>

                <div className="p-6">
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setShowUploadPopup(false);
                    }}
                    disabled={isAnalyzing}
                    className="w-full py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--pink) 0%, #FF1493 100%)",
                      color: "#fff",
                    }}
                  >
                    {isAnalyzing ? "Analyzing..." : "Upload Selfie"}
                  </button>

                  <button
                    onClick={() => setShowUploadPopup(false)}
                    className="w-full mt-3 py-3 rounded-full font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Separator */}
      <div className="h-16 bg-gradient-to-b from-transparent to-pink-100" />

      {/* Footer */}
      <Footer />
    </div>
  );
}
