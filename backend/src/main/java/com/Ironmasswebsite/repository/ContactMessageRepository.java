package com.Ironmasswebsite.repository;

import com.Ironmasswebsite.entity.ContactMessage;
import com.Ironmasswebsite.entity.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
}