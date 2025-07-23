package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.ProductDTO;
import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<Product> saveProduct(@ModelAttribute ProductDTO productDTO) throws IOException {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setLongDescription(productDTO.getLongDescription());
        product.setPrice(Double.parseDouble(productDTO.getPrice()));

        MultipartFile image = productDTO.getImage();
        // Example: Save image to disk
        if (image != null && !image.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path directoryPath = Paths.get("uploads/images");
            Path filePath = directoryPath.resolve(filename);
            Files.write(filePath, image.getBytes());
            product.setImage("/uploads/images/" + filename);
        }

        return productService.createProduct(product);
    }

    @GetMapping("/list")
    public ResponseEntity<List<Product>> listProducts(){
        return productService.listAllProducts();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Optional<Product>> getProduct(@PathVariable Long productId){
        return productService.getProduct(productId);
    }

}
