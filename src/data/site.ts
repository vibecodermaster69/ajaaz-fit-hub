import reel1 from "@/assets/gallery/reel-1.jpg";
import reel2 from "@/assets/gallery/reel-2.jpg";
import reel3 from "@/assets/gallery/reel-3.jpg";

export const SITE = {
  name: "Ajaaz Fitmode",
  coach: "Ajaaz",
  tagline: "Certified Nutritionist & Fitness Coach",
  youtube: "https://www.youtube.com/@ajaaz.fitmode",
  email: "ansariajaaz9@gmail.com",
  instagram: "https://www.instagram.com/ajaaz.fitmode?igsh=MXR5MDNlMTQ5dGtiNg==",
  whatsapp: "+910000000000",
  clientsServed: "150+",
};

export const SERVICES = [
  {
    title: "Personalised Training",
    body: "Progressive overload plans built around your body type, schedule and equipment access — home or gym.",
  },
  {
    title: "Nutrition Coaching",
    body: "Macro-mapped meal plans using food you actually eat. No crash diets, no imported supplements.",
  },
  {
    title: "Fat Loss Transformation",
    body: "Structured deficits, cardio protocols and weekly check-ins that keep the scale moving without burnout.",
  },
  {
    title: "Muscle Gain & Strength",
    body: "Lean bulking blueprints with strength benchmarks so you add size, not just weight.",
  },
  {
    title: "Form & Technique Review",
    body: "Send your lift videos, get frame-by-frame corrections that protect your joints and grow your lifts.",
  },
  {
    title: "Lifestyle & Habit Coaching",
    body: "Sleep, steps, stress and recovery — the unsexy levers that decide whether the plan actually works.",
  },
];

export const PACKAGES = [
  {
    name: "Kickstart",
    duration: "1 Month",
    tag: "Test the waters",
    featured: false,
    features: [
      "Custom workout plan",
      "Personalised diet chart",
      "WhatsApp support (weekdays)",
      "1 check-in call",
      "Form correction over video",
    ],
  },
  {
    name: "Transformation",
    duration: "3 Months",
    tag: "Most chosen",
    featured: true,
    features: [
      "Everything in Kickstart",
      "Monthly plan progression",
      "Weekly check-ins & adjustments",
      "Supplement guidance",
      "Priority WhatsApp support",
      "Eating-out & travel protocols",
    ],
  },
  {
    name: "Elite Coaching",
    duration: "6 Months",
    tag: "Full rebuild",
    featured: false,
    features: [
      "Everything in Transformation",
      "Bi-weekly video calls",
      "Contest / event prep support",
      "Advanced periodised programming",
      "Habit & recovery coaching",
      "Lifetime maintenance plan",
    ],
  },
];

export const FAQS = [
  {
    q: "Do I need a gym membership to train with Ajaaz?",
    a: "No. Plans are built around whatever you have access to — a full gym, a set of dumbbells, or just bodyweight at home.",
  },
  {
    q: "Is the diet plan vegetarian friendly?",
    a: "Absolutely. Plans are built from food you already eat, whether you're vegetarian, eggetarian, non-veg or vegan.",
  },
  {
    q: "How do I pay for a package?",
    a: "There is no online checkout here. Send an enquiry through the Get in Touch page and Ajaaz will personally walk you through pricing and payment.",
  },
  {
    q: "How soon will I see results?",
    a: "Most clients notice strength and energy changes in 3-4 weeks, and visible body composition changes by week 8 — provided training and nutrition compliance stays high.",
  },
  {
    q: "Will I be asked to buy expensive supplements?",
    a: "Never. Supplements are optional and only recommended when food alone can't close a gap.",
  },
  {
    q: "What if I have an injury or a medical condition?",
    a: "Share it during your enquiry. Programming is adapted around injuries, and Ajaaz will ask you to clear anything medical with your doctor first.",
  },
  {
    q: "How often do plans get updated?",
    a: "Training and nutrition are reviewed at every check-in and progressed at least once a month so you never plateau.",
  },
];

export type Reel = {
  url: string;
  caption: string;
  image: string;
  likes: number;
};

export const REELS: Reel[] = [
  {
    url: "https://www.instagram.com/p/DT7zQ86jWys/",
    caption: "Full-body finisher that leaves nothing left in the tank",
    image: reel1,
    likes: 482,
  },
  {
    url: "https://www.instagram.com/ajaaz.fitmode/reel/DUI1LnEjdSQ/",
    caption: "The cue that fixes shoulder pain on pressing movements",
    image: reel2,
    likes: 361,
  },
  {
    url: "https://www.instagram.com/ajaaz.fitmode/reel/DUYRhfGCMa-/",
    caption: "A real client transformation, explained in 30 seconds",
    image: reel3,
    likes: 597,
  },
];
