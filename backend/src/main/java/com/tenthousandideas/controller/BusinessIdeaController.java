package com.tenthousandideas.controller;

import com.tenthousandideas.entity.BusinessIdea;
import com.tenthousandideas.service.BusinessIdeaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/ideas")
@CrossOrigin(origins = "*")
public class BusinessIdeaController {

    @Autowired
    private BusinessIdeaService businessIdeaService;

    @GetMapping
    public ResponseEntity<?> getAllIdeas(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer minInvestment,
            @RequestParam(required = false) Integer maxInvestment,
            @RequestParam(required = false) String expertiseLevel,
            @RequestParam(required = false) String targetDemographic,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size) {

        try {
            Page<BusinessIdea> ideas;

            if (search != null && !search.isEmpty()) {
                ideas = businessIdeaService.searchBusinessIdeas(search, page, size);
            } else if (category != null || minInvestment != null || maxInvestment != null || 
                      expertiseLevel != null || targetDemographic != null) {
                ideas = businessIdeaService.filterBusinessIdeas(category, minInvestment, maxInvestment, 
                                                               expertiseLevel, targetDemographic, page, size);
            } else {
                ideas = businessIdeaService.getAllIdeas(page, size);
            }

            return ResponseEntity.ok(Map.of(
                "content", ideas.getContent(),
                "totalElements", ideas.getTotalElements(),
                "totalPages", ideas.getTotalPages(),
                "currentPage", page,
                "hasNext", ideas.hasNext(),
                "hasPrevious", ideas.hasPrevious()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BusinessIdea> getIdeaById(@PathVariable Long id) {
        Optional<BusinessIdea> idea = businessIdeaService.getBusinessIdeaById(id);
        
        if (idea.isPresent()) {
            return ResponseEntity.ok(idea.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/trending")
    public ResponseEntity<List<BusinessIdea>> getTrendingIdeas() {
        List<BusinessIdea> trendingIdeas = businessIdeaService.getTrendingIdeas();
        return ResponseEntity.ok(trendingIdeas);
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getAllCategories() {
        List<String> categories = businessIdeaService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
}

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
class StatsController {

    @Autowired
    private BusinessIdeaService businessIdeaService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        List<BusinessIdea> allIdeas = businessIdeaService.getAllBusinessIdeas();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalIdeas", allIdeas.size());
        stats.put("categories", allIdeas.stream().map(BusinessIdea::getCategory).distinct().count());
        stats.put("successStories", allIdeas.stream()
                .mapToInt(idea -> idea.getSuccessStories() != null ? idea.getSuccessStories().size() : 0)
                .sum());
        stats.put("trending", allIdeas.stream().mapToInt(idea -> idea.getIsTrending() ? 1 : 0).sum());
        
        return ResponseEntity.ok(stats);
    }
}