import { useEffect, useState } from "react";

const empty = {
  name: "",
  edition_id: "",
  status: "",
  edition_link: "",
  published_at: "",
  thumbnail: "",
};

export default function ItemForm({ initial, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(initial || empty);
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    [
      "name",
      "edition_id",
      "status",
      "edition_link",
      "published_at",
      "thumbnail",
    ].forEach((k) => {
      if (!form[k]) e[k] = "Required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 p-4 mb-9 bg-white/60 dark:bg-gray-800/60 rounded border border-gray-200 dark:border-gray-700"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Edition ID</label>
          <input
            name="edition_id"
            value={form.edition_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.edition_id && (
            <p className="text-red-600 text-xs">{errors.edition_id}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <input
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder=""
          />
          {errors.status && (
            <p className="text-red-600 text-xs">{errors.status}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Edition Link</label>
          <input
            name="edition_link"
            value={form.edition_link}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.edition_link && (
            <p className="text-red-600 text-xs">{errors.edition_link}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Published At</label>
          <input
            type="datetime-local"
            name="published_at"
            value={form.published_at}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.published_at && (
            <p className="text-red-600 text-xs">{errors.published_at}</p>
          )}
        </div>
        <div>
          <label className="block text-sm mb-1">Thumbnail URL</label>
          <input
            name="thumbnail"
            value={form.thumbnail}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
          {errors.thumbnail && (
            <p className="text-red-600 text-xs">{errors.thumbnail}</p>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          disabled={submitting}
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
