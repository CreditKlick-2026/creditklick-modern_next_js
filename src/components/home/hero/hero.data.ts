export interface SlideItem {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  url: string;
  btntext: string;
  animation: "score" | "app" | "card" | string;
}

export const DEFAULT_SLIDES: SlideItem[] = [
  {
    id: 1,
    text1: "Get Your Latest & FREE",
    text2: "Credit Report",
    text3: "The smart choice when it comes to finding credit that's just right for you",
    url: "/credit-score",
    btntext: "CHECK FREE CREDIT SCORE",
    animation: "score",
  },

  {
    id: 3,
    text1: "Instant Credit Card Approval",
    text2: "Enjoy Premium Benefits",
    text3: "100% Contactless Application Process with instant approval from top banks",
    url: "/credit-cards",
    btntext: "APPLY FOR CREDIT CARD",
    animation: "card",
  },
];
