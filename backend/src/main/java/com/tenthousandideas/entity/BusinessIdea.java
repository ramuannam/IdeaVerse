package com.tenthousandideas.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Entity
@Table(name = "business_ideas")
public class BusinessIdea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String detailedDescription;

    @Column(nullable = false)
    private String category;

    @Column(name = "target_demographic")
    private String targetDemographic;

    @Column(name = "min_investment")
    private Integer minInvestment;

    @Column(name = "max_investment")
    private Integer maxInvestment;

    @Column(name = "expertise_level")
    private String expertiseLevel;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(name = "success_rate")
    private Integer successRate;

    @Column(name = "time_to_profit")
    private String timeToProfit;

    @Column(name = "is_trending")
    private Boolean isTrending = false;

    @Column(name = "trend_reason")
    private String trendReason;

    @Column(name = "rating")
    private Double rating = 0.0;

    @Column(name = "view_count")
    private Long viewCount = 0L;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ElementCollection
    @CollectionTable(name = "business_idea_tags", joinColumns = @JoinColumn(name = "business_idea_id"))
    @Column(name = "tag")
    private List<String> tags;

    @ElementCollection
    @CollectionTable(name = "business_idea_investment_details", joinColumns = @JoinColumn(name = "business_idea_id"))
    @MapKeyColumn(name = "detail_key")
    @Column(name = "detail_value", columnDefinition = "TEXT")
    private Map<String, String> investmentDetails;

    @ElementCollection
    @CollectionTable(name = "business_idea_government_support", joinColumns = @JoinColumn(name = "business_idea_id"))
    @Column(name = "support_detail", columnDefinition = "TEXT")
    private List<String> governmentSupport;

    @ElementCollection
    @CollectionTable(name = "business_idea_success_stories", joinColumns = @JoinColumn(name = "business_idea_id"))
    @Column(name = "story", columnDefinition = "TEXT")
    private List<String> successStories;

    @ElementCollection
    @CollectionTable(name = "business_idea_training_resources", joinColumns = @JoinColumn(name = "business_idea_id"))
    @Column(name = "resource", columnDefinition = "TEXT")
    private List<String> trainingResources;

    @ElementCollection
    @CollectionTable(name = "business_idea_steps", joinColumns = @JoinColumn(name = "business_idea_id"))
    @Column(name = "step", columnDefinition = "TEXT")
    private List<String> implementationSteps;

    @OneToMany(mappedBy = "businessIdea", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Bookmark> bookmarks;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Constructors
    public BusinessIdea() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDetailedDescription() { return detailedDescription; }
    public void setDetailedDescription(String detailedDescription) { this.detailedDescription = detailedDescription; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTargetDemographic() { return targetDemographic; }
    public void setTargetDemographic(String targetDemographic) { this.targetDemographic = targetDemographic; }

    public Integer getMinInvestment() { return minInvestment; }
    public void setMinInvestment(Integer minInvestment) { this.minInvestment = minInvestment; }

    public Integer getMaxInvestment() { return maxInvestment; }
    public void setMaxInvestment(Integer maxInvestment) { this.maxInvestment = maxInvestment; }

    public String getExpertiseLevel() { return expertiseLevel; }
    public void setExpertiseLevel(String expertiseLevel) { this.expertiseLevel = expertiseLevel; }

    public String getRequirements() { return requirements; }
    public void setRequirements(String requirements) { this.requirements = requirements; }

    public Integer getSuccessRate() { return successRate; }
    public void setSuccessRate(Integer successRate) { this.successRate = successRate; }

    public String getTimeToProfit() { return timeToProfit; }
    public void setTimeToProfit(String timeToProfit) { this.timeToProfit = timeToProfit; }

    public Boolean getIsTrending() { return isTrending; }
    public void setIsTrending(Boolean isTrending) { this.isTrending = isTrending; }

    public String getTrendReason() { return trendReason; }
    public void setTrendReason(String trendReason) { this.trendReason = trendReason; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Long getViewCount() { return viewCount; }
    public void setViewCount(Long viewCount) { this.viewCount = viewCount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public Map<String, String> getInvestmentDetails() { return investmentDetails; }
    public void setInvestmentDetails(Map<String, String> investmentDetails) { this.investmentDetails = investmentDetails; }

    public List<String> getGovernmentSupport() { return governmentSupport; }
    public void setGovernmentSupport(List<String> governmentSupport) { this.governmentSupport = governmentSupport; }

    public List<String> getSuccessStories() { return successStories; }
    public void setSuccessStories(List<String> successStories) { this.successStories = successStories; }

    public List<String> getTrainingResources() { return trainingResources; }
    public void setTrainingResources(List<String> trainingResources) { this.trainingResources = trainingResources; }

    public List<String> getImplementationSteps() { return implementationSteps; }
    public void setImplementationSteps(List<String> implementationSteps) { this.implementationSteps = implementationSteps; }

    public Set<Bookmark> getBookmarks() { return bookmarks; }
    public void setBookmarks(Set<Bookmark> bookmarks) { this.bookmarks = bookmarks; }
}