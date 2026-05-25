import React from "react";
import { RotateCcw, Trash2 } from "lucide-react";

function formatDate(value) {
  if (!value) {
    return "Not synced";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function BackupCard({ backup, onStatusChange, onDelete }) {
  const statusClass = backup.status.toLowerCase();

  return (
    <article className={`backup-card status-${statusClass}`}>
      <div className="backup-info">
        <div>
          <strong>{backup.fileName}</strong>
          <span className="muted">{backup.orgName}</span>
        </div>
        <span className="badge">{backup.fileType}</span>
        <span className={`status ${statusClass}`}>{backup.status}</span>
        <span className="timestamp">{formatDate(backup.updatedAt)}</span>
      </div>

      <div className="backup-actions">
        {backup.status === "ACTIVE" && (
          <button
            className="icon-button restore"
            title="Restore backup"
            aria-label={`Restore ${backup.fileName}`}
            onClick={() => onStatusChange(backup.id, "RESTORED")}
          >
            <RotateCcw size={17} />
          </button>
        )}

        <button
          className="icon-button delete"
          title="Delete backup"
          aria-label={`Delete ${backup.fileName}`}
          onClick={() => onDelete(backup.id)}
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}

export default BackupCard;
