package com.tenthousandideas.service;

import com.tenthousandideas.entity.BusinessIdea;
import com.tenthousandideas.repository.BusinessIdeaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BusinessIdeaService {

    @Autowired
    private BusinessIdeaRepository businessIdeaRepository;

    public Page<BusinessIdea> getAllIdeas(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return businessIdeaRepository.findAll(pageable);
    }

    public List<BusinessIdea> getAllBusinessIdeas() {
        return businessIdeaRepository.findAll();
    }
    
    public List<BusinessIdea> getTrendingIdeas() {
        return businessIdeaRepository.findByIsTrendingTrue();
    }

    public Optional<BusinessIdea> getBusinessIdeaById(Long id) {
        Optional<BusinessIdea> idea = businessIdeaRepository.findById(id);
        if (idea.isPresent()) {
            // Increment views
            BusinessIdea businessIdea = idea.get();
            businessIdea.setViewCount(businessIdea.getViewCount() + 1);
            businessIdeaRepository.save(businessIdea);
            return Optional.of(businessIdea);
        }
        return Optional.empty();
    }

    public List<BusinessIdea> getBusinessIdeasByCategory(String category) {
        return businessIdeaRepository.findByCategory(category);
    }

    public Page<BusinessIdea> searchBusinessIdeas(String query, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return businessIdeaRepository.findBySearchQuery(query, pageable);
    }

    public Page<BusinessIdea> filterBusinessIdeas(String category, Integer minInvestment, Integer maxInvestment, 
                                                  String expertiseLevel, String targetDemographic, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return businessIdeaRepository.findByFilters(category, minInvestment, maxInvestment, expertiseLevel, targetDemographic, pageable);
    }
    
    public List<String> getAllCategories() {
        return businessIdeaRepository.findDistinctCategories();
    }


}