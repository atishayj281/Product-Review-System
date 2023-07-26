package com.nagarro.reviewSystem.services;

import com.nagarro.reviewSystem.CONSTANTS;
import com.nagarro.reviewSystem.model.Image;
import com.nagarro.reviewSystem.model.Message;
import com.nagarro.reviewSystem.model.Product;
import com.nagarro.reviewSystem.model.ProductInfo;
import com.nagarro.reviewSystem.repository.ImageRepository;
import com.nagarro.reviewSystem.repository.ProductRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ImageRepository imageRepository;
    @Autowired
    private CONSTANTS constants;


    @Override
    public List<Product> getProducts() {

        List<Product> result = new ArrayList<>();
        List<ProductInfo> products = productRepository.findAll();
        products.forEach(product -> {
            List<Image> images = imageRepository.findByProductId(product.getId());
            result.add(new Product(product, images));
        });

        return result;
    }

    @Override
    public Product getProductById(long productId) {
        Product result = new Product();
        ProductInfo info = productRepository.findById(productId).get(0);
        result.setProductInfo(info);
        List<Image> images = imageRepository.findByProductId(info.getId());
        result.setImages(images);
        return result;
    }

    @Override
    public List<Product> getFilteredProduct(String name, String brand, String code) {
        System.out.println(name + brand + code);
        List<Product> result = new ArrayList<>();
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<ProductInfo> criteriaQuery = criteriaBuilder.createQuery(ProductInfo.class);
        Root<ProductInfo> product = criteriaQuery.from(ProductInfo.class);
        List<Predicate> predicates = new ArrayList<>();
        if(!name.isBlank()) {
            predicates.add(criteriaBuilder.equal(product.get("name"), name));
        }
        if(!brand.isBlank()) {
            predicates.add(criteriaBuilder.equal(product.get("brand"), brand));
        }
        if(!code.isBlank()) {
            predicates.add(criteriaBuilder.equal(product.get("code"), code));
        }
        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        List<ProductInfo> products = entityManager.createQuery(criteriaQuery).getResultList();
        products.forEach(response -> {
            List<Image> images = imageRepository.findByProductId(response.getId());
            result.add(new Product(response, images));
        });
        System.out.println(result);

        return result;
    }

    @Override
    public Message addProduct(Product product) {
        ProductInfo productInfo = productRepository.save(product.getProductInfo());
        product.getImages().forEach(image -> {
            image.setProductId(productInfo.getId());
            imageRepository.save(image);
        });
        return new Message("Product Added Successfully", constants.SUCCESS);
    }

    @Override
    public long totalProducts() {
        return productRepository.count();
    }
}
