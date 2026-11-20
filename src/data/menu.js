// The menu. Add, remove or edit dishes here.
// - image: a file in /public/images
// - description: plain explanation for people who have never had the dish
// - tagline: the TopWoman joke line
// - price: leave null to show "Price on WhatsApp", or put a number like 250 (shown as ₺250)

export const CATEGORIES = [
  { id: "all", label: "All dishes" },
  { id: "stews", label: "Stews & soups" },
  { id: "rice", label: "Rice" },
  { id: "grills", label: "Fish & grills" },
  { id: "snacks", label: "Snacks" },
];

export const MENU = [
  {
    id: "palm-butter",
    name: "Palm Butter",
    category: "stews",
    image: "/images/palm-butter.webp",
    description: "Rich, velvety stew made from palm nut cream, cooked with meat and seafood. Served with rice.",
    tagline: "Hot, thick, and romantic to your stomach.",
    tags: ["House favourite"],
    price: null,
  },
  {
    id: "cassava-leaf",
    name: "Cassava Leaf",
    category: "stews",
    image: "/images/cassava-leaf.webp",
    description: "Finely pounded cassava leaves slow-cooked in palm oil with meat and fish. Served with rice.",
    tagline: "Tastes like pepperoni pizza. Don't ask, just try it.",
    tags: [],
    price: null,
  },
  {
    id: "potato-greens",
    name: "Potato Greens",
    category: "stews",
    image: "/images/potato-greens.webp",
    description: "Sweet potato leaves cooked down in red palm oil with meat and fish. Served with rice.",
    tagline: "Beauty for the eyes, virtue for the belly.",
    tags: [],
    price: null,
  },
  {
    id: "toborgee",
    name: "Toborgee",
    category: "stews",
    image: "/images/toborgee.webp",
    // TODO: check this description with TopWoman
    description: "A traditional Liberian stew of greens, palm oil and pepper with a deep, earthy flavour. Served with rice.",
    tagline: "One taste and you'll be calling for more.",
    tags: ["Old-school"],
    price: null,
  },
  {
    id: "pepper-soup",
    name: "Pepper Soup & Fufu",
    category: "stews",
    image: "/images/pepper-soup.webp",
    description: "Hot, peppery meat broth with soft fufu (a smooth cassava dough) for dipping.",
    tagline: "Cures cold weather and bad moods.",
    tags: ["Spicy"],
    price: null,
  },
  {
    id: "dry-rice",
    name: "The TopWoman Dry Rice",
    category: "rice",
    image: "/images/dry-rice.webp",
    description: "Our house special: seasoned rice loaded with fish, chicken and luncheon meat.",
    tagline: "Fish talking to chicken, luncheon meat backing them up. Pure fire.",
    tags: ["House special"],
    price: null,
  },
  {
    id: "jollof",
    name: "Liberian Jollof Rice",
    category: "rice",
    image: "/images/jollof.webp",
    description: "Rice cooked in a spiced tomato and pepper base, served with chicken.",
    tagline: "The rice that starts friendly arguments.",
    tags: ["Good first try"],
    price: null,
  },
  {
    id: "fried-fish-rice",
    name: "Fried Fish & Rice",
    category: "rice",
    image: "/images/fried-fish-rice.webp",
    description: "Fried fish and chicken with white rice, boiled egg and pepper sauce on the side.",
    tagline: "Fried until it tells the truth.",
    tags: [],
    price: null,
  },
  {
    id: "fish-plantain",
    name: "Grilled Fish, Plantain & Sauce",
    category: "grills",
    image: "/images/fish-plantain.webp",
    description: "Whole grilled fish with sweet fried plantain and pepper sauce.",
    tagline: "Golden plantain, juicy fish, stew behaving like a holiday.",
    tags: ["Good first try"],
    price: null,
  },
  {
    id: "pepper-meat",
    name: "Pepper Meat",
    category: "grills",
    image: "/images/pepper-meat.webp",
    // TODO: confirm name — photo is grilled meat skewers
    description: "Spiced grilled meat on skewers with a proper pepper kick.",
    tagline: "Smoke, spice and no regrets.",
    tags: ["Spicy"],
    price: null,
  },
  {
    id: "pepper-kala",
    name: "Pepper Kala",
    category: "snacks",
    image: "/images/pepper-kala.webp",
    description: "Kala: golden fried dough balls, Liberia's favourite street snack, with a pepper twist.",
    tagline: "You'll say “just one”. You'll be lying.",
    tags: ["Snack"],
    price: null,
  },
];

// Shown in the "New to Liberian food?" section
export const STARTER_PICKS = ["jollof", "fish-plantain", "palm-butter"];

export const GLOSSARY = [
  { term: "Fufu", meaning: "A soft, stretchy dough made from cassava. Pinch some off and dip it in soup." },
  { term: "Palm butter", meaning: "A creamy sauce made from the pulp of palm nuts. Rich, not oily." },
  { term: "Kala", meaning: "Fried dough balls, a bit like doughnut holes. Breakfast, snack, anytime." },
  { term: "Potato greens", meaning: "The leaves of the sweet potato plant, cooked down like spinach." },
  { term: "Dry rice", meaning: "Liberian-style seasoned rice cooked with meats, not plain boiled rice." },
  { term: "Pepper", meaning: "Liberians mean it. Tell us how hot you can handle when you order." },
];
