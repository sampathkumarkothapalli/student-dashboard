package com.studentdashboard.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println("Database Seeder is disabled for user-driven setup.");
    }
}
