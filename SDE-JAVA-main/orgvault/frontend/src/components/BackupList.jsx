import React from "react";
import BackupCard from "./BackupCard";

function BackupList({ backups, onStatusChange, onDelete }) {
  if (backups.length === 0) {
    return (
      <div className="empty-state">
        No backups found for the selected filter.
      </div>
    );
  }

  return (
    <div className="backup-list">
      {backups.map((backup) => (
        <BackupCard
          key={backup.id}
          backup={backup}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default BackupList;
