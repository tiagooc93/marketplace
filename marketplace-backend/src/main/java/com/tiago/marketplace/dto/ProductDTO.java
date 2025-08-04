package com.tiago.marketplace.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDTO {

    private String name;

    private String category;

    private String description;

    private String longDescription;

    private String price;

    private String condition;

    private MultipartFile image;

}