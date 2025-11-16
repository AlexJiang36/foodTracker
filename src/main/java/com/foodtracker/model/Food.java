package com.foodtracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "foods")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false)
    private String unit;
    
    @Column(nullable = false)
    private LocalDate expiryDate;
    
    @Column(nullable = false)
    private LocalDate addedDate;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false)
    private Boolean donated = false;
    
    @Column
    private LocalDate donatedDate;
    
    // Constructor - No Args
    public Food() {
    }

    // Constructor - All Args
    public Food(Long id, String name, Integer quantity, String unit, LocalDate expiryDate, 
                LocalDate addedDate, String category, Boolean donated, LocalDate donatedDate) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.expiryDate = expiryDate;
        this.addedDate = addedDate;
        this.category = category;
        this.donated = donated;
        this.donatedDate = donatedDate;
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

    public Boolean getDonated() {
        return donated;
    }

    public void setDonated(Boolean donated) {
        this.donated = donated;
    }

    public LocalDate getDonatedDate() {
        return donatedDate;
    }

    public void setDonatedDate(LocalDate donatedDate) {
        this.donatedDate = donatedDate;
    }
    
    // Calculate days until expiry
    @Transient
    public long getDaysUntilExpiry() {
        return ChronoUnit.DAYS.between(LocalDate.now(), expiryDate);
    }
    
    // Check if expired
    @Transient
    public boolean isExpired() {
        return getDaysUntilExpiry() < 0;
    }
    
    // Check if expiring soon (within 3 days)
    @Transient
    public boolean isExpiringSoon() {
        long daysLeft = getDaysUntilExpiry();
        return daysLeft >= 0 && daysLeft <= 3;
    }
    
    // Get status
    @Transient
    public String getStatus() {
        long daysLeft = getDaysUntilExpiry();
        
        if (daysLeft < 0) {
            return "EXPIRED";
        } else if (daysLeft <= 3) {
            return "EXPIRING_SOON";
        } else {
            return "GOOD";
        }
    }

    @Override
    public String toString() {
        return "Food{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", unit='" + unit + '\'' +
                ", expiryDate=" + expiryDate +
                ", addedDate=" + addedDate +
                ", category='" + category + '\'' +
                '}';
    }
}
