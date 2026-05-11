"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import type { PortfolioItem } from "../../../../lib/types";
import { Plus, Pencil, Trash2, X, Loader2, Save, Search } from "lucide-react";

const emptyForm = { title: "", category: "Exhibition Stand", location: "", services: "", size: "", challenge: "", result: "", image_url: "", seo_title: "", seo_desc: "" };

export default function AdminPortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchItems() {
    const { data } = await supabase.from("portfolio").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title, category: item.category, location: item.location || "",
      services: item.services || "", size: item.size || "", challenge: item.challenge || "",
      result: item.result || "", image_url: item.image_url || "",
      seo_title: item.seo_title || "", seo_desc: item.seo_desc || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    await supabase.from("portfolio").delete().eq("id", id);
    fetchItems();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (editingId) {
      await supabase.from("portfolio").update(form).eq("id", editingId);
    } else {
      await supabase.from("portfolio").insert([form]);
    }
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    fetchItems();
  };

  const closeForm = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); };

  const filtered = items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Portfolio Manager</h1>
          <p className="text-gray-400 text-sm">{items.length} project{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={30} className="text-fuchsia-400 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No projects found. Click &quot;Add Project&quot; to create one.</div>
      ) : (
        <div className="rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Title</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Location</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                    <td className="px-6 py-4"><span className="px-2.5 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-medium">{item.category}</span></td>
                    <td className="px-6 py-4 text-gray-400">{item.location || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-fuchsia-400 transition-all mr-1"><Pencil size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Project" : "New Project"}</h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Title *</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Category *</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 appearance-none">
                    <option value="Exhibition Stand" className="bg-gray-900">Exhibition Stand</option>
                    <option value="Booth Design" className="bg-gray-900">Booth Design</option>
                    <option value="Custom Stall" className="bg-gray-900">Custom Stall</option>
                    <option value="Trade Show" className="bg-gray-900">Trade Show</option>
                    <option value="Event Branding" className="bg-gray-900">Event Branding</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">Location</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="e.g. Dubai, UAE" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Size</label>
                  <input value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="e.g. 6m x 4m" /></div>
              </div>
              <div><label className="block text-xs text-gray-400 mb-1">Services</label>
                <input value={form.services} onChange={(e) => setForm({ ...form, services: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="e.g. 3D Design, Graphics, Production" /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Image URL</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="https://..." /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Challenge</label>
                <textarea rows={2} value={form.challenge} onChange={(e) => setForm({ ...form, challenge: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600 resize-none" /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Result</label>
                <textarea rows={2} value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600 resize-none" /></div>

              <div className="pt-4 border-t border-white/5">
                <h4 className="text-white font-semibold text-sm mb-3">SEO Settings</h4>
                <div className="space-y-3">
                  <div><label className="block text-xs text-gray-400 mb-1">SEO Title</label>
                    <input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="Custom title for search engines" /></div>
                  <div><label className="block text-xs text-gray-400 mb-1">SEO Description</label>
                    <textarea rows={2} value={form.seo_desc} onChange={(e) => setForm({ ...form, seo_desc: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600 resize-none" placeholder="Meta description for search engines" /></div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold transition-all disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {editingId ? "Update" : "Create"}
                </button>
                <button type="button" onClick={closeForm} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-medium hover:bg-white/10 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
