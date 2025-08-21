import { useEffect, useState } from "react";
import { listItems, createItem, updateItem, deleteItem } from "./api";
import ItemForm from "./components/Form";
import ItemList from "./components/Card";
import MousePointerAnimation from "./animations/MousePointerAnimation";
import { Moon, Sun } from "lucide-react";
import { ThemeProvider, useTheme } from "./context/ThemeProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster, toast } from "sonner";

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("");

  const load = async () => {
    const data = await listItems();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = async (payload) => {
    setSubmitting(true);
    try {
      // Ensure ISO datetime string if input is datetime-local
      const normalized = {
        ...payload,
        published_at: payload.published_at.endsWith("Z")
          ? payload.published_at
          : new Date(payload.published_at).toISOString(),
      };
      await createItem(normalized);
      setEditing(null);
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const onUpdate = async (payload) => {
    setSubmitting(true);
    try {
      const normalized = {
        ...payload,
        published_at: payload.published_at.endsWith("Z")
          ? payload.published_at
          : new Date(payload.published_at).toISOString(),
      };
      await updateItem(editing._id, normalized);
      setEditing(null);
      await load();
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (item) => {
    if (!confirm(`Delete "${item.name}"?`)) return;
    await deleteItem(item._id);
    await load();
  };

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(filter.toLowerCase()) ||
      String(i.edition_id).toLowerCase().includes(filter.toLowerCase()) ||
      i.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className=" mx-auto p-6">
          <Header />

          <div className="flex items-center gap-2 mb-4 mt-4">
            <Toaster />
            {!editing && (
              <button
                onClick={() => {
                  setEditing({});
                  toast("Post Form Opened", {
                    style: { background: "#48bb78", color: "white" },
                  });
                }}
                className="cursor-pointer block m-auto px-5 py-3 bg-green-500 hover:bg-green-700 active:bg-green-950 text-white rounded-2xl"
              >
                New Item
              </button>
            )}
          </div>

          {editing ? (
            <ItemForm
              initial={editing._id ? editing : null}
              onSubmit={editing._id ? onUpdate : onCreate}
              onCancel={() => setEditing(null)}
              submitting={submitting}
            />
          ) : null}

          <ItemList items={filtered} onEdit={setEditing} onDelete={onDelete} />
          <Footer />
          <MousePointerAnimation />
        </div>
      </div>
    </ThemeProvider>
  );
}
