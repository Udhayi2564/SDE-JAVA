package com.orgvault;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OrgVaultApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrgVaultApplication.class, args);
    }

    @Bean
    ApplicationRunner applicationRunner(@Value("${server.port:8080}") String port) {
        return args -> {
            System.out.println();
            System.out.println("OrgVault backend is running");
            System.out.println("API base URL : http://localhost:" + port + "/api/backups");
            System.out.println("Swagger UI   : http://localhost:" + port + "/swagger-ui/index.html");
            System.out.println();
        };
    }
}
