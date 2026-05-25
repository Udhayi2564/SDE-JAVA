package com.orgvault.controller;

import com.orgvault.model.BackupRecord;
import com.orgvault.model.BackupStatus;
import com.orgvault.service.BackupService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/backups")
@CrossOrigin(origins = "http://localhost:3000")
public class BackupController {

    private final BackupService service;

    public BackupController(BackupService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<BackupRecord> create(@Valid @RequestBody BackupRecord record) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createBackup(record));
    }

    @GetMapping
    public ResponseEntity<List<BackupRecord>> getAll() {
        return ResponseEntity.ok(service.getAllBackups());
    }

    @GetMapping("/org/{orgName}")
    public ResponseEntity<List<BackupRecord>> getByOrg(@PathVariable String orgName) {
        return ResponseEntity.ok(service.getByOrg(orgName));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BackupRecord>> getByStatus(@PathVariable BackupStatus status) {
        return ResponseEntity.ok(service.getByStatus(status));
    }

    @GetMapping("/type/{fileType}")
    public ResponseEntity<List<BackupRecord>> getByFileType(@PathVariable String fileType) {
        return ResponseEntity.ok(service.getByFileType(fileType));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BackupRecord> updateStatus(
            @PathVariable Long id,
            @RequestParam BackupStatus status
    ) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteBackup(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getStats() {
        return ResponseEntity.ok(service.getStats());
    }
}
