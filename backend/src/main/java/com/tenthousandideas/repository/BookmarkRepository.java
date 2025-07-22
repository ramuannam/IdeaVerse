package com.tenthousandideas.repository;

import com.tenthousandideas.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByUser_Id(Long userId);
    Optional<Bookmark> findByUser_IdAndBusinessIdea_Id(Long userId, Long businessIdeaId);
    void deleteByUser_IdAndBusinessIdea_Id(Long userId, Long businessIdeaId);
    boolean existsByUser_IdAndBusinessIdea_Id(Long userId, Long businessIdeaId);
}