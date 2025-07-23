package com.tiago.marketplace.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String longDescription;

    private String brand;

    private String image;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    private Long sellerId;

    private Float rating =4.0F;

    public Product(String name, double price, String description, String image){
        this.name=name;
        this.price=price;
        this.description=description;
        this.image=image;
    }

    public Product(String name, double price, String description, String brand, String image){
        this.name=name;
        this.price=price;
        this.description=description;
        this.brand = brand;
        this.image=image;
    }

    public Product(String name, double price, String description, String longDescription, String brand, String image){
        this.name=name;
        this.price=price;
        this.description=description;
        this.longDescription=longDescription;
        this.brand = brand;
        this.image=image;
    }

}
