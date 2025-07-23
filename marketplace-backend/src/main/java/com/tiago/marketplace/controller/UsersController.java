package com.tiago.marketplace.controller;

import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UsersController {

    @Autowired
    UsersService usersService;

    @PostMapping("/create")
    public ResponseEntity<Users> createUser(@RequestBody  Users user){
        return ResponseEntity.ok(usersService.addUser(user));
    }
}
