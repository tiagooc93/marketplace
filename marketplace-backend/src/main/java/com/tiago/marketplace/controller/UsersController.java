package com.tiago.marketplace.controller;

import com.tiago.marketplace.dto.UserAdsDTO;
import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.service.ProductService;
import com.tiago.marketplace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    UsersService usersService;

    @Autowired
    ProductService productService;

    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody  Users user){
        return ResponseEntity.ok(usersService.addUser(user));
    }

    @GetMapping("/ads")
    public ResponseEntity<UserAdsDTO> getUserAds(){
        Long userId = usersService.getUserIdFromAuthentication();
        List<Long> userAds = usersService.getUserAds(userId);
        List<Product> userAdsProducts = new ArrayList<>();

        for(int i=0; i<userAds.size(); i++){
            Product product = productService.getProduct(userAds.get(i)).orElseThrow();
            userAdsProducts.add(product);
        }
        UserAdsDTO userAdsDTO = new UserAdsDTO(userAdsProducts);

        return ResponseEntity.ok(userAdsDTO);
    }
}
