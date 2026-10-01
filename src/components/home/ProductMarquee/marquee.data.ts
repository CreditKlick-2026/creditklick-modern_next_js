export interface MarqueeProduct {
  link: string;
  img: string;
  title: string;
  tag: string;
}

const ccico = "/images/heroimages/ccgifw.webp";
const calico = "/images/heroimages/calc2.webp";
const credscore = "/images/heroimages/credscore2.webp";
const refineico = "/images/heroimages/refine2.webp";

export const PRODUCT_DATA: readonly MarqueeProduct[] = [
  {
    link: "/credit-score",
    img: credscore,
    title: "Credit Score",
    tag: "Free Report",
  },
  {
    link: "/credit-cards",
    img: ccico,
    title: "Credit Cards",
    tag: "Instant Approval",
  },
  {
    link: "/refine",
    img: refineico,
    title: "Credit Refine",
    tag: "Boost Score",
  },
  {
    link: "/calculators",
    img: calico,
    title: "Calculators",
    tag: "EMI & Tools",
  },
] as const;
