import { DatabaseBackup, Plus } from "lucide-react";
import React, { useState } from "react";
import { api } from "../services/api";

const initialForm = {
  fileName: "",
  fileType: "",
  orgName: ""
};

function BackupForm({ onAdd, onError }) {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.fileName || !form.fileType || !form.orgName) {
      onError("Please fill file name, file type, and org name.");
      return;
    }

    setSaving(true);
    try {
      const created = await api.create(form);
      onAdd(created);
      setForm(initialForm);
    } catch (error) {
      onError(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="section-heading">
        <DatabaseBackup size={20} />
        <h2>Add New Backup</h2>
      </div>

      <div className="form-grid">
        <label>
          File Name
          <input
            placeholder="AccountTrigger.cls"
            value={form.fileName}
            onChange={(event) => updateField("fileName", event.target.value)}
          />
        </label>

        <label>
          File Type
          <select
            value={form.fileType}
            onChange={(event) => updateField("fileType", event.target.value)}
          >
            <option value="">Select Type</option>
            <option value="APEX">APEX</option>
            <option value="WORKFLOW">WORKFLOW</option>
            <option value="OBJECT">OBJECT</option>
            <option value="FLOW">FLOW</option>
            <option value="PROFILE">PROFILE</option>
          </select>
        </label>

        <label>
          Org Name
          <input
            placeholder="SalesOrg_Production"
            value={form.orgName}
            onChange={(event) => updateField("orgName", event.target.value)}
          />
        </label>
      </div>

      <button className="primary-button" type="submit" disabled={saving}>
        <Plus size={18} />
        {saving ? "Adding..." : "Add Backup"}
      </button>
    </form>
  );
}

export default BackupForm;
