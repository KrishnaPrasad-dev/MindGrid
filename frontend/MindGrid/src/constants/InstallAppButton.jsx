import { useEffect, useState } from "react";

const InstallAppButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={installApp}
        className="relative p-[2px] inline-flex items-center justify-center font-semibold overflow-hidden rounded-xl group"
      >
        {/* Premium gradient border */}
        <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-fuchsia-500 opacity-90 group-hover:opacity-100 transition duration-300"></span>

        {/* Inner button */}
        <span className="relative flex items-center gap-3 px-7 py-3 bg-gray-900 rounded-xl transition-all duration-300 group-hover:bg-transparent backdrop-blur-md">
          
          {/* Text */}
          <span className="text-white text-lg tracking-wide">
            Install MindGrid
          </span>

          {/* Arrow icon */}
          <svg
            className="w-5 h-5 text-pink-300 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>

        </span>
      </button>
    </div>
  );
};

export default InstallAppButton;