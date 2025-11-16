package com.foodtracker.service;

import com.foodtracker.model.Food;
import com.foodtracker.dto.FoodDTO;
import com.foodtracker.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodService {
    
    @Autowired
    private FoodRepository foodRepository;
    
    public FoodDTO convertToDTO(Food food) {
        FoodDTO dto = new FoodDTO();
        dto.setId(food.getId());
        dto.setName(food.getName());
        dto.setQuantity(food.getQuantity());
        dto.setUnit(food.getUnit());
        dto.setExpiryDate(food.getExpiryDate());
        dto.setAddedDate(food.getAddedDate());
        dto.setCategory(food.getCategory());
        dto.setStatus(food.getStatus());
        dto.setDaysUntilExpiry(food.getDaysUntilExpiry());
        return dto;
    }
    
    public Food convertToEntity(FoodDTO dto) {
        Food food = new Food();
        food.setId(dto.getId());
        food.setName(dto.getName());
        food.setQuantity(dto.getQuantity());
        food.setUnit(dto.getUnit());
        food.setExpiryDate(dto.getExpiryDate());
        food.setAddedDate(dto.getAddedDate() != null ? dto.getAddedDate() : LocalDate.now());
        food.setCategory(dto.getCategory());
        return food;
    }
    
    public FoodDTO addFood(FoodDTO foodDTO) {
        Food food = convertToEntity(foodDTO);
        if (food.getAddedDate() == null) {
            food.setAddedDate(LocalDate.now());
        }
        Food saved = foodRepository.save(food);
        return convertToDTO(saved);
    }
    
    public List<FoodDTO> getAllFoods() {
        return foodRepository.findAll().stream()
                .filter(food -> food.getDonated() == null || !food.getDonated())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public FoodDTO getFoodById(Long id) {
        return foodRepository.findById(id).map(this::convertToDTO).orElse(null);
    }
    
    public FoodDTO updateFood(Long id, FoodDTO foodDTO) {
        return foodRepository.findById(id).map(food -> {
            food.setName(foodDTO.getName());
            food.setQuantity(foodDTO.getQuantity());
            food.setUnit(foodDTO.getUnit());
            food.setExpiryDate(foodDTO.getExpiryDate());
            food.setCategory(foodDTO.getCategory());
            Food updated = foodRepository.save(food);
            return convertToDTO(updated);
        }).orElse(null);
    }
    
    public boolean deleteFood(Long id) {
        if (foodRepository.existsById(id)) {
            foodRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<FoodDTO> getExpiredFoods() {
        return foodRepository.findAll().stream()
                .filter(food -> (food.getDonated() == null || !food.getDonated()) && food.isExpired())
                .sorted((a, b) -> Long.compare(b.getDaysUntilExpiry(), a.getDaysUntilExpiry()))
                .map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public List<FoodDTO> getExpiringSoon() {
        return foodRepository.findAll().stream()
                .filter(food -> (food.getDonated() == null || !food.getDonated()) && food.isExpiringSoon() && !food.isExpired())
                .sorted((a, b) -> Long.compare(a.getDaysUntilExpiry(), b.getDaysUntilExpiry()))
                .map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public List<FoodDTO> getGoodFoods() {
        return foodRepository.findAll().stream()
                .filter(food -> (food.getDonated() == null || !food.getDonated()) && !food.isExpired() && !food.isExpiringSoon())
                .sorted((a, b) -> Long.compare(a.getDaysUntilExpiry(), b.getDaysUntilExpiry()))
                .map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public List<FoodDTO> searchFoods(String name) {
        return foodRepository.findByNameContainingIgnoreCase(name).stream()
                .filter(food -> food.getDonated() == null || !food.getDonated())
                .map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public List<FoodDTO> getFoodsByCategory(String category) {
        return foodRepository.findByCategory(category).stream()
                .filter(food -> food.getDonated() == null || !food.getDonated())
                .map(this::convertToDTO).collect(Collectors.toList());
    }
    
    public StatisticsDTO getStatistics() {
        List<Food> allFoods = foodRepository.findAll().stream()
                .filter(food -> food.getDonated() == null || !food.getDonated())
                .collect(Collectors.toList());
        long expired = allFoods.stream().filter(Food::isExpired).count();
        long expiringSoon = allFoods.stream().filter(food -> food.isExpiringSoon() && !food.isExpired()).count();
        long good = allFoods.stream().filter(food -> !food.isExpired() && !food.isExpiringSoon()).count();
        
        LocalDate nextWeek = LocalDate.now().plusDays(7);
        long expiringThisWeek = allFoods.stream()
                .filter(food -> food.getExpiryDate().isBefore(nextWeek) && !food.isExpired()).count();
        
        StatisticsDTO stats = new StatisticsDTO();
        stats.setTotalItems(allFoods.size());
        stats.setExpiredCount((int) expired);
        stats.setExpiringSoonCount((int) expiringSoon);
        stats.setGoodCount((int) good);
        stats.setExpiringThisWeekCount((int) expiringThisWeek);
        return stats;
    }
    
    public void addSampleData() {
        LocalDate today = LocalDate.now();
        addFood(FoodDTO.builder().name("Milk").quantity(1).unit("L").expiryDate(today.plusDays(2)).addedDate(today).category("dairy").build());
        addFood(FoodDTO.builder().name("Bread").quantity(1).unit("pcs").expiryDate(today.plusDays(1)).addedDate(today).category("pantry").build());
        addFood(FoodDTO.builder().name("Tomato").quantity(3).unit("pcs").expiryDate(today.minusDays(1)).addedDate(today).category("produce").build());
        addFood(FoodDTO.builder().name("Chicken").quantity(500).unit("g").expiryDate(today.plusDays(5)).addedDate(today).category("meat").build());
        addFood(FoodDTO.builder().name("Yogurt").quantity(2).unit("pcs").expiryDate(today.plusDays(3)).addedDate(today).category("dairy").build());
        addFood(FoodDTO.builder().name("Lettuce").quantity(1).unit("pcs").expiryDate(today.plusDays(2)).addedDate(today).category("produce").build());
        addFood(FoodDTO.builder().name("Ice Cream").quantity(1).unit("L").expiryDate(today.plusDays(30)).addedDate(today).category("frozen").build());
    }
    
    public FoodDTO donateFood(Long id) {
        return foodRepository.findById(id).map(food -> {
            food.setDonated(true);
            food.setDonatedDate(LocalDate.now());
            Food saved = foodRepository.save(food);
            return convertToDTO(saved);
        }).orElse(null);
    }
    
    public List<FoodDTO> getDonatedFoods() {
        return foodRepository.findAll().stream()
                .filter(food -> food.getDonated() != null && food.getDonated())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<FoodDTO> getActiveFoods() {
        return foodRepository.findAll().stream()
                .filter(food -> food.getDonated() == null || !food.getDonated())
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}
