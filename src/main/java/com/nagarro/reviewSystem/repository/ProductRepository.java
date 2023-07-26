package com.nagarro.reviewSystem.repository;

import com.nagarro.reviewSystem.model.ProductInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductInfo, Long> {

    public List<ProductInfo> findById(long productId);

}
