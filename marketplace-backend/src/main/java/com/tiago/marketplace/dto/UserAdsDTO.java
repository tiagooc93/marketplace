package com.tiago.marketplace.dto;

import com.tiago.marketplace.model.Product;

import java.util.List;

public record UserAdsDTO(List<Product> products) {
}
