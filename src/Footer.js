import React from "react";

export default function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/elvirabeauty2025?utm_source=ig_web_button_share_sheet&igsh=MXVuMXgxemJjODY2bw==",
      icon: "https://cdn.simpleicons.org/instagram/FF69B4",
      handle: "elvirabeauty2025",
    },
    {
      name: "X (Twitter)",
      url: "https://twitter.com/elvira78058",
      icon: "https://cdn.simpleicons.org/x/1DA1F2",
      handle: "Elvira",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/elvira-cosmetics/",
      icon: "https://cdn.simpleicons.org/linkedin",
      handle: "Elvira Cosmetics",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@ElviraBeautyforAll",
      icon: "https://cdn.simpleicons.org/youtube/FF0000",
      handle: "@elvirabeauty",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/1A4W8uXSHy/",
      icon: "https://cdn.simpleicons.org/facebook/1877F2",
      handle: "Elvira Forall ",
    },
  ];

  return (
    <>
      {/* Social Section */}
      <section className="bg-gradient-to-r from-pink-50 to-purple-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="font-playfair text-4xl mb-4"
            style={{ color: "var(--pink)" }}
          >
            Let’s Stay Connected 💕
          </h2>
          <p className="text-gray-600 mb-10 text-lg">
            Join us for beauty insights, new launches, and radiant inspiration
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 border border-pink-100 hover:border-pink-300 flex flex-col items-center"
              >
                {social.name === "LinkedIn" ? (
                  <div className="w-12 h-12 mb-3 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="w-full h-full"
                    >
                      <path
                        d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                        fill="blue"
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-12 h-12 mb-3"
                  />
                )}
                <div className="font-semibold text-gray-800">{social.name}</div>
                <div className="text-sm mt-1" style={{ color: "var(--pink)" }}>
                  {social.handle}
                </div>
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 text-gray-700 text-sm md:text-base space-y-2">
            <div>
              📞 Call us at{" "}
              <span className="font-semibold" style={{ color: "var(--pink)" }}>
                +91 98765 43210
              </span>
            </div>
            <div>
              ✉️ Email us at{" "}
              <a
                href="mailto:hello@elvirabeauty.com"
                className="font-semibold hover:underline"
                style={{ color: "var(--pink)" }}
              >
                hello@elvirabeauty.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-10 text-sm"
        style={{
          background: "linear-gradient(180deg, #111 0%, #000 100%)",
          color: "#fff",
          borderTop: "3px solid var(--pink)",
        }}
      >
        <div
          className="font-playfair text-lg mb-2"
          style={{ color: "var(--pink)" }}
        >
          Real. Rich. Radiant ✨
        </div>

        <div className="mb-3">
          © {new Date().getFullYear()} Elvira Beauty. All rights reserved.
        </div>

        <div className="text-xs text-gray-400 max-w-2xl mx-auto px-4 mb-3">
          Disclaimer!!! This website is intended solely for educational and
          informational purposes. All product images, logos, trademarks, and
          brand references are used only for demonstration or illustrative
          purposes. We are not affiliated with, endorsed by, or associated with
          any of the companies, brands, or products featured on this site. All
          content provided herein is for academic learning, research, and
          non-commercial use. Any resemblance to actual commercial materials or
          entities is purely coincidental. By using this website, you agree to
          our Terms and Conditions of Service, which outline the acceptable use
          of the site, intellectual property guidelines, and user
          responsibilities. Please review them carefully before proceeding.
        </div>

        <div className="text-xs text-gray-500 italic">
          Every tone deserves its throne 👑
        </div>
      </footer>
    </>
  );
}
