import React, { useState, useEffect } from "react";
import {
  Gift, Bell, HelpCircle, BarChart3, Package, Receipt, BookOpen, User,
  Warehouse, Store, ArrowRight, ChevronLeft, Plus, X, CheckCircle2,
  Store as ShopIcon, MapPin, Phone, FileText, Send, ShoppingBag,
  Search, Mic, Smartphone, Shirt, Home as HomeIcon, Sparkles, UtensilsCrossed,
  Dumbbell, Moon, ShoppingCart, Grid3x3, PlayCircle, Loader2,
} from "lucide-react";
import { useAuthUser } from "./hooks/useAuthUser";
import { useProfile } from "./hooks/useProfile";
import { useProducts } from "./hooks/useProducts";
import { useOrders } from "./hooks/useOrders";
import { LanguageProvider, useLanguage } from "./lib/i18n";

const ORANGE = "#E8622C";
const CREAM = "#FBEEE3";
const BLUE = "#1a5fb4";

/**
 * ফোন নম্বর দিয়ে লগইন — প্রথমে OTP পাঠায়, তারপর কোড যাচাই করে।
 * যেকোনো ডিভাইস থেকে একই নম্বর দিয়ে লগইন করলে একই প্রোফাইল/পণ্য/অর্ডার
 * ফিরে পাওয়া যাবে। দেশ ও ভাষা দুটোই এখান থেকে বেছে নেওয়া যায়।
 */
function TopBar({ onBack }) {
  const { tt } = useLanguage();
  return (
    <div style={{ background: ORANGE }} className="px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-white">
        {onBack && (
          <button onClick={onBack} className="mr-1">
            <ChevronLeft size={22} />
          </button>
        )}
        <Gift size={20} />
        <span className="font-semibold text-[17px]">{tt("appName")}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="bg-white/25 rounded-full p-2">
          <Bell size={16} className="text-white" />
        </div>
        <div className="bg-white/25 rounded-full p-2">
          <HelpCircle size={16} className="text-white" />
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active, onChange }) {
  const { tt } = useLanguage();
  const items = [
    { key: "dashboard", label: tt("dashboard"), icon: BarChart3 },
    { key: "products", label: tt("products"), icon: Package },
    { key: "orders", label: tt("orders"), icon: Receipt },
    { key: "ledger", label: tt("ledger"), icon: BookOpen },
    { key: "profile", label: tt("profile"), icon: User },
  ];
  return (
    <div className="border-t bg-white flex justify-between px-1 py-2">
      {items.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className="flex-1 flex flex-col items-center gap-0.5 py-1"
        >
          <Icon size={20} color={active === key ? ORANGE : "#8a8a8a"} />
          <span className="text-[11px]" style={{ color: active === key ? ORANGE : "#8a8a8a" }}>
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      <Icon size={48} className="text-sky-400 mb-4" strokeWidth={1.5} />
      <p className="text-gray-500 text-[14px] leading-relaxed">{text}</p>
    </div>
  );
}

function RoleScreen({ onPick }) {
  const { lang, setLang, tt } = useLanguage();
  return (
    <div className="min-h-full flex flex-col bg-white px-6 pt-8 pb-6">
      <div className="flex justify-end gap-2 mb-4">
        {[
          { code: "bn", label: "বাংলা" },
          { code: "en", label: "English" },
          { code: "hi", label: "हिन्दी" },
        ].map((l) => (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className="px-3 py-1 rounded-full text-[12px] font-medium border"
            style={
              lang === l.code
                ? { background: ORANGE, color: "white", borderColor: ORANGE }
                : { color: "#888", borderColor: "#ddd" }
            }
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-gradient-to-br from-pink-500 to-indigo-500 p-2.5 rounded-xl">
          <ShoppingBag size={26} className="text-white" />
        </div>
        <div>
          <div className="text-[26px] font-bold leading-none">{tt("appName")}</div>
          <div className="text-gray-400 text-[12px]">{tt("tagline")}</div>
        </div>
      </div>
      <h1 className="text-[22px] font-bold mt-6 mb-1">{tt("welcome")}</h1>
      <p className="text-gray-500 text-[14px] mb-6 leading-relaxed">
        {tt("roleSubtitle")}
      </p>

      <button
        onClick={() => onPick("পাইকারি")}
        className="w-full text-left border-2 rounded-2xl p-5 mb-4 flex items-center justify-between"
        style={{ borderColor: "#bfdcf7", background: "#eef7ff" }}
      >
        <div className="flex items-center gap-4">
          <div className="bg-sky-600 p-3 rounded-full">
            <Warehouse size={24} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-[17px]">{tt("roleWholesale")}</div>
            <div className="text-gray-500 text-[12px] leading-snug">
              {tt("roleWholesaleDesc")}
            </div>
          </div>
        </div>
        <div className="bg-sky-600 rounded-full p-2 shrink-0">
          <ArrowRight size={16} className="text-white" />
        </div>
      </button>

      <button
        onClick={() => onPick("দোকানদার")}
        className="w-full text-left border-2 rounded-2xl p-5 flex items-center justify-between"
        style={{ borderColor: "#bfe8c9", background: "#eefaf1" }}
      >
        <div className="flex items-center gap-4">
          <div className="bg-green-600 p-3 rounded-full">
            <Store size={24} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-[17px]">{tt("roleShop")}</div>
            <div className="text-gray-500 text-[12px] leading-snug">
              {tt("roleShopDesc")}
            </div>
          </div>
        </div>
        <div className="bg-green-600 rounded-full p-2 shrink-0">
          <ArrowRight size={16} className="text-white" />
        </div>
      </button>
    </div>
  );
}

const REQUIRED_DOCS = [
  { key: "front", label: "জাতীয় পরিচয়পত্র (সামনে)" },
  { key: "back", label: "জাতীয় পরিচয়পত্র (পেছনে)" },
  { key: "license", label: "ব্যবসার লাইসেন্স" },
  { key: "shopPhoto", label: "দোকানের ছবি" },
];

function VerifyScreen({ onBack, onSubmit }) {
  const [form, setForm] = useState({
    shop: "", owner: "", phone: "", address: "", type: "", nid: "", trade: "",
  });
  const [docs, setDocs] = useState({ front: false, back: false, license: false, shopPhoto: false });
  const [error, setError] = useState("");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const toggleDoc = (k) => setDocs({ ...docs, [k]: !docs[k] });

  const submit = () => {
    if (form.shop.trim().length < 3) return setError("ব্যবসার নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
    if (form.owner.trim().length < 3) return setError("মালিকের পূর্ণ নাম দিন");
    if (!/^01[3-9]\d{8}$/.test(form.phone.trim())) return setError("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমনঃ 01XXXXXXXXX)");
    if (!/^(\d{10}|\d{13}|\d{17})$/.test(form.nid.trim())) return setError("জাতীয় পরিচয়পত্র নম্বর ১০, ১৩ বা ১৭ ডিজিটের হতে হবে");
    if (form.trade.trim().length < 4) return setError("ব্যবসার লাইসেন্স / ট্রেড লাইসেন্স নম্বর দিন");
    if (form.address.trim().length < 10) return setError("সম্পূর্ণ ঠিকানা বিস্তারিতভাবে লিখুন");
    if (!form.type) return setError("পণ্যের ধরন নির্বাচন করুন");
    const missingDoc = REQUIRED_DOCS.find((d) => !docs[d.key]);
    if (missingDoc) return setError(`"${missingDoc.label}" আপলোড করা বাধ্যতামূলক`);
    setError("");
    onSubmit(form);
  };

  return (
    <div className="min-h-full bg-white overflow-y-auto">
      <div style={{ background: ORANGE }} className="px-5 pt-5 pb-6">
        <button onClick={onBack} className="text-white mb-3">
          <ChevronLeft size={22} />
        </button>
        <div className="flex items-center gap-2 text-white mb-1">
          <Warehouse size={24} />
          <span className="font-bold text-[18px]">পাইকারি ভেরিফিকেশন</span>
        </div>
        <p className="text-white/85 text-[12px]">
          পাইকারি অ্যাকাউন্ট খোলার জন্য নিচের সব তথ্য ও ডকুমেন্ট সঠিকভাবে দিতে হবে — যাচাইয়ের পর অ্যাকাউন্ট চালু হবে
        </p>
      </div>

      <div className="p-5">
        <h2 className="font-bold text-[15px] mb-3 flex items-center gap-2">
          <Store size={16} /> ব্যবসার তথ্য
        </h2>

        <label className="block text-[13px] text-gray-600 mb-1">ব্যবসার নাম</label>
        <input value={form.shop} onChange={set("shop")} placeholder="আপনার ব্যবসার নাম লিখুন"
          className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

        <label className="block text-[13px] text-gray-600 mb-1">মালিকের নাম</label>
        <input value={form.owner} onChange={set("owner")} placeholder="আপনার পূর্ণ নাম লিখুন"
          className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

        <label className="block text-[13px] text-gray-600 mb-1">মোবাইল নম্বর</label>
        <input value={form.phone} onChange={set("phone")} placeholder="০১XXXXXXXXX" maxLength={11}
          className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

        <label className="block text-[13px] text-gray-600 mb-1">জাতীয় পরিচয়পত্র (NID) নম্বর</label>
        <input value={form.nid} onChange={set("nid")} placeholder="১০ / ১৩ / ১৭ ডিজিট"
          className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

        <label className="block text-[13px] text-gray-600 mb-1">ব্যবসার লাইসেন্স / ট্রেড লাইসেন্স নম্বর</label>
        <input value={form.trade} onChange={set("trade")} placeholder="লাইসেন্স নম্বর লিখুন"
          className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

        <label className="block text-[13px] text-gray-600 mb-1">ব্যবসার ঠিকানা</label>
        <input value={form.address} onChange={set("address")} placeholder="সম্পূর্ণ ঠিকানা লিখুন"
          className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

        <label className="block text-[13px] text-gray-600 mb-1">পণ্যের ধরন</label>
        <select value={form.type} onChange={set("type")} className="w-full border rounded-xl px-3 py-2.5 mb-4 text-[14px] text-gray-700">
          <option value="">নির্বাচন করুন</option>
          <option>মুদি ও খাদ্যপণ্য</option>
          <option>পোশাক ও ফ্যাশন</option>
          <option>ইলেকট্রনিক্স</option>
          <option>অন্যান্য</option>
        </select>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {REQUIRED_DOCS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => toggleDoc(key)}
              className="border-dashed border-2 rounded-xl p-3 flex flex-col items-center gap-1 text-center"
              style={{ borderColor: docs[key] ? "#1a9e5c" : "#c9c9c9", background: docs[key] ? "#eefaf1" : "white" }}
            >
              {docs[key] ? <CheckCircle2 size={20} className="text-green-600" /> : <FileText size={20} className="text-sky-500" />}
              <span className="text-[11px] text-gray-500 leading-tight">{label}</span>
              <span className="text-[11px] font-medium" style={{ color: docs[key] ? "#1a9e5c" : "#1a7fd6" }}>
                {docs[key] ? "আপলোড হয়েছে" : "ছবি আপলোড করুন"}
              </span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-[13px] mb-3">{error}</p>}

        <button onClick={submit} className="w-full text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2" style={{ background: BLUE }}>
          <Send size={16} /> সাবমিট করুন
        </button>
      </div>
    </div>
  );
}

function StatCard({ value, label, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 flex-1">
      <div className="text-[22px] font-bold" style={{ color }}>{value}</div>
      <div className="text-gray-500 text-[12px] mt-1">{label}</div>
    </div>
  );
}

function OrderRow({ order }) {
  return (
    <div className="bg-white border rounded-xl p-3 mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[13px] font-medium">
          {(order.items || []).map((i) => i.name).join(", ")}
        </span>
        <span className="text-[13px] font-bold text-green-700">৳{order.total}</span>
      </div>
      <div className="text-[12px] text-gray-500 flex items-center gap-1">
        <MapPin size={12} /> {order.address}
      </div>
    </div>
  );
}

function DashboardTab({ name, showVerifyBanner, stats, recentOrders = [] }) {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="text-[20px] font-bold mb-3">স্বাগতম, {name} 👋</h1>

      {showVerifyBanner && (
        <div className="border border-dashed border-orange-400 bg-orange-50 rounded-xl px-3 py-2.5 mb-4 text-[13px] text-orange-600">
          আপনার একাউন্ট ভেরিফিকেশনের অপেক্ষায় আছে — অ্যাডমিন শীঘ্রই যাচাই করবে
        </div>
      )}

      <div className="flex gap-3 mb-3">
        <StatCard value={stats.products} label="মোট পণ্য" color="#e8622c" />
        <StatCard value={stats.orders} label="মোট অর্ডার" color="#1a7a3c" />
      </div>
      <div className="flex gap-3 mb-3">
        <StatCard value={stats.active} label="চলমান অর্ডার" color="#e8622c" />
        <StatCard value={`৳${stats.sales}`} label="মোট বিক্রি" color="#1a7a3c" />
      </div>
      <div className="mb-5">
        <StatCard value={`৳${stats.due}`} label="মোট বাকি (খাতা)" color="#c0392b" />
      </div>

      <h2 className="font-bold text-[15px] mb-3">সাম্প্রতিক অর্ডার</h2>
      {recentOrders.length === 0 ? (
        <EmptyState icon={Receipt} text="এখনও কোনো অর্ডার আসেনি" />
      ) : (
        <div>
          {recentOrders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsTab({ products, loading, onAdd }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!name.trim() || !price.trim()) {
      setError("পণ্যের নাম ও দাম দিন");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onAdd({ name, price });
      setName("");
      setPrice("");
      setShowForm(false);
    } catch (err) {
      setError("পণ্য যোগ করতে সমস্যা হয়েছে — আবার চেষ্টা করুন");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="px-4 pt-4 pb-6 relative min-h-[70vh]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-[16px]">আমার পণ্যসমূহ ({products.length})</h1>
        {products.length === 0 && !loading && (
          <span className="text-gray-400 text-[13px] flex items-center gap-1">
            <Plus size={14} /> বাটনে চাপুন যোগ করতে
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400 text-[13px] gap-2">
          <Loader2 size={16} className="animate-spin" /> লোড হচ্ছে...
        </div>
      ) : products.length === 0 ? (
        <EmptyState icon={Package} text={"এখনও কোনো পণ্য যোগ করেননি — নিচের + বাটনে চাপুন"} />
      ) : (
        <div className="flex flex-col gap-2">
          {products.map((p, i) => (
            <div key={i} className="bg-white border rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 p-2 rounded-lg">
                  <Package size={18} className="text-orange-500" />
                </div>
                <span className="text-[14px] font-medium">{p.name}</span>
              </div>
              <span className="text-[14px] font-semibold text-green-700">৳{p.price}</span>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => setShowForm(true)} className="absolute bottom-2 right-2 rounded-full p-4 shadow-lg" style={{ background: "#1a9e5c" }}>
        <Plus size={22} className="text-white" />
      </button>

      {showForm && (
        <div className="fixed inset-0 flex items-end justify-center z-10" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-t-2xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[15px]">নতুন পণ্য যোগ করুন</h3>
              <button onClick={() => setShowForm(false)}><X size={20} /></button>
            </div>
            <label className="block text-[13px] text-gray-600 mb-1">পণ্যের নাম</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="যেমনঃ চাল, তেল, সাবান"
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />
            <label className="block text-[13px] text-gray-600 mb-1">দাম (৳)</label>
            <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="০" inputMode="numeric"
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />
            {error && <p className="text-red-500 text-[13px] mb-3">{error}</p>}
            <button onClick={submit} disabled={saving} className="w-full text-white rounded-xl py-3 font-semibold disabled:opacity-60" style={{ background: "#1a9e5c" }}>
              {saving ? "সংরক্ষণ হচ্ছে..." : "পণ্য যোগ করুন"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OrdersTab({ orders = [] }) {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="font-bold text-[16px] mb-4">সকল অর্ডার ({orders.length})</h1>
      {orders.length === 0 ? (
        <EmptyState icon={Receipt} text="এখনও কোনো অর্ডার আসেনি" />
      ) : (
        <div>
          {orders.map((o) => (
            <OrderRow key={o.id} order={o} />
          ))}
        </div>
      )}
    </div>
  );
}

function LedgerTab() {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="font-bold text-[16px] mb-4">খাতা (বাকির হিসাব)</h1>
      <EmptyState icon={BookOpen} text="এখনও কোনো গ্রাহকের বাকি যোগ করেননি" />
    </div>
  );
}

/**
 * Google দিয়ে বর্তমান পরিচয় সংযুক্ত করার বাটন — যাতে অন্য ফোন/ব্রাউজার
 * থেকে খুললেও প্রোফাইল-পণ্য-অর্ডার ফিরে পাওয়া যায়।
 */
function ConnectGoogleBox({ isAnonymous, connectGoogle }) {
  const { tt } = useLanguage();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");
  const [switching, setSwitching] = useState(false);

  const handleConnect = async () => {
    setError("");
    setConnecting(true);
    try {
      const result = await connectGoogle();
      if (result?.switchedToExisting) setSwitching(true);
    } catch (err) {
      console.error(err);
      setError(tt("connectError"));
    } finally {
      setConnecting(false);
    }
  };

  if (switching) {
    return (
      <div className="mt-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-[12px] px-3 py-2">
        {tt("switchedAccount")}
      </div>
    );
  }

  if (!isAnonymous) {
    return (
      <div className="mt-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-[13px] px-3 py-2.5 text-center">
        {tt("connectedGoogle")}
      </div>
    );
  }

  return (
    <div className="mt-4 border rounded-xl p-3">
      <p className="text-gray-500 text-[12px] mb-2 leading-relaxed">{tt("connectGoogleDesc")}</p>
      {error && <p className="text-red-500 text-[12px] mb-2">{error}</p>}
      <button
        onClick={handleConnect}
        disabled={connecting}
        className="w-full border-2 rounded-xl py-2.5 font-semibold text-[13px] disabled:opacity-60"
        style={{ borderColor: ORANGE, color: ORANGE }}
      >
        {connecting ? tt("connecting") : tt("connectGoogle")}
      </button>
    </div>
  );
}

function ProfileTab({ form, verified, role, onUpdate, isAnonymous, connectGoogle }) {
  const { tt } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(form || { shop: "", owner: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const rows = [
    { icon: ShopIcon, label: "ব্যবসার নাম", value: form?.shop || "—" },
    { icon: User, label: "মালিকের নাম", value: form?.owner || "—" },
    { icon: Phone, label: "মোবাইল নম্বর", value: form?.phone || "—" },
    { icon: MapPin, label: "ঠিকানা", value: form?.address || "—" },
  ];

  const openEdit = () => {
    setDraft(form || { shop: "", owner: "", phone: "", address: "" });
    setError("");
    setEditing(true);
  };

  const save = async () => {
    if (!draft.shop?.trim() || !draft.owner?.trim() || !draft.phone?.trim() || !draft.address?.trim()) {
      setError("সব তথ্য পূরণ করুন");
      return;
    }
    try {
      await onUpdate({ ...form, ...draft });
      setEditing(false);
    } catch (err) {
      setError("সংরক্ষণ করতে সমস্যা হয়েছে — আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="px-4 pt-6 pb-6">
      <div className="flex flex-col items-center mb-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "#fde3d3" }}>
          <User size={30} style={{ color: ORANGE }} />
        </div>
        <div className="font-bold text-[16px]">{form?.owner || "রাহুল"}</div>
        <div className="text-[12px] mt-1 px-2 py-0.5 rounded-full flex items-center gap-1"
          style={{ background: verified ? "#e3f7e9" : "#fef3e0", color: verified ? "#1a7a3c" : "#b5720a" }}>
          {verified && <CheckCircle2 size={12} />}
          {verified ? (role === "দোকানদার" ? "সক্রিয় অ্যাকাউন্ট" : "ভেরিফাইড অ্যাকাউন্ট") : "ভেরিফিকেশন অপেক্ষমাণ"}
        </div>
      </div>

      <ConnectGoogleBox isAnonymous={isAnonymous} connectGoogle={connectGoogle} />

      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-[14px]">ব্যবসার তথ্য</h2>
        <button onClick={openEdit} className="text-[13px] font-medium flex items-center gap-1" style={{ color: BLUE }}>
          <FileText size={13} /> সম্পাদনা করুন
        </button>
      </div>

      <div className="bg-white border rounded-xl divide-y">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3">
            <Icon size={16} className="text-gray-400" />
            <div>
              <div className="text-[11px] text-gray-400">{label}</div>
              <div className="text-[14px]">{value}</div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-end justify-center z-10" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-t-2xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[15px]">তথ্য সম্পাদনা করুন</h3>
              <button onClick={() => setEditing(false)}><X size={20} /></button>
            </div>

            <label className="block text-[13px] text-gray-600 mb-1">ব্যবসার নাম</label>
            <input value={draft.shop} onChange={(e) => setDraft({ ...draft, shop: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            <label className="block text-[13px] text-gray-600 mb-1">মালিকের নাম</label>
            <input value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            <label className="block text-[13px] text-gray-600 mb-1">মোবাইল নম্বর</label>
            <input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} maxLength={11}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            <label className="block text-[13px] text-gray-600 mb-1">ঠিকানা</label>
            <input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            {error && <p className="text-red-500 text-[13px] mb-3">{error}</p>}

            <button onClick={save} className="w-full text-white rounded-xl py-3 font-semibold" style={{ background: BLUE }}>
              সংরক্ষণ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const CATEGORIES = [
  { icon: Smartphone, label: "মোবাইল ও এক্সেসরিজ", bg: "#dbeafe", color: "#2563eb" },
  { icon: Shirt, label: "পোশাক ও ফ্যাশন", bg: "#fce7f3", color: "#db2777" },
  { icon: HomeIcon, label: "ঘর সাজানো ও গৃহস্থালি", bg: "#dcfce7", color: "#16a34a" },
  { icon: Sparkles, label: "বিউটি ও পার্সোনাল কেয়ার", bg: "#f3e8ff", color: "#9333ea" },
  { icon: UtensilsCrossed, label: "খাদ্য ও পানীয়", bg: "#fef3c7", color: "#d97706" },
  { icon: Dumbbell, label: "স্পোর্টস ও আউটডোর", bg: "#dbeafe", color: "#2563eb" },
  { icon: Moon, label: "শরিয়া প্রোডাক্ট", bg: "#dcfce7", color: "#16a34a" },
];

/**
 * Google AdSense বিজ্ঞাপন বক্স। AdSense অনুমোদন হওয়ার পর data-ad-slot
 * বসাতে হবে (adsense.google.com → Ads → Ad units থেকে পাওয়া যাবে)।
 * অনুমোদন না হওয়া পর্যন্ত এটা কিছু দেখাবে না, অ্যাপ স্বাভাবিক থাকবে।
 */
function AdBanner({ slot }) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // AdSense স্ক্রিপ্ট এখনো লোড না হলে বা ব্লক করা থাকলে চুপচাপ উপেক্ষা করবে
    }
  }, []);

  const client = import.meta.env.VITE_ADSENSE_CLIENT_ID;
  if (!client) return null;

  return (
    <div className="mb-4 overflow-hidden rounded-xl" style={{ minHeight: 90 }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

function ShopHomeTab({ products, onAddToCart }) {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div style={{ background: BLUE }} className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-white rounded-full p-2">
              <ShopIcon size={18} style={{ color: BLUE }} />
            </div>
            <div>
              <div className="text-white font-bold text-[18px] leading-none">
                Shop<span style={{ color: "#facc15" }}>Easy</span>
              </div>
              <div className="text-white/80 text-[11px]">স্মার্ট শপিং, সহজ জীবন</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative bg-white/15 rounded-full p-2">
              <Bell size={16} className="text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <div className="bg-white/15 rounded-full p-2">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-full flex items-center gap-2 px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <span className="text-gray-400 text-[13px] flex-1">পণ্য খুঁজুন...</span>
          <Mic size={16} className="text-blue-500" />
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-2xl p-4 mb-4" style={{ background: "#eef4fb" }}>
          <div className="font-bold text-[16px] leading-snug">
            ঘরের প্রয়োজন<br />এখন <span style={{ color: "#dc2626" }}>আরও সহজে</span>
          </div>
          <p className="text-gray-500 text-[12px] mt-1 mb-3">বিশ্বস্ত পণ্য, সেরা দাম আপনার জন্য</p>
          <button className="text-white text-[13px] font-semibold rounded-full px-4 py-2 flex items-center gap-1" style={{ background: "#dc2626" }}>
            এখনই কিনুন <ArrowRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-5">
          {CATEGORIES.slice(0, 4).map(({ icon: Icon, label, bg, color }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="rounded-2xl p-3 w-full flex items-center justify-center" style={{ background: bg }}>
                <Icon size={20} style={{ color }} />
              </div>
              <span className="text-[10px] text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-[15px]">🔥 আজকের সেরা অফার</span>
        </div>

        <AdBanner slot="1111111111" />

        {products.length === 0 ? (
          <div className="rounded-xl border border-dashed p-6 mb-4 flex flex-col items-center text-center">
            <Package size={30} className="text-gray-300 mb-2" />
            <p className="text-gray-400 text-[13px] leading-relaxed">
              এখনও কোনো পণ্য নেই — পাইকারিরা পণ্য যোগ করলে এখানে দেখানো হবে
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 mb-4">
            {products.map((p, i) => (
              <button key={i} onClick={() => setSelected(p)} className="border rounded-xl p-2 text-left">
                <div className="rounded-lg flex items-center justify-center h-16 mb-2" style={{ background: "#eef2f7" }}>
                  <Package size={26} className="text-gray-500" />
                </div>
                <div className="text-[12px] leading-tight mb-1">{p.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-bold" style={{ color: "#dc2626" }}>৳ {p.price}</span>
                  <span
                    onClick={(e) => { e.stopPropagation(); onAddToCart(p); }}
                    className="rounded-lg p-1.5"
                    style={{ background: BLUE }}
                  >
                    <ShoppingCart size={13} className="text-white" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 flex items-end justify-center z-10" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-t-2xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[15px]">পণ্যের বিস্তারিত</h3>
              <button onClick={() => setSelected(null)}><X size={20} /></button>
            </div>
            <div className="rounded-xl flex items-center justify-center h-32 mb-3" style={{ background: "#eef2f7" }}>
              <Package size={40} className="text-gray-400" />
            </div>
            <div className="text-[15px] font-semibold mb-1">{selected.name}</div>
            <div className="text-[18px] font-bold mb-4" style={{ color: "#dc2626" }}>৳ {selected.price}</div>
            <button
              onClick={() => { onAddToCart(selected); setSelected(null); }}
              className="w-full text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2"
              style={{ background: BLUE }}
            >
              <ShoppingCart size={16} /> কার্টে যোগ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShopCategoryTab() {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="font-bold text-[16px] mb-4">সকল ক্যাটাগরি</h1>
      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map(({ icon: Icon, label, bg, color }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div className="rounded-2xl p-3 w-full flex items-center justify-center" style={{ background: bg }}>
              <Icon size={22} style={{ color }} />
            </div>
            <span className="text-[10px] text-center leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShopCartTab({ cart, onRemove, onPlaceOrder, onOrderPlaced }) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [placing, setPlacing] = useState(false);
  const total = cart.reduce((s, c) => s + c.price, 0);

  const placeOrder = async () => {
    if (!address.trim()) {
      setError("অর্ডার করার জন্য আপনার ঠিকানা দিন");
      return;
    }
    setError("");
    setPlacing(true);
    try {
      await onPlaceOrder({ items: cart, address, total });
      setPlaced(true);
    } catch (err) {
      setError("অর্ডার সাবমিট করতে সমস্যা হয়েছে — আবার চেষ্টা করুন");
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <div className="px-4 pt-10 pb-6 flex flex-col items-center text-center">
        <CheckCircle2 size={48} className="text-green-500 mb-3" />
        <h1 className="font-bold text-[16px] mb-1">অর্ডার সম্পন্ন হয়েছে</h1>
        <p className="text-gray-500 text-[13px] mb-4">
          মোট ৳{total.toLocaleString()} টাকার অর্ডার নিচের ঠিকানায় পাঠানো হবে
        </p>
        <div className="w-full border rounded-xl p-3 text-left text-[13px] text-gray-600 mb-4">
          {address}
        </div>
        <button
          onClick={() => { setPlaced(false); setAddress(""); onOrderPlaced && onOrderPlaced(); }}
          className="w-full text-white rounded-xl py-3 font-semibold"
          style={{ background: BLUE }}
        >
          নতুন কেনাকাটা করুন
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="px-4 pt-4 pb-6">
        <h1 className="font-bold text-[16px] mb-4">আমার কার্ট (0)</h1>
        <EmptyState icon={ShoppingCart} text="আপনার কার্ট খালি — পণ্য যোগ করতে হোম থেকে শপিং শুরু করুন" />
      </div>
    );
  }
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="font-bold text-[16px] mb-4">আমার কার্ট ({cart.length})</h1>
      <div className="flex flex-col gap-2 mb-4">
        {cart.map((c, i) => (
          <div key={i} className="border rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2" style={{ background: "#eef2f7" }}>
                <Package size={18} className="text-gray-600" />
              </div>
              <span className="text-[13px]">{c.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-semibold" style={{ color: "#dc2626" }}>৳{c.price}</span>
              <button onClick={() => onRemove(i)}><X size={16} className="text-gray-400" /></button>
            </div>
          </div>
        ))}
      </div>

      <label className="block text-[13px] text-gray-600 mb-1 flex items-center gap-1">
        <MapPin size={13} /> ডেলিভারির ঠিকানা
      </label>
      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="আপনার দোকান/বাসার সম্পূর্ণ ঠিকানা লিখুন"
        rows={2}
        className="w-full border rounded-xl px-3 py-2.5 mb-1 text-[14px]"
      />
      {error && <p className="text-red-500 text-[13px] mb-2">{error}</p>}

      <div className="border-t pt-3 mt-3 flex items-center justify-between">
        <span className="font-semibold text-[14px]">সর্বমোট</span>
        <span className="font-bold text-[16px]" style={{ color: "#dc2626" }}>৳{total.toLocaleString()}</span>
      </div>
      <button onClick={placeOrder} disabled={placing} className="w-full text-white rounded-xl py-3 font-semibold mt-4 disabled:opacity-60" style={{ background: BLUE }}>
        {placing ? "অর্ডার হচ্ছে..." : "অর্ডার করুন"}
      </button>
    </div>
  );
}

function ShopReelsTab() {
  return (
    <div className="px-4 pt-4 pb-6">
      <h1 className="font-bold text-[16px] mb-4">রিল</h1>
      <EmptyState icon={PlayCircle} text="এখনও কোনো প্রোডাক্ট রিল নেই" />
    </div>
  );
}

function ShopProfileTab({ form, onUpdate, isAnonymous, connectGoogle }) {
  const { tt } = useLanguage();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(form || { owner: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const openEdit = () => {
    setDraft(form || { owner: "", phone: "", address: "" });
    setError("");
    setEditing(true);
  };

  const save = async () => {
    if (!draft.owner?.trim() || !draft.phone?.trim() || !draft.address?.trim()) {
      setError("সব তথ্য পূরণ করুন");
      return;
    }
    try {
      await onUpdate({ ...form, ...draft });
      setEditing(false);
    } catch (err) {
      setError("সংরক্ষণ করতে সমস্যা হয়েছে — আবার চেষ্টা করুন");
    }
  };

  return (
    <div className="px-4 pt-6 pb-6">
      <div className="flex flex-col items-center mb-5">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ background: "#dbeafe" }}>
          <User size={30} style={{ color: BLUE }} />
        </div>
        <div className="font-bold text-[16px]">{form?.owner || "রাহুল"}</div>
        <div className="text-[12px] mt-1 px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "#dcfce7", color: "#16a34a" }}>
          <CheckCircle2 size={12} /> সক্রিয় দোকানদার অ্যাকাউন্ট
        </div>
      </div>

      <ConnectGoogleBox isAnonymous={isAnonymous} connectGoogle={connectGoogle} />

      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-[14px]">ব্যক্তিগত তথ্য</h2>
        <button onClick={openEdit} className="text-[13px] font-medium flex items-center gap-1" style={{ color: BLUE }}>
          <FileText size={13} /> সম্পাদনা করুন
        </button>
      </div>

      <div className="bg-white border rounded-xl divide-y">
        <div className="flex items-center gap-3 px-4 py-3">
          <Phone size={16} className="text-gray-400" />
          <div className="text-[14px]">{form?.phone || "—"}</div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <MapPin size={16} className="text-gray-400" />
          <div className="text-[14px]">{form?.address || "—"}</div>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-end justify-center z-10" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="bg-white rounded-t-2xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[15px]">তথ্য সম্পাদনা করুন</h3>
              <button onClick={() => setEditing(false)}><X size={20} /></button>
            </div>

            <label className="block text-[13px] text-gray-600 mb-1">নাম</label>
            <input value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            <label className="block text-[13px] text-gray-600 mb-1">মোবাইল নম্বর</label>
            <input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} maxLength={11}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            <label className="block text-[13px] text-gray-600 mb-1">ঠিকানা</label>
            <input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })}
              className="w-full border rounded-xl px-3 py-2.5 mb-3 text-[14px]" />

            {error && <p className="text-red-500 text-[13px] mb-3">{error}</p>}

            <button onClick={save} className="w-full text-white rounded-xl py-3 font-semibold" style={{ background: BLUE }}>
              সংরক্ষণ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ShopBottomNav({ active, onChange, cartCount }) {
  const { tt } = useLanguage();
  const items = [
    { key: "home", label: tt("home"), icon: HomeIcon },
    { key: "category", label: tt("category"), icon: Grid3x3 },
    { key: "cart", label: tt("cart"), icon: ShoppingCart, badge: cartCount },
    { key: "reels", label: tt("reels"), icon: PlayCircle },
    { key: "profile", label: tt("profile"), icon: User },
  ];
  return (
    <div className="border-t bg-white flex justify-between px-1 py-2">
      {items.map(({ key, label, icon: Icon, badge }) => (
        <button key={key} onClick={() => onChange(key)} className="flex-1 flex flex-col items-center gap-0.5 py-1 relative">
          <div className="relative">
            <Icon size={20} color={active === key ? BLUE : "#8a8a8a"} />
            {!!badge && (
              <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">
                {badge}
              </span>
            )}
          </div>
          <span className="text-[11px]" style={{ color: active === key ? BLUE : "#8a8a8a" }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

export default function BazarlinkPrototype() {
  const { uid, isAnonymous, ready, connectGoogle } = useAuthUser();
  const { profile, loading: profileLoading, saveProfile } = useProfile(uid);
  const { allProducts, myProducts, loading: loadingProducts, addProduct } = useProducts(uid);
  const { ordersForMyProducts, loading: loadingOrders, placeOrder } = useOrders(uid);

  const [screen, setScreen] = useState("role");
  const [tab, setTab] = useState("dashboard");
  const [shopTab, setShopTab] = useState("home");
  const [cart, setCart] = useState([]);
  const [dbError, setDbError] = useState("");

  const role = profile?.role || null;
  const form = profile || null;
  const verified = !!profile?.verified;

  // প্রোফাইল লোড হয়ে গেলে আগের রোল অনুযায়ী সঠিক স্ক্রিনে পাঠিয়ে দেওয়া হয়
  // — অ্যাপ বন্ধ করে আবার খুললেও আবার প্রথম থেকে শুরু করতে হবে না।
  useEffect(() => {
    if (!ready || !uid || profileLoading) return;
    if (profile?.role === "দোকানদার") setScreen("shop-app");
    else if (profile?.role === "পাইকারি") setScreen("wholesale-app");
    else setScreen("role");
  }, [ready, uid, profileLoading, profile]);

  const stats = {
    products: myProducts.length,
    orders: ordersForMyProducts.length,
    active: ordersForMyProducts.filter((o) => o.status === "pending").length,
    sales: ordersForMyProducts.reduce(
      (sum, o) =>
        sum + (o.items || []).filter((i) => i.ownerId === uid).reduce((s, i) => s + Number(i.price || 0), 0),
      0
    ),
    due: 0,
  };

  if (!ready || !uid) {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 size={28} className="animate-spin text-gray-400" />
        <p className="text-gray-400 text-[13px]">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="w-full h-screen bg-white flex flex-col items-center justify-center gap-3">
        <Loader2 size={28} className="animate-spin text-gray-400" />
        <p className="text-gray-400 text-[13px]">লোড হচ্ছে...</p>
      </div>
    );
  }

  let body;
  if (screen === "role") {
    body = (
      <RoleScreen
        onPick={async (r) => {
          if (r === "দোকানদার") {
            try {
              await saveProfile({ role: r, verified: true });
              setScreen("shop-app");
            } catch (err) {
              setDbError("সংরক্ষণ করতে সমস্যা হয়েছে — আবার চেষ্টা করুন");
            }
          } else {
            setScreen("verify");
          }
        }}
      />
    );
  } else if (screen === "verify") {
    body = (
      <VerifyScreen
        onBack={() => setScreen("role")}
        onSubmit={async (f) => {
          try {
            await saveProfile({ ...f, role: "পাইকারি", verified: false });
            setScreen("wholesale-app");
          } catch (err) {
            setDbError("সংরক্ষণ করতে সমস্যা হয়েছে — আবার চেষ্টা করুন");
          }
        }}
      />
    );
  } else if (screen === "shop-app") {
    body = (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto" style={{ background: "#f7f8fa" }}>
          {shopTab === "home" && <ShopHomeTab products={allProducts} onAddToCart={(d) => setCart([...cart, d])} />}
          {shopTab === "category" && <ShopCategoryTab />}
          {shopTab === "cart" && (
            <ShopCartTab
              cart={cart}
              onRemove={(i) => setCart(cart.filter((_, idx) => idx !== i))}
              onPlaceOrder={placeOrder}
              onOrderPlaced={() => { setCart([]); setShopTab("home"); }}
            />
          )}
          {shopTab === "reels" && <ShopReelsTab />}
          {shopTab === "profile" && (
            <ShopProfileTab form={form} onUpdate={saveProfile} isAnonymous={isAnonymous} connectGoogle={connectGoogle} />
          )}
        </div>
        <ShopBottomNav active={shopTab} onChange={setShopTab} cartCount={cart.length} />
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col h-full">
        <TopBar />
        <div className="flex-1 overflow-y-auto" style={{ background: CREAM }}>
          {dbError && (
            <div className="mx-4 mt-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-[12px] px-3 py-2">
              {dbError}
            </div>
          )}
          {tab === "dashboard" && (
            <DashboardTab
              name={form?.owner || "রাহুল"}
              showVerifyBanner={role === "পাইকারি" && !verified}
              stats={stats}
              recentOrders={ordersForMyProducts.slice(0, 5)}
            />
          )}
          {tab === "products" && (
            <ProductsTab products={myProducts} loading={loadingProducts} onAdd={addProduct} />
          )}
          {tab === "orders" && <OrdersTab orders={ordersForMyProducts} />}
          {tab === "ledger" && <LedgerTab />}
          {tab === "profile" && (
            <ProfileTab
              form={form}
              verified={verified}
              role={role}
              onUpdate={saveProfile}
              isAnonymous={isAnonymous}
              connectGoogle={connectGoogle}
            />
          )}
        </div>
        <BottomNav active={tab} onChange={setTab} />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-white overflow-hidden flex flex-col" style={{ fontFamily: "system-ui, sans-serif" }}>
      <div className="flex-1 overflow-y-auto flex flex-col">{body}</div>
    </div>
  );
}
