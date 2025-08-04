package com.tiago.marketplace.model;

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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"username", "product_id"}))
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name="product_id")
    private Long productId;

    @Column(name="username")
    private String username;

    private Float rating;

    private String content;


    public Review(Long productId, String username, Float rating, String content){
        this.productId = productId;
        this.username = username;
        this.rating = rating;
        this.content = content;
    }

}
