import React from "react";
import { Toaster, toast } from "sonner";
import { PenBoxIcon, Trash2 } from "lucide-react";

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

export default function ItemList({ items, onEdit, onDelete }) {
  return (
    <div className="grid gap-6">
      {items.map((item) => (
        <div
          key={item._id}
          className="flex flex-col md:flex-row md:items-center gap-4 p-6 border rounded-2xl bg-white/60 dark:bg-gray-800/60"
        >
          {/* Thumbnail */}
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full md:w-72 h-48 object-cover rounded"
          />

          {/* Info */}
          <div className="flex-1 space-y-2">
            <div className="font-semibold text-lg">{item.name}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Edition: {item.edition_id} • Status: {item.status}
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <p>v{item.__v ?? 0}</p>
              <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
              <p>Updated: {new Date(item.updatedAt).toLocaleString()}</p>
              <p>Published: {new Date(item.published_at).toLocaleString()}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap md:flex-col lg:flex-row">
            <a
              href={item.edition_link}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 border rounded text-sm text-center"
            >
              Link
            </a>
            <button
              onClick={() => {
                onEdit(item);
                scrollToTop();
                toast("Edit Form Opened", {
                  style: { background: "#48bb78", color: "white" },
                });
              }}
              className="cursor-pointer px-3 py-1 bg-green-500 hover:bg-green-700 active:bg-green-950 text-white rounded flex items-center justify-center"
            >
              <PenBoxIcon size={18} />
            </button>
            <Toaster />
            <button
              onClick={() => {
                onDelete(item);
                toast("Item Deleted", {
                  style: { background: "red", color: "white" },
                });
              }}
              className="px-3 cursor-pointer py-1 bg-rose-600 hover:bg-rose-700 active:bg-rose-950 text-white rounded flex items-center justify-center"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
