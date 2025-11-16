package com.foodtracker.service;

public class StatisticsDTO {
    private int totalItems;
    private int expiredCount;
    private int expiringSoonCount;
    private int goodCount;
    private int expiringThisWeekCount;

    // Constructor - No Args
    public StatisticsDTO() {
    }

    // Constructor - All Args
    public StatisticsDTO(int totalItems, int expiredCount, int expiringSoonCount, 
                         int goodCount, int expiringThisWeekCount) {
        this.totalItems = totalItems;
        this.expiredCount = expiredCount;
        this.expiringSoonCount = expiringSoonCount;
        this.goodCount = goodCount;
        this.expiringThisWeekCount = expiringThisWeekCount;
    }

    // Getters and Setters
    public int getTotalItems() {
        return totalItems;
    }

    public void setTotalItems(int totalItems) {
        this.totalItems = totalItems;
    }

    public int getExpiredCount() {
        return expiredCount;
    }

    public void setExpiredCount(int expiredCount) {
        this.expiredCount = expiredCount;
    }

    public int getExpiringSoonCount() {
        return expiringSoonCount;
    }

    public void setExpiringSoonCount(int expiringSoonCount) {
        this.expiringSoonCount = expiringSoonCount;
    }

    public int getGoodCount() {
        return goodCount;
    }

    public void setGoodCount(int goodCount) {
        this.goodCount = goodCount;
    }

    public int getExpiringThisWeekCount() {
        return expiringThisWeekCount;
    }

    public void setExpiringThisWeekCount(int expiringThisWeekCount) {
        this.expiringThisWeekCount = expiringThisWeekCount;
    }

    // Builder Pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private int totalItems;
        private int expiredCount;
        private int expiringSoonCount;
        private int goodCount;
        private int expiringThisWeekCount;

        public Builder totalItems(int totalItems) {
            this.totalItems = totalItems;
            return this;
        }

        public Builder expiredCount(int expiredCount) {
            this.expiredCount = expiredCount;
            return this;
        }

        public Builder expiringSoonCount(int expiringSoonCount) {
            this.expiringSoonCount = expiringSoonCount;
            return this;
        }

        public Builder goodCount(int goodCount) {
            this.goodCount = goodCount;
            return this;
        }

        public Builder expiringThisWeekCount(int expiringThisWeekCount) {
            this.expiringThisWeekCount = expiringThisWeekCount;
            return this;
        }

        public StatisticsDTO build() {
            return new StatisticsDTO(totalItems, expiredCount, expiringSoonCount, goodCount, expiringThisWeekCount);
        }
    }

    @Override
    public String toString() {
        return "StatisticsDTO{" +
                "totalItems=" + totalItems +
                ", expiredCount=" + expiredCount +
                ", expiringSoonCount=" + expiringSoonCount +
                ", goodCount=" + goodCount +
                ", expiringThisWeekCount=" + expiringThisWeekCount +
                '}';
    }
}
