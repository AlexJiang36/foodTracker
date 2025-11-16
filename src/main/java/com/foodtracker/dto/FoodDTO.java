package com.foodtracker.dto;

import java.time.LocalDate;

public class FoodDTO {
    private Long id;
    private String name;
    private Integer quantity;
    private String unit;
    private LocalDate expiryDate;
    private LocalDate addedDate;
    private String category;
    private String status;
    private Long daysUntilExpiry;

    // Constructor - No Args
    public FoodDTO() {
    }

    // Constructor - All Args
    public FoodDTO(Long id, String name, Integer quantity, String unit, LocalDate expiryDate, 
                   LocalDate addedDate, String category, String status, Long daysUntilExpiry) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.expiryDate = expiryDate;
        this.addedDate = addedDate;
        this.category = category;
        this.status = status;
        this.daysUntilExpiry = daysUntilExpiry;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public LocalDate getAddedDate() {
        return addedDate;
    }

    public void setAddedDate(LocalDate addedDate) {
        this.addedDate = addedDate;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getDaysUntilExpiry() {
        return daysUntilExpiry;
    }

    public void setDaysUntilExpiry(Long daysUntilExpiry) {
        this.daysUntilExpiry = daysUntilExpiry;
    }

    // Builder Pattern
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private Integer quantity;
        private String unit;
        private LocalDate expiryDate;
        private LocalDate addedDate;
        private String category;
        private String status;
        private Long daysUntilExpiry;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder quantity(Integer quantity) {
            this.quantity = quantity;
            return this;
        }

        public Builder unit(String unit) {
            this.unit = unit;
            return this;
        }

        public Builder expiryDate(LocalDate expiryDate) {
            this.expiryDate = expiryDate;
            return this;
        }

        public Builder addedDate(LocalDate addedDate) {
            this.addedDate = addedDate;
            return this;
        }

        public Builder category(String category) {
            this.category = category;
            return this;
        }

        public Builder status(String status) {
            this.status = status;
            return this;
        }

        public Builder daysUntilExpiry(Long daysUntilExpiry) {
            this.daysUntilExpiry = daysUntilExpiry;
            return this;
        }

        public FoodDTO build() {
            return new FoodDTO(id, name, quantity, unit, expiryDate, addedDate, category, status, daysUntilExpiry);
        }
    }

    @Override
    public String toString() {
        return "FoodDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", unit='" + unit + '\'' +
                ", expiryDate=" + expiryDate +
                ", addedDate=" + addedDate +
                ", category='" + category + '\'' +
                ", status='" + status + '\'' +
                ", daysUntilExpiry=" + daysUntilExpiry +
                '}';
    }
}
