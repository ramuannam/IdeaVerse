package com.tenthousandideas.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class BusinessIdeaResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String targetDemographic;
    private InvestmentDTO investment;
    private String expertise;
    private String trainingTime;
    private MonthlyEarningDTO monthlyEarning;
    private String profitMargin;
    private Integer successRate;
    private String timeInvestment;
    private String landRequired;
    private String roi;
    private Integer rating;
    private Integer views;
    private String imageUrl;
    private String location;
    private String marketDemand;
    private String scalability;
    private String seasonality;
    private String competitionLevel;
    private List<String> specialAdvantages;
    private List<String> fundingOptions;
    private List<String> bankSupport;
    private List<String> resources;
    private List<String> trainingPrograms;
    private GovernmentSupportDTO governmentSupport;
    private List<SuccessStoryDTO> successStories;

    public static class InvestmentDTO {
        private Integer min;
        private Integer max;
        private String currency;

        public InvestmentDTO(Integer min, Integer max, String currency) {
            this.min = min;
            this.max = max;
            this.currency = currency;
        }

        // Getters and setters
        public Integer getMin() { return min; }
        public void setMin(Integer min) { this.min = min; }

        public Integer getMax() { return max; }
        public void setMax(Integer max) { this.max = max; }

        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }
    }

    public static class MonthlyEarningDTO {
        private Integer min;
        private Integer max;
        private String currency;

        public MonthlyEarningDTO(Integer min, Integer max, String currency) {
            this.min = min;
            this.max = max;
            this.currency = currency;
        }

        // Getters and setters
        public Integer getMin() { return min; }
        public void setMin(Integer min) { this.min = min; }

        public Integer getMax() { return max; }
        public void setMax(Integer max) { this.max = max; }

        public String getCurrency() { return currency; }
        public void setCurrency(String currency) { this.currency = currency; }
    }

    public static class GovernmentSupportDTO {
        private boolean available;
        private List<String> schemes;
        private List<String> subsidies;

        public GovernmentSupportDTO(boolean available, List<String> schemes, List<String> subsidies) {
            this.available = available;
            this.schemes = schemes;
            this.subsidies = subsidies;
        }

        // Getters and setters
        public boolean isAvailable() { return available; }
        public void setAvailable(boolean available) { this.available = available; }

        public List<String> getSchemes() { return schemes; }
        public void setSchemes(List<String> schemes) { this.schemes = schemes; }

        public List<String> getSubsidies() { return subsidies; }
        public void setSubsidies(List<String> subsidies) { this.subsidies = subsidies; }
    }

    public static class SuccessStoryDTO {
        private String name;
        private String location;
        private String story;
        private String earnings;

        public SuccessStoryDTO(String name, String location, String story, String earnings) {
            this.name = name;
            this.location = location;
            this.story = story;
            this.earnings = earnings;
        }

        // Getters and setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getLocation() { return location; }
        public void setLocation(String location) { this.location = location; }

        public String getStory() { return story; }
        public void setStory(String story) { this.story = story; }

        public String getEarnings() { return earnings; }
        public void setEarnings(String earnings) { this.earnings = earnings; }
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getTargetDemographic() { return targetDemographic; }
    public void setTargetDemographic(String targetDemographic) { this.targetDemographic = targetDemographic; }

    public InvestmentDTO getInvestment() { return investment; }
    public void setInvestment(InvestmentDTO investment) { this.investment = investment; }

    public String getExpertise() { return expertise; }
    public void setExpertise(String expertise) { this.expertise = expertise; }

    public String getTrainingTime() { return trainingTime; }
    public void setTrainingTime(String trainingTime) { this.trainingTime = trainingTime; }

    public MonthlyEarningDTO getMonthlyEarning() { return monthlyEarning; }
    public void setMonthlyEarning(MonthlyEarningDTO monthlyEarning) { this.monthlyEarning = monthlyEarning; }

    public String getProfitMargin() { return profitMargin; }
    public void setProfitMargin(String profitMargin) { this.profitMargin = profitMargin; }

    public Integer getSuccessRate() { return successRate; }
    public void setSuccessRate(Integer successRate) { this.successRate = successRate; }

    public String getTimeInvestment() { return timeInvestment; }
    public void setTimeInvestment(String timeInvestment) { this.timeInvestment = timeInvestment; }

    public String getLandRequired() { return landRequired; }
    public void setLandRequired(String landRequired) { this.landRequired = landRequired; }

    public String getRoi() { return roi; }
    public void setRoi(String roi) { this.roi = roi; }

    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }

    public Integer getViews() { return views; }
    public void setViews(Integer views) { this.views = views; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getMarketDemand() { return marketDemand; }
    public void setMarketDemand(String marketDemand) { this.marketDemand = marketDemand; }

    public String getScalability() { return scalability; }
    public void setScalability(String scalability) { this.scalability = scalability; }

    public String getSeasonality() { return seasonality; }
    public void setSeasonality(String seasonality) { this.seasonality = seasonality; }

    public String getCompetitionLevel() { return competitionLevel; }
    public void setCompetitionLevel(String competitionLevel) { this.competitionLevel = competitionLevel; }

    public List<String> getSpecialAdvantages() { return specialAdvantages; }
    public void setSpecialAdvantages(List<String> specialAdvantages) { this.specialAdvantages = specialAdvantages; }

    public List<String> getFundingOptions() { return fundingOptions; }
    public void setFundingOptions(List<String> fundingOptions) { this.fundingOptions = fundingOptions; }

    public List<String> getBankSupport() { return bankSupport; }
    public void setBankSupport(List<String> bankSupport) { this.bankSupport = bankSupport; }

    public List<String> getResources() { return resources; }
    public void setResources(List<String> resources) { this.resources = resources; }

    public List<String> getTrainingPrograms() { return trainingPrograms; }
    public void setTrainingPrograms(List<String> trainingPrograms) { this.trainingPrograms = trainingPrograms; }

    public GovernmentSupportDTO getGovernmentSupport() { return governmentSupport; }
    public void setGovernmentSupport(GovernmentSupportDTO governmentSupport) { this.governmentSupport = governmentSupport; }

    public List<SuccessStoryDTO> getSuccessStories() { return successStories; }
    public void setSuccessStories(List<SuccessStoryDTO> successStories) { this.successStories = successStories; }
}