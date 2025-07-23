package com.tiago.marketplace;

import com.tiago.marketplace.model.Product;
import com.tiago.marketplace.model.Review;
import com.tiago.marketplace.model.Users;
import com.tiago.marketplace.repository.ProductRepository;
import com.tiago.marketplace.repository.ReviewRepository;
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
public class MarketplaceApplication implements CommandLineRunner {

	@Autowired
	private UsersService usersService;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ReviewRepository reviewRepository;


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
						"<h2>SonicAir H900 Wireless Bluetooth Headphones</h2>\n" +
								"\n" +
								"<p>Experience a new level of audio freedom with the <strong>SonicAir H900</strong> Wireless Bluetooth Headphones. Designed for comfort, power, and clarity, these over-ear headphones deliver immersive sound with deep bass and crisp highs — perfect for music, movies, and calls on the go.</p>\n" +
								"\n" +
								"<p>With advanced <strong>Active Noise Cancellation (ANC)</strong>, the H900 blocks out distractions, so you can stay focused whether you’re working, traveling, or relaxing. The ergonomic ear cushions and adjustable headband offer long-lasting comfort, even during extended listening sessions.</p>\n" +
								"\n" +
								"<p>Enjoy up to <strong>30 hours of wireless playback</strong> on a single charge. Need a quick boost? A 10-minute charge gives you up to 4 hours of use. The built-in microphone and intuitive on-ear controls make it easy to take calls and control your audio without reaching for your device.</p>\n" +
								"\n" +
								"<h3>Key Features</h3>\n" +
								"<ul>\n" +
								"  <li>Wireless Bluetooth 5.2 connectivity</li>\n" +
								"  <li>Advanced Active Noise Cancellation (ANC)</li>\n" +
								"  <li>30 hours battery life (playback time)</li>\n" +
								"  <li>10-minute quick charge for 4 hours of playback</li>\n" +
								"  <li>Soft over-ear memory foam cushions</li>\n" +
								"  <li>Built-in microphone for hands-free calling</li>\n" +
								"  <li>Foldable and portable design with travel case included</li>\n" +
								"</ul>\n" +
								"\n" +
								"<h3>Specifications</h3>\n" +
								"<ul>\n" +
								"  <li>Driver Size: 40mm dynamic drivers</li>\n" +
								"  <li>Frequency Response: 20 Hz – 20 kHz</li>\n" +
								"  <li>Bluetooth Version: 5.2</li>\n" +
								"  <li>Charging Port: USB-C</li>\n" +
								"  <li>Weight: 260 grams</li>\n" +
								"</ul>\n" +
								"\n" +
								"<h3>What’s in the Box</h3>\n" +
								"<ul>\n" +
								"  <li>SonicAir H900 Wireless Headphones</li>\n" +
								"  <li>USB-C Charging Cable</li>\n" +
								"  <li>3.5mm Audio Cable</li>\n" +
								"  <li>Hard-shell Travel Case</li>\n" +
								"  <li>User Manual</li>\n" +
								"</ul>\n" +
								"\n" +
								"<h3>Ideal For</h3>\n" +
								"<ul>\n" +
								"  <li>Music lovers and audiophiles</li>\n" +
								"  <li>Frequent travelers</li>\n" +
								"  <li>Remote work and study</li>\n" +
								"  <li>Gaming and multimedia use</li>\n" +
								"</ul>\n" +
								"\n" +
								"<p><strong>Break free from wires and distractions — the SonicAir H900 brings wireless freedom, stunning sound, and powerful noise cancellation wherever life takes you.</strong></p>",
						"SonicWave",

						"/uploads/images/product1.png"
				)
		);
		productRepository.save(
				new Product(
						"Smartphone 128GB",
						599.99,
						"\t5G-enabled smartphone with 128GB storage and AMOLED display.",
						"NovaTech",
						"/uploads/images/product2.png"
				)
		);
		productRepository.save(
				new Product(
						"\tPortable Bluetooth Speaker",
						79.99,
						"Waterproof speaker with 12 hours playtime and deep bass.",
						"EchoBeat",
						"/uploads/images/product3.png"
				)
		);
		productRepository.save(
				new Product(
						"4K Action Camera",
						79.99,
						"Ultra HD waterproof action camera with Wi-Fi and accessories.",
						"Adventura",
						"/uploads/images/product4.png"
				)
		);
		productRepository.save(
				new Product(
						"Smartwatch",
						79.99,
						"Fitness tracker smartwatch with heart rate monitor and GPS.",
						"FitPulse",
						"/uploads/images/product5.png"
				)
		);
		productRepository.save(
				new Product(
						"Laptop 15.6-inch",
						79.99,
						"Lightweight laptop with 8GB RAM and 512GB SSD.",
						"ZenithOne",
						"/uploads/images/product6.png"
				)
		);
		productRepository.save(
				new Product(
						"Wireless Mouse",
						79.99,
						"Ergonomic wireless mouse with adjustable DPI settings.",
						"GlideTech",
						"/uploads/images/product7.png"
				)
		);
		productRepository.save(
				new Product(
						"Mechanical Keyboard",
						79.99,
						"RGB backlit mechanical keyboard with blue switches.",
						"KeyForge",
						"/uploads/images/product8.png"
				)
		);
		productRepository.save(
				new Product(
						"External Hard Drive 1TB",
						79.99,
						"Portable 1TB external hard drive USB 3.0.",
						"DataCore",
						"/uploads/images/product9.png"
				)
		);
		productRepository.save(
				new Product(
						"1080p Webcam",
						79.99,
						"Full HD webcam with built-in microphone for video calls.",
						"ClearView",
						"/uploads/images/product10.png"
				)
		);
		reviewRepository.save(
				new Review(
						1L,
						"tiagooc10",
                        4.5F,
						"Excenlent Product")
		);
		reviewRepository.save(
				new Review(
						1L,
						"joao123",
						4.5F,
						"Excenlent Product")
		);
		reviewRepository.save(
				new Review(
						1L,
						"marcos456",
						4.5F,
						"Excenlent Product")
		);
	}

}
