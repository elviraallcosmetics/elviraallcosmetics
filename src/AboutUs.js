import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { IMAGE_MAP } from "./Home.js";

export default function AboutUs() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background: "linear-gradient(180deg, #FFF8FA 0%, #FFF1F6 100%)",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        :root { --pink: #FF69B4; --light-pink: #FFD1DC; --black: #000; }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(6px); }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .floating { animation: float 4s ease-in-out infinite; }
      `}</style>

      {/* NAVBAR - Matching Home Page */}
      <nav
        className="flex items-center justify-between px-8 py-4 shadow-md sticky top-0 z-40 glass"
        style={{ borderBottom: "3px solid var(--pink)" }}
      >
        <Link to="/" className="flex items-center gap-3">
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
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-full font-medium transition-transform hover:scale-105"
            style={{ background: "var(--pink)", color: "white" }}
          >
            Back to Shop
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-pink-200/30 blur-3xl floating"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-purple-200/30 blur-3xl floating"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="font-inter text-pink-400 text-sm tracking-widest uppercase mb-6">
              Hi, we are
            </div>
            <h1
              className="font-playfair text-7xl md:text-8xl font-bold mb-8"
              style={{
                background: "linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Elvira
            </h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-playfair text-3xl md:text-4xl text-gray-800 mb-2"
            >
              Welcome to world of
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-playfair text-4xl md:text-5xl font-semibold"
              style={{ color: "var(--pink)" }}
            >
              Real. Rich. Radiant
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl p-10 md:p-14 shadow-2xl"
          style={{ border: "2px solid rgba(255,105,180,0.15)" }}
        >
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Founded in{" "}
              <span className="font-semibold" style={{ color: "var(--pink)" }}>
                2025
              </span>{" "}
              by five passionate BBA Marketing students, Elvira Cosmetics was
              created with one clear vision — to make luxury beauty{" "}
              <span className="font-semibold">
                inclusive, accessible, and empowering
              </span>
              .
            </p>

            <p className="text-lg">
              We believe that everyone deserves to feel confident in their own
              skin, and our products are designed to celebrate every tone, every
              texture, and every story.
            </p>

            <p className="text-lg">
              At Elvira, we combine{" "}
              <span className="font-semibold">
                quality, innovation, and elegance
              </span>{" "}
              to craft cosmetics that don't just look good — they{" "}
              <span
                className="italic font-medium"
                style={{ color: "var(--pink)" }}
              >
                feel good
              </span>
              . From rich pigments to smooth textures, each product reflects our
              commitment to excellence and inclusivity.
            </p>

            <p className="text-lg">
              Stay ahead of the trend with our{" "}
              <span className="font-semibold" style={{ color: "var(--pink)" }}>
                "What's New"
              </span>{" "}
              section, featuring bi-monthly or quarterly launches that introduce
              the latest shades, limited editions, and beauty innovations.
            </p>

            <div
              className="pt-8 border-t-2 mt-8"
              style={{ borderColor: "var(--light-pink)" }}
            >
              <p className="text-xl font-medium text-gray-800 mb-4">
                Elvira Cosmetics is more than a brand — it's a{" "}
                <span style={{ color: "var(--pink)" }}>community</span> built on
                confidence, creativity, and care.
              </p>
              <p
                className="text-2xl font-playfair font-semibold italic mt-6"
                style={{ color: "var(--pink)" }}
              >
                Because at Elvira, every tone deserves its throne. 👑
              </p>
            </div>
          </div>

          {/* Decorative Quote Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-10 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 text-center"
          >
            <div className="text-5xl mb-4">✨</div>
            <p className="font-playfair text-xl italic text-gray-700">
              "Indulge in the art of beauty — soft textures, luminous colors,
              and timeless glow."
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-10"
          >
            <Link
              to="/"
              className="inline-block px-10 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--pink) 0%, #FF1493 100%)",
                color: "#fff",
              }}
            >
              Explore Our Collection 💄
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer Separator */}
      <div className="h-16 bg-gradient-to-b from-transparent to-pink-100" />

      <Footer />
    </div>
  );
}
