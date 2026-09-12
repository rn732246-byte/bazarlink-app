import React, { createContext, useContext, useState, useEffect } from "react";

// এখানে নতুন ভাষা বা নতুন লেখা যোগ করা যাবে। প্রতিটা key-এর জন্য
// bn (বাংলা), en (English), hi (हिन्दी) — তিনটা ভাষায় লেখা আছে।
const translations = {
  appName: { bn: "Market Shope", en: "Market Shope", hi: "Market Shope" },
  chooseLanguage: { bn: "ভাষা বেছে নিন", en: "Choose language", hi: "भाषा चुनें" },
  loginPhonePrompt: {
    bn: "শুরু করতে আপনার ফোন নম্বর দিন",
    en: "Enter your phone number to get started",
    hi: "शुरू करने के लिए अपना फ़ोन नंबर दर्ज करें",
  },
  loginOtpPrompt: {
    bn: "নম্বরে পাঠানো ৬ সংখ্যার কোড দিন",
    en: "Enter the 6-digit code sent to your number",
    hi: "अपने नंबर पर भेजा गया 6 अंकों का कोड दर्ज करें",
  },
  selectCountry: { bn: "দেশ বেছে নিন", en: "Select country", hi: "देश चुनें" },
  phoneNumber: { bn: "ফোন নম্বর", en: "Phone number", hi: "फ़ोन नंबर" },
  sendCode: { bn: "কোড পাঠান", en: "Send code", hi: "कोड भेजें" },
  sending: { bn: "পাঠানো হচ্ছে...", en: "Sending...", hi: "भेजा जा रहा है..." },
  otpPlaceholder: { bn: "৬ সংখ্যার কোড", en: "6-digit code", hi: "6 अंकों का कोड" },
  verify: { bn: "যাচাই করুন", en: "Verify", hi: "सत्यापित करें" },
  verifying: { bn: "যাচাই হচ্ছে...", en: "Verifying...", hi: "सत्यापित हो रहा है..." },
  changeNumber: { bn: "নম্বর পরিবর্তন করুন", en: "Change number", hi: "नंबर बदलें" },
  invalidPhone: {
    bn: "সঠিক ফোন নম্বর দিন",
    en: "Please enter a valid phone number",
    hi: "कृपया सही फ़ोन नंबर दर्ज करें",
  },
  otpSendError: {
    bn: "কোড পাঠাতে সমস্যা হয়েছে — নম্বর ঠিক আছে কিনা দেখুন, আবার চেষ্টা করুন",
    en: "Couldn't send the code — check the number and try again",
    hi: "कोड नहीं भेजा जा सका — नंबर जांचें और फिर कोशिश करें",
  },
  invalidOtp: {
    bn: "৬ সংখ্যার কোডটি দিন",
    en: "Enter the 6-digit code",
    hi: "6 अंकों का कोड दर्ज करें",
  },
  otpVerifyError: {
    bn: "কোড মিলছে না — আবার চেষ্টা করুন",
    en: "That code didn't match — try again",
    hi: "कोड मेल नहीं खाया — फिर कोशिश करें",
  },
  dashboard: { bn: "ড্যাশবোর্ড", en: "Dashboard", hi: "डैशबोर्ड" },
  products: { bn: "পণ্য", en: "Products", hi: "उत्पाद" },
  orders: { bn: "অর্ডার", en: "Orders", hi: "ऑर्डर" },
  ledger: { bn: "খাতা", en: "Ledger", hi: "बही खाता" },
  profile: { bn: "প্রোফাইল", en: "Profile", hi: "प्रोफ़ाइल" },
  home: { bn: "হোম", en: "Home", hi: "होम" },
  category: { bn: "ক্যাটাগরি", en: "Category", hi: "श्रेणी" },
  cart: { bn: "কার্ট", en: "Cart", hi: "कार्ट" },
  reels: { bn: "রিলস", en: "Reels", hi: "रील्स" },
  logout: { bn: "লগআউট করুন", en: "Log out", hi: "लॉग आउट करें" },
  roleWholesale: { bn: "পাইকারি", en: "Wholesaler", hi: "थोक विक्रेता" },
  roleShop: { bn: "দোকানদার", en: "Shopkeeper", hi: "दुकानदार" },
  welcome: { bn: "স্বাগতম!", en: "Welcome!", hi: "स्वागत है!" },
  tagline: { bn: "স্মার্ট শপিং, সহজ জীবন", en: "Smart shopping, simple life", hi: "स्मार्ट शॉपिंग, आसान जीवन" },
  roleSubtitle: {
    bn: "আপনার প্রয়োজনীয় পণ্য এখন আরও সহজে",
    en: "Get what you need, more easily than ever",
    hi: "अब अपनी ज़रूरत का सामान और आसानी से पाएं",
  },
  roleWholesaleDesc: {
    bn: "আমি পাইকারি ব্যবসায়ী (বড় পরিমানে পণ্য কিনতে ও বিক্রি করতে চাই)",
    en: "I'm a wholesale trader (want to buy/sell in bulk)",
    hi: "मैं थोक व्यापारी हूँ (बड़ी मात्रा में खरीदना-बेचना चाहता हूँ)",
  },
  roleShopDesc: {
    bn: "আমি দোকানদার (খুচরা পণ্য কিনে আমার দোকানে বিক্রি করতে চাই)",
    en: "I'm a shopkeeper (want to buy retail goods for my shop)",
    hi: "मैं दुकानदार हूँ (अपनी दुकान के लिए सामान खरीदना चाहता हूँ)",
  },
};

export function t(key, lang) {
  return translations[key]?.[lang] || translations[key]?.bn || key;
}

const LanguageContext = createContext({ lang: "bn", setLang: () => {} });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("bazarlink_lang") || "bn");

  useEffect(() => {
    localStorage.setItem("bazarlink_lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang: setLangState }}>
      {children}
    </LanguageContext.Provider>
  );
}

// কম্পোনেন্টে ব্যবহার: const { lang, setLang, tt } = useLanguage();
export function useLanguage() {
  const { lang, setLang } = useContext(LanguageContext);
  const tt = (key) => t(key, lang);
  return { lang, setLang, tt };
}

// প্রায় সব দেশের ডায়ালিং কোড (সংক্ষিপ্ত, ব্যবহারযোগ্য তালিকা)
export const COUNTRIES = [
  { code: "BD", name: "Bangladesh", dial: "880" },
  { code: "IN", name: "India", dial: "91" },
  { code: "PK", name: "Pakistan", dial: "92" },
  { code: "NP", name: "Nepal", dial: "977" },
  { code: "LK", name: "Sri Lanka", dial: "94" },
  { code: "MM", name: "Myanmar", dial: "95" },
  { code: "US", name: "United States", dial: "1" },
  { code: "GB", name: "United Kingdom", dial: "44" },
  { code: "CA", name: "Canada", dial: "1" },
  { code: "AE", name: "UAE", dial: "971" },
  { code: "SA", name: "Saudi Arabia", dial: "966" },
  { code: "QA", name: "Qatar", dial: "974" },
  { code: "KW", name: "Kuwait", dial: "965" },
  { code: "OM", name: "Oman", dial: "968" },
  { code: "MY", name: "Malaysia", dial: "60" },
  { code: "SG", name: "Singapore", dial: "65" },
  { code: "AU", name: "Australia", dial: "61" },
  { code: "DE", name: "Germany", dial: "49" },
  { code: "FR", name: "France", dial: "33" },
  { code: "IT", name: "Italy", dial: "39" },
  { code: "JP", name: "Japan", dial: "81" },
  { code: "CN", name: "China", dial: "86" },
  { code: "ZA", name: "South Africa", dial: "27" },
  { code: "NG", name: "Nigeria", dial: "234" },
  { code: "BR", name: "Brazil", dial: "55" },
];
