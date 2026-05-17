package com.wd15.controller;

import com.wd15.model.FoodItem;
import com.wd15.service.FoodService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/foods")
public class FoodController {
    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping
    public List<FoodItem> getFoods(@RequestParam(required = false) String category) {
        return category == null ? foodService.findAll() : foodService.findByCategory(category);
    }
}
