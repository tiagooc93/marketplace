package com.tiago.marketplace;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.UsersRepository;
import com.tiago.marketplace.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
@EnableWebMvc
public class MarketplaceApplication implements CommandLineRunner {

	@Autowired
	private UsersService usersService;
	@Autowired
	private ProductRepository productRepository;


	public static void main(String[] args) {
		SpringApplication.run(MarketplaceApplication.class, args);
	}


	@Override
	public void run(String... args) throws Exception{
		usersService.addUser(new Users("tiago","tiagooc10"));

		productRepository.save(
				new Product(
						"Wireless Bluetooth Headphones",
						99.99,
						"Noise-cancelling over-ear headphones with 30 hours battery life.",
						"SonicWave",
						getClass().getResourceAsStream("/static/images/product1.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"Smartphone 128GB",
						599.99,
						"\t5G-enabled smartphone with 128GB storage and AMOLED display.",
						"NovaTech",
						getClass().getResourceAsStream("/static/images/product2.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"\tPortable Bluetooth Speaker",
						79.99,
						"Waterproof speaker with 12 hours playtime and deep bass.",
						"EchoBeat",
						getClass().getResourceAsStream("/static/images/product3.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"4K Action Camera",
						79.99,
						"Ultra HD waterproof action camera with Wi-Fi and accessories.",
						"Adventura",
						getClass().getResourceAsStream("/static/images/product4.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"Smartwatch",
						79.99,
						"Fitness tracker smartwatch with heart rate monitor and GPS.",
						"FitPulse",
						getClass().getResourceAsStream("/static/images/product5.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"Laptop 15.6-inch",
						79.99,
						"Lightweight laptop with 8GB RAM and 512GB SSD.",
						"ZenithOne",
						getClass().getResourceAsStream("/static/images/product6.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"Wireless Mouse",
						79.99,
						"Ergonomic wireless mouse with adjustable DPI settings.",
						"GlideTech",
						getClass().getResourceAsStream("/static/images/product7.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"Mechanical Keyboard",
						79.99,
						"RGB backlit mechanical keyboard with blue switches.",
						"KeyForge",
						getClass().getResourceAsStream("/static/images/product8.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"External Hard Drive 1TB",
						79.99,
						"Portable 1TB external hard drive USB 3.0.",
						"DataCore",
						getClass().getResourceAsStream("/static/images/product9.png").readAllBytes()
				)
		);
		productRepository.save(
				new Product(
						"1080p Webcam",
						79.99,
						"Full HD webcam with built-in microphone for video calls.",
						"ClearView",
						getClass().getResourceAsStream("/static/images/product10.png").readAllBytes()
				)
		);
	}

}
