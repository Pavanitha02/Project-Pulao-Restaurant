"use client";

import React, { useState, useMemo } from "react";
import {
  LayoutDashboard,
  Utensils,
  CalendarCheck,
  Mail,
  Clock,
  Plus,
  Trash2,
  Check,
  X,
  TrendingUp,
  Search,
  Sparkles,
  Flame,
  PlusCircle
} from "lucide-react";
import { useRestaurant, MenuItem, Reservation, Offer, Timing } from "@/context/RestaurantContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

type AdminTab = "dashboard" | "menu" | "reservations" | "inquiries" | "settings";

export default function AdminPage() {
  const {
    menuItems,
    reservations,
    inquiries,
    timings,
    offers,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateReservationStatus,
    updateTimings,
    addOffer,
    deleteOffer
  } = useRestaurant();

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Menu Form State
  const [newDish, setNewDish] = useState({
    name: "",
    category: "Taste Of Pulaos",
    price: "",
    description: "",
    isVeg: false,
    isChefRecommended: false,
    isPopular: false,
    spicyLevel: 2 as 0 | 1 | 2 | 3,
    image: ""
  });
  const [menuSearch, setMenuSearch] = useState("");

  // Offers Form State
  const [newOffer, setNewOffer] = useState({
    code: "",
    description: "",
    discountPercentage: 10
  });

  // Timings Form State
  const [editTimings, setEditTimings] = useState<Timing>({
    weekday: timings.weekday,
    weekend: timings.weekend,
    delivery: timings.delivery
  });

  // Recharts Analytics calculations
  const dashboardStats = useMemo(() => {
    const totalMenu = menuItems.length;
    const totalReservations = reservations.length;
    const activeRes = reservations.filter(r => r.status === "pending").length;
    const totalInquiries = inquiries.length;
    return { totalMenu, totalReservations, activeRes, totalInquiries };
  }, [menuItems, reservations, inquiries]);

  const reservationChartData = useMemo(() => {
    // Generate mock reservation timeline
    return [
      { day: "Mon", bookings: reservations.filter(r => r.date.includes("-05-25") || r.guests > 0).length + 2 },
      { day: "Tue", bookings: 4 },
      { day: "Wed", bookings: 7 },
      { day: "Thu", bookings: 5 },
      { day: "Fri", bookings: 12 },
      { day: "Sat", bookings: 18 },
      { day: "Sun", bookings: 15 },
    ];
  }, [reservations]);

  const categoryChartData = useMemo(() => {
    const categories = Array.from(new Set(menuItems.map(m => m.category)));
    return categories.map(cat => ({
      name: cat,
      value: menuItems.filter(m => m.category === cat).length
    }));
  }, [menuItems]);

  const inquiryChartData = useMemo(() => {
    return [
      { month: "Week 1", count: 2 },
      { month: "Week 2", count: 5 },
      { month: "Week 3", count: inquiries.length + 3 },
      { month: "Week 4", count: inquiries.length }
    ];
  }, [inquiries]);

  const COLORS = ["#d4af37", "#ff7a00", "#c0c0c0", "#4caf50", "#2196f3", "#9c27b0"];

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name || !newDish.price) return;

    addMenuItem({
      name: newDish.name,
      category: newDish.category,
      price: parseFloat(newDish.price),
      description: newDish.description || "A premium recipe crafted using royal hand-ground spices.",
      isVeg: newDish.isVeg,
      isChefRecommended: newDish.isChefRecommended,
      isPopular: newDish.isPopular,
      spicyLevel: newDish.spicyLevel,
      image: newDish.image || "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop"
    });

    // Reset Form
    setNewDish({
      name: "",
      category: "Taste Of Pulaos",
      price: "",
      description: "",
      isVeg: false,
      isChefRecommended: false,
      isPopular: false,
      spicyLevel: 2,
      image: ""
    });
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffer.code) return;
    addOffer(newOffer);
    setNewOffer({ code: "", description: "", discountPercentage: 10 });
  };

  const handleSaveTimings = (e: React.FormEvent) => {
    e.preventDefault();
    updateTimings(editTimings);
    alert("Operational timings updated successfully!");
  };

  const filteredMenu = menuItems.filter(item =>
    item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    item.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-matte-black text-soft-cream flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-deep-charcoal border-b md:border-b-0 md:border-r border-gold/15 flex flex-col p-6">
        <div className="flex flex-col mb-8 cursor-pointer" onClick={() => window.location.href = "/"}>
          <span className="font-heading text-lg font-bold tracking-wider text-gold">
            SHREYAS GRAND
          </span>
          <span className="text-[10px] font-body tracking-widest text-white/70 uppercase">
            Admin Control Center
          </span>
        </div>

        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:space-y-1 pb-4 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-body font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "dashboard" ? "bg-gold text-matte-black" : "text-soft-cream/70 hover:bg-gold/10 hover:text-gold"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab("menu")}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-body font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "menu" ? "bg-gold text-matte-black" : "text-soft-cream/70 hover:bg-gold/10 hover:text-gold"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Menu Items</span>
          </button>

          <button
            onClick={() => setActiveTab("reservations")}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-body font-bold transition-colors cursor-pointer whitespace-nowrap relative ${
              activeTab === "reservations" ? "bg-gold text-matte-black" : "text-soft-cream/70 hover:bg-gold/10 hover:text-gold"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Reservations</span>
            {dashboardStats.activeRes > 0 && (
              <span className="md:absolute right-4 bg-warm-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {dashboardStats.activeRes}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("inquiries")}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-body font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "inquiries" ? "bg-gold text-matte-black" : "text-soft-cream/70 hover:bg-gold/10 hover:text-gold"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Inquiries</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-xs sm:text-sm font-body font-bold transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "settings" ? "bg-gold text-matte-black" : "text-soft-cream/70 hover:bg-gold/10 hover:text-gold"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="mt-auto hidden md:block pt-6 border-t border-gold/10 text-center">
          <a
            href="/"
            className="text-xs font-body font-medium text-gold hover:underline"
          >
            View Customer Site
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-8 lg:p-12 overflow-y-auto max-h-screen">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold">Analytics & Metrics</h2>
              <span className="text-xs font-body text-soft-cream/60">Data is gathered in real time</span>
            </div>

            {/* Stat Widgets */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass p-5 rounded-xl border border-gold/10">
                <span className="text-xs font-body text-soft-cream/60 uppercase">Total Menu Items</span>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-gold mt-1">
                  {dashboardStats.totalMenu}
                </p>
              </div>

              <div className="glass p-5 rounded-xl border border-gold/10">
                <span className="text-xs font-body text-soft-cream/60 uppercase">Active Bookings</span>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-gold mt-1">
                  {dashboardStats.totalReservations}
                </p>
              </div>

              <div className="glass p-5 rounded-xl border border-gold/10">
                <span className="text-xs font-body text-soft-cream/60 uppercase">Pending Review</span>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-warm-orange mt-1">
                  {dashboardStats.activeRes}
                </p>
              </div>

              <div className="glass p-5 rounded-xl border border-gold/10">
                <span className="text-xs font-body text-soft-cream/60 uppercase">Inquiries Volume</span>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-gold mt-1">
                  {dashboardStats.totalInquiries}
                </p>
              </div>
            </div>

            {/* Recharts Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Bar Chart: Bookings */}
              <div className="lg:col-span-8 glass p-5 rounded-2xl border border-gold/10">
                <h3 className="font-heading text-base font-bold text-soft-cream mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  <span>Weekly Seatings Overview</span>
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reservationChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                      <XAxis dataKey="day" stroke="#a0a0a0" fontSize={11} />
                      <YAxis stroke="#a0a0a0" fontSize={11} />
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #d4af37" }} />
                      <Bar dataKey="bookings" fill="#d4af37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pie Chart: Categories */}
              <div className="lg:col-span-4 glass p-5 rounded-2xl border border-gold/10 flex flex-col justify-between">
                <h3 className="font-heading text-base font-bold text-soft-cream mb-4">
                  Categories Proportion
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #d4af37" }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-body text-soft-cream/70 mt-2 max-h-16 overflow-y-auto">
                  {categoryChartData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="truncate">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Line Chart: Inquiry Traffic */}
            <div className="glass p-5 rounded-2xl border border-gold/10">
              <h3 className="font-heading text-base font-bold text-soft-cream mb-4">
                Monthly Inquiries Trend
              </h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={inquiryChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                    <XAxis dataKey="month" stroke="#a0a0a0" fontSize={11} />
                    <YAxis stroke="#a0a0a0" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #d4af37" }} />
                    <Line type="monotone" dataKey="count" stroke="#ff7a00" strokeWidth={2.5} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

        {/* MENU MANAGEMENT TAB */}
        {activeTab === "menu" && (
          <div className="space-y-8">
            <h2 className="font-heading text-3xl font-bold">Manage Digital Menu</h2>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              
              {/* Form to Add Item */}
              <div className="xl:col-span-5 glass p-6 rounded-2xl border border-gold/15 shadow-xl">
                <h3 className="font-heading text-lg font-bold text-gold mb-4 flex items-center gap-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Add New Dish</span>
                </h3>

                <form onSubmit={handleAddDish} className="space-y-4">
                  <div>
                    <label className="text-xs font-body text-soft-cream/70 uppercase">Dish Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raju Gari Kodi Pulao"
                      value={newDish.name}
                      onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3.5 mt-1 font-body text-sm text-soft-cream focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-body text-soft-cream/70 uppercase">Category</label>
                      <select
                        value={newDish.category}
                        onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                        className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 font-body text-sm text-soft-cream focus:outline-none"
                      >
                        <option value="Biryanis">Biryanis</option>
                        <option value="Taste Of Pulaos">Taste Of Pulaos</option>
                        <option value="Chinese Starters">Chinese Starters</option>
                        <option value="South Indian Non Veg">South Indian Non Veg</option>
                        <option value="Tandoori Starters">Tandoori Starters</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Fried Rice & Noodles">Fried Rice & Noodles</option>
                        <option value="Breads">Breads</option>
                        <option value="Desserts and Beverages">Desserts and Beverages</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-body text-soft-cream/70 uppercase">Price (₹)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 340"
                        value={newDish.price}
                        onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                        className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 font-body text-sm text-soft-cream focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-body text-soft-cream/70 uppercase">Dish Description</label>
                    <textarea
                      placeholder="Ingredients, spice blend story..."
                      rows={3}
                      value={newDish.description}
                      onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2 px-3 mt-1 font-body text-sm text-soft-cream focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-body text-soft-cream/70 uppercase">Image URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="Unsplash / external link"
                      value={newDish.image}
                      onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2 px-3 mt-1 font-body text-sm text-soft-cream focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-body text-soft-cream/70 uppercase">Spicy Level</label>
                      <select
                        value={newDish.spicyLevel}
                        onChange={(e) => setNewDish({ ...newDish, spicyLevel: parseInt(e.target.value) as 0 | 1 | 2 | 3 })}
                        className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2 px-3 mt-1 font-body text-sm text-soft-cream focus:outline-none"
                      >
                        <option value={0}>0 - Mild</option>
                        <option value={1}>1 - Medium</option>
                        <option value={2}>2 - Spicy</option>
                        <option value={3}>3 - Extra Spicy</option>
                      </select>
                    </div>

                    <div className="flex flex-col justify-center">
                      <label className="flex items-center space-x-2 text-xs font-body text-soft-cream/70 uppercase cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newDish.isVeg}
                          onChange={(e) => setNewDish({ ...newDish, isVeg: e.target.checked })}
                          className="w-4 h-4 accent-gold cursor-pointer"
                        />
                        <span>Is Vegetarian Dish</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <label className="flex items-center space-x-2 text-xs font-body text-soft-cream/70 uppercase cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newDish.isChefRecommended}
                        onChange={(e) => setNewDish({ ...newDish, isChefRecommended: e.target.checked })}
                        className="w-4 h-4 accent-gold"
                      />
                      <span>Chef Recommended</span>
                    </label>

                    <label className="flex items-center space-x-2 text-xs font-body text-soft-cream/70 uppercase cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newDish.isPopular}
                        onChange={(e) => setNewDish({ ...newDish, isPopular: e.target.checked })}
                        className="w-4 h-4 accent-gold"
                      />
                      <span>Popular Now</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-matte-black font-body font-bold text-sm py-3 rounded-lg mt-2 cursor-pointer transition-colors"
                  >
                    Add Dish to Menu
                  </button>
                </form>
              </div>

              {/* Menu Items List */}
              <div className="xl:col-span-7 space-y-4">
                <div className="flex items-center relative max-w-md">
                  <Search className="absolute left-4 text-gold w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-full py-2 pl-12 pr-4 font-body text-xs text-soft-cream placeholder-soft-cream/40 focus:outline-none"
                  />
                </div>

                <div className="glass rounded-2xl border border-gold/15 overflow-hidden shadow-xl max-h-[600px] overflow-y-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gold/15 bg-matte-black/40 font-body text-[10px] text-gold uppercase tracking-wider">
                        <th className="p-4">Dish</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gold/10 font-body text-xs">
                      {filteredMenu.map((item) => (
                        <tr key={item.id} className="hover:bg-gold/5 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <span
                                className={`inline-block w-2.5 h-2.5 border rounded-full ${
                                  item.isVeg ? "bg-green-500 border-green-500" : "bg-red-500 border-red-500"
                                }`}
                              />
                              <div className="flex flex-col min-w-0">
                                <span className="font-bold truncate text-soft-cream">{item.name}</span>
                                <div className="flex space-x-1.5 pt-0.5">
                                  {item.isChefRecommended && <Sparkles className="w-3.5 h-3.5 text-gold" />}
                                  {item.isPopular && <Flame className="w-3.5 h-3.5 text-warm-orange" />}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-soft-cream/80">{item.category}</td>
                          <td className="p-4 font-bold text-gold">₹{item.price}</td>
                          <td className="p-4">
                            <button
                              onClick={() => deleteMenuItem(item.id)}
                              className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* RESERVATIONS TAB */}
        {activeTab === "reservations" && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="font-heading text-3xl font-bold">Manage Reservations</h2>
              <span className="bg-gold/10 border border-gold/30 text-gold text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                {reservations.length} Bookings Total
              </span>
            </div>

            <div className="glass rounded-2xl border border-gold/15 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gold/15 bg-matte-black/40 font-body text-[10px] text-gold uppercase tracking-wider">
                      <th className="p-4">Client</th>
                      <th className="p-4">Guests</th>
                      <th className="p-4">Date & Time</th>
                      <th className="p-4">Occasion</th>
                      <th className="p-4">Requests</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold/10 font-body text-xs">
                    {reservations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-soft-cream/60">
                          No table reservations submitted yet. Bookings will show up here.
                        </td>
                      </tr>
                    ) : (
                      reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-gold/5 transition-colors">
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-soft-cream">{res.name}</span>
                              <span className="text-[10px] text-soft-cream/60">{res.phone}</span>
                            </div>
                          </td>
                          <td className="p-4 font-bold">{res.guests} Pax</td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span>{res.date}</span>
                              <span className="text-[10px] text-gold">{res.time}</span>
                            </div>
                          </td>
                          <td className="p-4">{res.occasion}</td>
                          <td className="p-4 max-w-[150px] truncate text-soft-cream/80" title={res.specialRequests}>
                            {res.specialRequests || "-"}
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                res.status === "approved"
                                  ? "bg-green-950 text-green-400 border border-green-500/30"
                                  : res.status === "cancelled"
                                  ? "bg-red-950/80 text-red-400 border border-red-500/30"
                                  : "bg-orange-950/80 text-orange-400 border border-orange-500/30"
                              }`}
                            >
                              {res.status}
                            </span>
                          </td>
                          <td className="p-4">
                            {res.status === "pending" && (
                              <div className="flex items-center space-x-1">
                                <button
                                  onClick={() => updateReservationStatus(res.id, "approved")}
                                  className="p-1.5 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-matte-black rounded-full border border-green-500/30 transition-all cursor-pointer"
                                  title="Approve Reservation"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => updateReservationStatus(res.id, "cancelled")}
                                  className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded-full border border-red-500/30 transition-all cursor-pointer"
                                  title="Cancel Reservation"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                            {res.status !== "pending" && <span className="text-soft-cream/40">Processed</span>}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* INQUIRIES TAB */}
        {activeTab === "inquiries" && (
          <div className="space-y-8">
            <h2 className="font-heading text-3xl font-bold">Customer Inquiries Feed</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inquiries.length === 0 ? (
                <div className="col-span-2 glass p-8 text-center text-soft-cream/60 border border-gold/15 rounded-2xl">
                  No inquiries or contact submissions received.
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="glass p-6 rounded-2xl border border-gold/15 shadow-xl space-y-4 hover:border-gold/30 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-heading text-base font-bold text-gold">{inq.name}</h4>
                        <div className="flex space-x-2 text-[10px] font-body text-soft-cream/60 mt-0.5">
                          <span>{inq.email}</span>
                          <span>•</span>
                          <span>{inq.phone || "No Phone"}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-body text-soft-cream/40">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="border-t border-gold/10 pt-3">
                      <span className="text-xs font-body font-bold text-gold uppercase tracking-wider">
                        Subject: {inq.subject}
                      </span>
                      <p className="font-body text-xs text-soft-cream/80 mt-1.5 leading-relaxed bg-matte-black/40 p-3 rounded-lg border border-gold/5">
                        {inq.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TIMINGS AND OFFERS SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <h2 className="font-heading text-3xl font-bold">Restaurant Configuration</h2>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
              
              {/* Manage Operational Timings */}
              <div className="glass p-6 rounded-2xl border border-gold/15 shadow-xl space-y-4">
                <h3 className="font-heading text-lg font-bold text-gold">Modify Timings</h3>
                <form onSubmit={handleSaveTimings} className="space-y-4 font-body text-sm">
                  <div>
                    <label className="text-xs text-soft-cream/70 uppercase">Weekday Hours</label>
                    <input
                      type="text"
                      required
                      value={editTimings.weekday}
                      onChange={(e) => setEditTimings({ ...editTimings, weekday: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 text-soft-cream focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-soft-cream/70 uppercase">Weekend Hours</label>
                    <input
                      type="text"
                      required
                      value={editTimings.weekend}
                      onChange={(e) => setEditTimings({ ...editTimings, weekend: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 text-soft-cream focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-soft-cream/70 uppercase">Home Delivery Hours</label>
                    <input
                      type="text"
                      required
                      value={editTimings.delivery}
                      onChange={(e) => setEditTimings({ ...editTimings, delivery: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 text-soft-cream focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-matte-black font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Save Operational Hours
                  </button>
                </form>
              </div>

              {/* Offers Promo Code CRUD */}
              <div className="glass p-6 rounded-2xl border border-gold/15 shadow-xl space-y-4">
                <h3 className="font-heading text-lg font-bold text-gold">Offers & Coupons</h3>

                <form onSubmit={handleAddOffer} className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-body text-soft-cream/70 uppercase">Code</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. GRAND20"
                        value={newOffer.code}
                        onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value.toUpperCase() })}
                        className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 font-body text-xs text-soft-cream focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-body text-soft-cream/70 uppercase">Discount (%)</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        required
                        value={newOffer.discountPercentage}
                        onChange={(e) => setNewOffer({ ...newOffer, discountPercentage: parseInt(e.target.value) })}
                        className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 font-body text-xs text-soft-cream focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-body text-soft-cream/70 uppercase">Short Description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Save 20% on booking slots"
                      value={newOffer.description}
                      onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                      className="w-full bg-deep-charcoal border border-gold/15 focus:border-gold rounded-lg py-2.5 px-3 mt-1 font-body text-xs text-soft-cream focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold-hover text-matte-black font-body font-bold py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Add Active Promo Offer
                  </button>
                </form>

                {/* List Active Offers */}
                <div className="divide-y divide-gold/10 font-body text-xs pt-4 border-t border-gold/15">
                  {offers.map((off) => (
                    <div key={off.id} className="flex justify-between items-center py-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gold border border-gold/30 px-2 py-0.5 rounded bg-matte-black/55">
                          {off.code}
                        </span>
                        <span className="text-soft-cream/70">{off.description}</span>
                      </div>
                      <button
                        onClick={() => deleteOffer(off.id)}
                        className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
}
