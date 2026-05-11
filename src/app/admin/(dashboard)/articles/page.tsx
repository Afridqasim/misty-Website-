"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import type { Article } from "../../../../lib/types";
import { Plus, Pencil, Trash2, X, Loader2, Save, Search, ExternalLink } from "lucide-react";

const emptyForm = {
  title: "", slug: "", excerpt: "", content: "", category: "",
  author: "", read_time: "", image_url: "", seo_title: "", seo_desc: "",
};

function generateSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function AdminArticlesPage() {
  const [items, setItems] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");

  async function fetchItems() {
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  const handleEdit = (item: Article) => {
    setEditingId(item.id);
    setForm({
      title: item.title, slug: item.slug, excerpt: item.excerpt || "",
      content: item.content || "", category: item.category || "",
      author: item.author || "", read_time: item.read_time || "",
      image_url: item.image_url || "", seo_title: item.seo_title || "",
      seo_desc: item.seo_desc || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    await supabase.from("articles").delete().eq("id", id);
    fetchItems();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = { ...form, slug: generateSlug(form.slug || form.title) };
    if (editingId) {
      await supabase.from("articles").update(payload).eq("id", editingId);
    } else {
      await supabase.from("articles").insert([payload]);
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
          <h1 className="text-3xl font-black text-white mb-1">Articles Manager</h1>
          <p className="text-gray-400 text-sm">{items.length} article{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all">
          <Plus size={16} /> New Article
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input type="text" placeholder="Search articles..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-colors placeholder-gray-600" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={30} className="text-fuchsia-400 animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No articles found. Click &quot;New Article&quot; to create one.</div>
      ) : (
        <div className="rounded-2xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Title</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Category</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Author</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Date</th>
                <th className="text-right px-6 py-4 text-gray-400 font-medium">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5">/{item.slug}</div>
                    </td>
                    <td className="px-6 py-4">{item.category ? <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/10 text-fuchsia-400 text-xs font-medium">{item.category}</span> : "—"}</td>
                    <td className="px-6 py-4 text-gray-400">{item.author || "—"}</td>
                    <td className="px-6 py-4 text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <a href={`/articles/${item.slug}`} target="_blank" className="inline-block p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-blue-400 transition-all mr-1"><ExternalLink size={16} /></a>
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
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111] border border-white/10 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editingId ? "Edit Article" : "New Article"}</h2>
              <button onClick={closeForm} className="p-2 rounded-lg hover:bg-white/5 text-gray-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Title *</label>
                  <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || generateSlug(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="Article title" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Slug *</label>
                  <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: generateSlug(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="article-url-slug" />
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="block text-xs text-gray-400 mb-1">Category</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="e.g. Design Tips" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Author</label>
                  <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="Author name" /></div>
                <div><label className="block text-xs text-gray-400 mb-1">Read Time</label>
                  <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="5 min read" /></div>
              </div>
              <div><label className="block text-xs text-gray-400 mb-1">Featured Image URL</label>
                <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="https://..." /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Excerpt</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600 resize-none" placeholder="Brief summary shown on article cards..." /></div>
              <div><label className="block text-xs text-gray-400 mb-1">Content (HTML supported)</label>
                <textarea rows={12} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600 resize-y font-mono" placeholder="Write your article content here. HTML tags like <h2>, <p>, <strong>, <ul>, <li> are supported." /></div>

              <div className="pt-4 border-t border-white/5">
                <h4 className="text-white font-semibold text-sm mb-3">SEO Settings</h4>
                <div className="space-y-3">
                  <div><label className="block text-xs text-gray-400 mb-1">SEO Title</label>
                    <input value={form.seo_title} onChange={(e) => setForm({ ...form, seo_title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600" placeholder="Custom title for search engines" /></div>
                  <div><label className="block text-xs text-gray-400 mb-1">SEO Description</label>
                    <textarea rows={2} value={form.seo_desc} onChange={(e) => setForm({ ...form, seo_desc: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-fuchsia-500 placeholder-gray-600 resize-none" placeholder="Meta description for search engines (150-160 chars recommended)" /></div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold transition-all disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} {editingId ? "Update" : "Publish"}
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
