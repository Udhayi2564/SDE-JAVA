import { Activity, ArchiveRestore, Boxes, Database } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import BackupForm from "./components/BackupForm";
import BackupList from "./components/BackupList";
import { api } from "./services/api";

const filters = ["ALL", "ACTIVE", "RESTORED"];

function App() {
  const [backups, setBackups] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState("ALL");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setError("");
    try {
      const [data, statsData] = await Promise.all([
        api.getAll(),
        api.getStats()
      ]);
      setBackups(data);
      setStats(statsData);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshStats = async () => {
    try {
      setStats(await api.getStats());
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleAdd = (newBackup) => {
    setBackups((current) => [newBackup, ...current]);
    refreshStats();
  };

  const handleStatusChange = async (id, status) => {
    setError("");
    try {
      const updated = await api.updateStatus(id, status);
      setBackups((current) =>
        current.map((backup) => (backup.id === id ? updated : backup))
      );
      refreshStats();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    try {
      await api.delete(id);
      setBackups((current) => current.filter((backup) => backup.id !== id));
      refreshStats();
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  const filteredBackups = useMemo(() => {
    if (filter === "ALL") {
      return backups;
    }

    return backups.filter((backup) => backup.status === filter);
  }, [backups, filter]);

  return (
    <main className="app">
      <header className="top-bar">
        <div>
          <p className="eyebrow">Salesforce Metadata Backup Manager</p>
          <h1>OrgVault</h1>
        </div>
        <div className="sync-pill">
          <Activity size={17} />
          REST API connected
        </div>
      </header>

      <section className="stats-bar" aria-label="Backup stats">
        <div className="stat">
          <Database size={20} />
          <span>Total</span>
          <strong>{stats.total ?? 0}</strong>
        </div>
        <div className="stat active">
          <Boxes size={20} />
          <span>Active</span>
          <strong>{stats.active ?? 0}</strong>
        </div>
        <div className="stat restored">
          <ArchiveRestore size={20} />
          <span>Restored</span>
          <strong>{stats.restored ?? 0}</strong>
        </div>
      </section>

      {error && <div className="error-banner">{error}</div>}

      <BackupForm onAdd={handleAdd} onError={setError} />

      <section className="list-section">
        <div className="list-header">
          <h2>Backup Records</h2>
          <div className="filters" role="group" aria-label="Filter backups">
            {filters.map((value) => (
              <button
                key={value}
                className={filter === value ? "active" : ""}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="empty-state">Loading backups...</div>
        ) : (
          <BackupList
            backups={filteredBackups}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        )}
      </section>
    </main>
  );
}

export default App;
