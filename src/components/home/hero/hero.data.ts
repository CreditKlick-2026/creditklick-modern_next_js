export interface SlideItem {
  id: number;
  text1: string;
  text2: string;
  text3: string;
  url: string;
  btntext: string;
  animation: "score" | "app" | "card" | "loan" | string;
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
    id: 2,
    text1: "THE WAIT IS OVER",
    text2: "OUR FINANCE APP IS HERE",
    text3: "Get all your credit histories in your hand, check your CRIF credit score and apply for various loans and cards.",
    url: "https://play.google.com/store/apps/details?id=com.creditklick.creditklick",
    btntext: "DOWNLOAD NOW",
    animation: "app",
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
  {
    id: 4,
    text1: "Instant Loan Approval",
    text2: "Enjoy Premium Benefits",
    text3: "100% Contactless Application Process with instant approval from top banks",
    url: "/loans",
    btntext: "APPLY FOR LOAN",
    animation: "loan",
  },
];
