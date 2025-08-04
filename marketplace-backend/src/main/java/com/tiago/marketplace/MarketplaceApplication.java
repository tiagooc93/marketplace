package com.tiago.marketplace;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiago.marketplace.controller.AuthenticationController;
import com.tiago.marketplace.dto.LoginDTO;
import com.tiago.marketplace.dto.RegisterDTO;
import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.ReviewRepository;
import com.tiago.marketplace.repository.UsersRepository;
import com.tiago.marketplace.service.ProductService;
import com.tiago.marketplace.service.ReviewService;
import com.tiago.marketplace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.io.File;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class MarketplaceApplication implements CommandLineRunner {

	@Autowired
	private UsersService usersService;

	@Autowired
	private AuthenticationController authenticationController;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	ProductService productService;

	@Autowired
	ReviewService reviewService;

	@Autowired
	private ReviewRepository reviewRepository;


	public static void main(String[] args) {
		SpringApplication.run(MarketplaceApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception{
		authenticationController.register(new RegisterDTO("tiagooc10","tiago@test.com","123"));
		authenticationController.register(new RegisterDTO("matheus13","matheus@test.com","123"));

		ObjectMapper mapper = new ObjectMapper();
		// Absolute or relative path to the file
		File jsonFile = Paths.get("products_dataset.json").toFile();


		List<Map<String, Object>> products = mapper.readValue(jsonFile, new TypeReference<>() {});
		for (Map<String, Object> raw : products) {
			try {
				productService.createProduct(
						new Product(
								(String) raw.get("Product"),
								Double.parseDouble(raw.get("Price").toString()),
								(String) raw.get("Category"),
								(String) raw.get("Description"),
								(String) raw.get("LongDescription"),
								(String) raw.get("Brand"),
								"/uploads/images/product" + raw.get("ID") + ".png",
								((Number) raw.get("SellerID")).longValue(),
								(String) raw.get("SellerUsername")
						)
				);
			} catch (IllegalArgumentException e) {
				System.out.println("Skipping duplicate product: " + raw.get("Product") + " (SellerID: " + raw.get("SellerID") + ")");
			} catch (Exception e) {
				System.out.println("Error inserting product: " + raw.get("Product"));
			}
		}
		System.out.println("Products seeded.");

		//Seed Reviews
		jsonFile = Paths.get("reviews_dataset.json").toFile();
		List<Map<String, Object>> reviews = mapper.readValue(jsonFile, new TypeReference<>() {});
		for (Map<String, Object> raw : reviews) {
			try {
				reviewService.saveReview(
						new Review(
								((Number) raw.get("ProductID")).longValue(),
								(String) raw.get("Username"),
								((Number) raw.get("Rating")).floatValue(),
								(String) raw.get("Content")
						)
				);
			} catch (IllegalArgumentException e) {
				System.out.println("Skipping duplicate review: " + raw.get("ProductID") + " (Username: " + raw.get("Username") + ")");
			} catch (Exception e) {
				System.out.println("Error inserting review: " + raw.get("Content"));
			}
		}
		System.out.println("Reviews seeded.");
	}

}
