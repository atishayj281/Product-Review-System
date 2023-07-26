package com.nagarro.reviewSystem.services;

import com.nagarro.reviewSystem.model.Message;
import com.nagarro.reviewSystem.model.Product;

import java.util.List;

public interface ProductService {

    public List<Product> getProducts();

    public Product getProductById(long productId);

    public List<Product> getFilteredProduct(String name, String brand, String code);

    public Message addProduct(Product product);

    public long totalProducts();

}
