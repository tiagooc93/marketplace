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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"name", "seller_id"}))
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double price;

    private String category;

    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String longDescription;

    private String brand;

    private String image;

    private String condition = "New";

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @JsonIgnore
    private ShoppingCart shoppingCart;

    @Column(name="seller_id")
    private Long sellerId;

    private Float rating = 4.0F;

    private String sellerUsername;

    public Product(String name, double price, String description, String image){
        this.name=name;
        this.price=price;
        this.description=description;
        this.image=image;
    }

    public Product(String name, double price, String category, String description, String longDescription, String brand, String image, Long sellerId, String sellerUsername){
        this.name=name;
        this.price=price;
        this.category=category;
        this.description=description;
        this.longDescription=longDescription;
        this.brand = brand;
        this.image=image;
        this.sellerId = sellerId;
        this.sellerUsername = sellerUsername;
    }

}
