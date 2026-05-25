package com.orgvault.service;

import com.orgvault.model.BackupRecord;
import com.orgvault.model.BackupStatus;
import com.orgvault.repository.BackupRepository;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class BackupService {

    private final BackupRepository repository;

    public BackupService(BackupRepository repository) {
        this.repository = repository;
    }

    public BackupRecord createBackup(BackupRecord record) {
        record.setStatus(BackupStatus.ACTIVE);
        return repository.save(record);
    }

    public List<BackupRecord> getAllBackups() {
        return repository.findAll();
    }

    public List<BackupRecord> getByOrg(String orgName) {
        return repository.findByOrgName(orgName);
    }

    public List<BackupRecord> getByStatus(BackupStatus status) {
        return repository.findByStatus(status);
    }

    public List<BackupRecord> getByFileType(String fileType) {
        return repository.findByFileType(fileType);
    }

    public BackupRecord updateStatus(Long id, BackupStatus status) {
        BackupRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Backup not found: " + id));
        record.setStatus(status);
        return repository.save(record);
    }

    public void deleteBackup(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Backup not found: " + id);
        }
        repository.deleteById(id);
    }

    public Map<String, Long> getStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("total", repository.count());
        stats.put("active", repository.countByStatus(BackupStatus.ACTIVE));
        stats.put("restored", repository.countByStatus(BackupStatus.RESTORED));
        stats.put("deleted", repository.countByStatus(BackupStatus.DELETED));
        return stats;
    }
}
