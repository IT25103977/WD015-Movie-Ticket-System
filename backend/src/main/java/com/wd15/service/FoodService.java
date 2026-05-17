package com.wd15.service;

import com.wd15.model.FoodItem;
import com.wd15.repository.FoodItemRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FoodService {
    private final FoodItemRepository foodItemRepository;

    public FoodService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    public List<FoodItem> findAll() {
        return foodItemRepository.findAll();
    }

    public List<FoodItem> findByCategory(String category) {
        return foodItemRepository.findByCategory(category);
    }
}
