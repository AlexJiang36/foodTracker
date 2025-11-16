package com.foodtracker.service;

import com.foodtracker.dto.RecipeDTO;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeSuggestionService {

    private List<RecipeDTO> getAllRecipes() {
        List<RecipeDTO> recipes = new ArrayList<>();

        // Dairy Recipes
        recipes.add(new RecipeDTO(
            "Cheese Omelette",
            "A fluffy omelette with melted cheese",
            Arrays.asList("Milk", "Eggs", "Cheese"),
            "10 mins",
            "Easy",
            "Beat eggs with milk, pour into buttered pan, add cheese, fold and serve."
        ));

        recipes.add(new RecipeDTO(
            "Creamy Pasta",
            "Pasta with creamy milk sauce",
            Arrays.asList("Milk", "Pasta", "Butter"),
            "20 mins",
            "Easy",
            "Cook pasta, make béchamel sauce with milk and butter, mix with pasta."
        ));

        recipes.add(new RecipeDTO(
            "Yogurt Parfait",
            "Layered yogurt with granola",
            Arrays.asList("Yogurt", "Granola", "Berries"),
            "5 mins",
            "Very Easy",
            "Layer yogurt, granola, and berries in a glass. Serve immediately."
        ));

        // Produce Recipes
        recipes.add(new RecipeDTO(
            "Fresh Salad",
            "Crisp vegetable salad",
            Arrays.asList("Lettuce", "Tomato", "Cucumber"),
            "10 mins",
            "Very Easy",
            "Chop vegetables, toss with olive oil and vinegar, season to taste."
        ));

        recipes.add(new RecipeDTO(
            "Tomato Sauce",
            "Classic pasta sauce",
            Arrays.asList("Tomato", "Garlic", "Olive Oil"),
            "30 mins",
            "Easy",
            "Sauté garlic, add chopped tomatoes, simmer 20 mins, season with salt and pepper."
        ));

        recipes.add(new RecipeDTO(
            "Vegetable Stir Fry",
            "Quick and colorful stir fry",
            Arrays.asList("Lettuce", "Tomato", "Garlic"),
            "15 mins",
            "Easy",
            "Heat oil, stir fry vegetables, add soy sauce and serve over rice."
        ));

        // Meat Recipes
        recipes.add(new RecipeDTO(
            "Grilled Chicken",
            "Juicy grilled chicken breast",
            Arrays.asList("Chicken", "Olive Oil", "Lemon"),
            "25 mins",
            "Easy",
            "Season chicken, grill 12-15 mins per side, rest 5 mins before serving."
        ));

        recipes.add(new RecipeDTO(
            "Chicken Soup",
            "Warm and comforting chicken soup",
            Arrays.asList("Chicken", "Carrots", "Celery"),
            "45 mins",
            "Easy",
            "Boil chicken with vegetables, season, simmer until cooked through."
        ));

        // Pantry Recipes
        recipes.add(new RecipeDTO(
            "Classic Sandwich",
            "Simple bread sandwich",
            Arrays.asList("Bread", "Butter", "Cheese"),
            "5 mins",
            "Very Easy",
            "Butter bread slices, add cheese, cut diagonally and serve."
        ));

        recipes.add(new RecipeDTO(
            "Bread Pudding",
            "Sweet dessert using stale bread",
            Arrays.asList("Bread", "Milk", "Eggs"),
            "50 mins",
            "Medium",
            "Cube bread, soak in milk and egg mixture, bake at 350°F for 40 mins."
        ));

        // Frozen Recipes
        recipes.add(new RecipeDTO(
            "Ice Cream Sundae",
            "Classic ice cream dessert",
            Arrays.asList("Ice Cream", "Chocolate Sauce", "Nuts"),
            "5 mins",
            "Very Easy",
            "Scoop ice cream into bowl, drizzle with sauce, top with nuts."
        ));

        recipes.add(new RecipeDTO(
            "Smoothie Bowl",
            "Frozen fruit smoothie bowl",
            Arrays.asList("Ice Cream", "Berries", "Granola"),
            "10 mins",
            "Easy",
            "Blend ice cream with berries, pour into bowl, top with granola."
        ));

        return recipes;
    }

    public List<RecipeDTO> getRecipeSuggestions(String foodName) {
        String foodLower = foodName.toLowerCase();
        return getAllRecipes().stream()
                .filter(recipe -> recipe.getIngredients().stream()
                        .anyMatch(ing -> ing.toLowerCase().contains(foodLower) || 
                                       foodLower.contains(ing.toLowerCase())))
                .collect(Collectors.toList());
    }

    public List<RecipeDTO> getRecipeSuggestionsForMultiple(List<String> foodNames) {
        return getAllRecipes().stream()
                .filter(recipe -> {
                    int matchCount = 0;
                    for (String ingredient : recipe.getIngredients()) {
                        for (String food : foodNames) {
                            if (ingredient.toLowerCase().contains(food.toLowerCase()) || 
                                food.toLowerCase().contains(ingredient.toLowerCase())) {
                                matchCount++;
                            }
                        }
                    }
                    return matchCount > 0;
                })
                .collect(Collectors.toList());
    }

    public List<RecipeDTO> getRecipeSuggestionsForCategory(String category) {
        List<String> categoryFoods = getCategoryFoods(category);
        if (categoryFoods.isEmpty()) {
            return new ArrayList<>();
        }
        return getRecipeSuggestionsForMultiple(categoryFoods);
    }

    private List<String> getCategoryFoods(String category) {
        switch (category.toLowerCase()) {
            case "dairy":
                return Arrays.asList("Milk", "Yogurt", "Cheese");
            case "produce":
                return Arrays.asList("Tomato", "Lettuce", "Cucumber");
            case "meat":
                return Arrays.asList("Chicken", "Beef", "Fish");
            case "pantry":
                return Arrays.asList("Bread", "Rice", "Pasta");
            case "frozen":
                return Arrays.asList("Ice Cream", "Frozen");
            default:
                return new ArrayList<>();
        }
    }
}
