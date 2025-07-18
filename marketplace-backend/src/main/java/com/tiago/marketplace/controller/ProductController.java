package com.tiago.marketplace.controller;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<Product> saveProduct(@RequestParam("name") String name,
                                               @RequestParam("description") String description,
                                               @RequestParam("price") Double price,
                                               @RequestParam("image") MultipartFile imageFile) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setImage(imageFile.getBytes());

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
