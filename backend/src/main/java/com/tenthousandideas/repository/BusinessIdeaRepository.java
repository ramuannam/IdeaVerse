package com.tenthousandideas.repository;

import com.tenthousandideas.entity.BusinessIdea;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusinessIdeaRepository extends JpaRepository<BusinessIdea, Long> {
    
    List<BusinessIdea> findByCategory(String category);
    
    @Query("SELECT b FROM BusinessIdea b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    Page<BusinessIdea> findBySearchQuery(@Param("query") String query, Pageable pageable);
    
    List<BusinessIdea> findByIsTrendingTrue();
    
    @Query("SELECT DISTINCT b.category FROM BusinessIdea b")
    List<String> findDistinctCategories();
    
    @Query("SELECT b FROM BusinessIdea b WHERE " +
           "(:category IS NULL OR b.category = :category) AND " +
           "(:minInvestment IS NULL OR b.minInvestment >= :minInvestment) AND " +
           "(:maxInvestment IS NULL OR b.maxInvestment <= :maxInvestment) AND " +
           "(:expertiseLevel IS NULL OR b.expertiseLevel = :expertiseLevel) AND " +
           "(:targetDemographic IS NULL OR b.targetDemographic = :targetDemographic)")
    Page<BusinessIdea> findByFilters(@Param("category") String category,
                                   @Param("minInvestment") Integer minInvestment,
                                   @Param("maxInvestment") Integer maxInvestment,
                                   @Param("expertiseLevel") String expertiseLevel,
                                   @Param("targetDemographic") String targetDemographic,
                                   Pageable pageable);
}