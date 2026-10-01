/**
 * Returns a Promise that resolves to the global lottie instance.
 * Checks for window.lottie, and if not present, loads /js/lottie.min.js reliably.
 */
export function getLottie(): Promise<any> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }

    if ((window as any).lottie) {
      resolve((window as any).lottie);
      return;
    }

    // If script isn't in DOM, add it
    let script = document.getElementById("lottie-global") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "lottie-global";
      script.src = "/js/lottie.min.js";
      script.async = true;
      document.head.appendChild(script);
    }

    const checkInterval = setInterval(() => {
      if ((window as any).lottie) {
        clearInterval(checkInterval);
        resolve((window as any).lottie);
      }
    }, 30);

    script.addEventListener("load", () => {
      if ((window as any).lottie) {
        clearInterval(checkInterval);
        resolve((window as any).lottie);
      }
    });

    // Timeout fallback after 10s
    setTimeout(() => {
      clearInterval(checkInterval);
      resolve((window as any).lottie || null);
    }, 10000);
  });
}
