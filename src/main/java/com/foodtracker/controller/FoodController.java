package com.foodtracker.controller;

import com.foodtracker.dto.FoodDTO;
import com.foodtracker.dto.RecipeDTO;
import com.foodtracker.service.FoodService;
import com.foodtracker.service.RecipeSuggestionService;
import com.foodtracker.service.StatisticsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
@CrossOrigin(origins = "*")
public class FoodController {
    
    @Autowired
    private FoodService foodService;
    
    @Autowired
    private RecipeSuggestionService recipeSuggestionService;
    
    // Get all foods
    @GetMapping
    public ResponseEntity<List<FoodDTO>> getAllFoods() {
        return ResponseEntity.ok(foodService.getAllFoods());
    }
    
    // Get food by ID
    @GetMapping("/{id}")
    public ResponseEntity<FoodDTO> getFoodById(@PathVariable Long id) {
        FoodDTO food = foodService.getFoodById(id);
        if (food != null) {
            return ResponseEntity.ok(food);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Add new food
    @PostMapping
    public ResponseEntity<FoodDTO> addFood(@RequestBody FoodDTO foodDTO) {
        FoodDTO created = foodService.addFood(foodDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    // Update food
    @PutMapping("/{id}")
    public ResponseEntity<FoodDTO> updateFood(@PathVariable Long id, @RequestBody FoodDTO foodDTO) {
        FoodDTO updated = foodService.updateFood(id, foodDTO);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Delete food
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFood(@PathVariable Long id) {
        if (foodService.deleteFood(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get expired foods
    @GetMapping("/status/expired")
    public ResponseEntity<List<FoodDTO>> getExpiredFoods() {
        return ResponseEntity.ok(foodService.getExpiredFoods());
    }
    
    // Get expiring soon foods
    @GetMapping("/status/expiring-soon")
    public ResponseEntity<List<FoodDTO>> getExpiringSoon() {
        return ResponseEntity.ok(foodService.getExpiringSoon());
    }
    
    // Get good foods
    @GetMapping("/status/good")
    public ResponseEntity<List<FoodDTO>> getGoodFoods() {
        return ResponseEntity.ok(foodService.getGoodFoods());
    }
    
    // Search foods
    @GetMapping("/search")
    public ResponseEntity<List<FoodDTO>> searchFoods(@RequestParam String query) {
        return ResponseEntity.ok(foodService.searchFoods(query));
    }
    
    // Get foods by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<FoodDTO>> getFoodsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(foodService.getFoodsByCategory(category));
    }
    
    // Get statistics
    @GetMapping("/statistics")
    public ResponseEntity<StatisticsDTO> getStatistics() {
        return ResponseEntity.ok(foodService.getStatistics());
    }
    
    // Add sample data
    @PostMapping("/sample-data")
    public ResponseEntity<String> addSampleData() {
        foodService.addSampleData();
        return ResponseEntity.ok("Sample data added successfully");
    }
    
    // Donate food
    @PostMapping("/{id}/donate")
    public ResponseEntity<FoodDTO> donateFood(@PathVariable Long id) {
        FoodDTO donated = foodService.donateFood(id);
        if (donated != null) {
            return ResponseEntity.ok(donated);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Get donated foods
    @GetMapping("/donated/list")
    public ResponseEntity<List<FoodDTO>> getDonatedFoods() {
        return ResponseEntity.ok(foodService.getDonatedFoods());
    }
    
    // Get active foods (not donated)
    @GetMapping("/active")
    public ResponseEntity<List<FoodDTO>> getActiveFoods() {
        return ResponseEntity.ok(foodService.getActiveFoods());
    }
    
    // Get recipe suggestions for a specific food
    @GetMapping("/recipes/{foodName}")
    public ResponseEntity<List<RecipeDTO>> getRecipeSuggestions(@PathVariable String foodName) {
        return ResponseEntity.ok(recipeSuggestionService.getRecipeSuggestions(foodName));
    }
    
    // Get recipe suggestions for expiring foods
    @GetMapping("/recipes/category/{category}")
    public ResponseEntity<List<RecipeDTO>> getRecipeSuggestionsForCategory(@PathVariable String category) {
        return ResponseEntity.ok(recipeSuggestionService.getRecipeSuggestionsForCategory(category));
    }
}
