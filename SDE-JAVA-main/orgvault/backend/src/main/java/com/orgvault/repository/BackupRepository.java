package com.orgvault.repository;

import com.orgvault.model.BackupRecord;
import com.orgvault.model.BackupStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BackupRepository extends JpaRepository<BackupRecord, Long> {

    List<BackupRecord> findByOrgName(String orgName);

    List<BackupRecord> findByStatus(BackupStatus status);

    List<BackupRecord> findByFileType(String fileType);

    long countByStatus(BackupStatus status);
}
