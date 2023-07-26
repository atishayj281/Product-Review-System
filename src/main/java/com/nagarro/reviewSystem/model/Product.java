package com.nagarro.reviewSystem.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private ProductInfo productInfo;
    private List<Image> images;

    @Override
    public String toString() {
        return "Product{" +
                "productInfo=" + productInfo +
                ", images=" + images +
                '}';
    }
}
