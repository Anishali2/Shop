<?php

class SummaryEntity {
    const TABLE_NAME = "summarys";
    private string $id;
    private string $uid;
    private string $buyer_uid;
    private string $seller_uid;
    private string $product_name;
    private string $product_size;
    private string $product_color;
    private string $product_quantity;
    private string $product_price;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $buyer_uid, string $seller_uid, string $product_name, string $product_size, string $product_color, string $product_quantity, string $product_price,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->buyer_uid = $buyer_uid;
        $this->seller_uid = $seller_uid;
        $this->product_name = $product_name;
        $this->product_size = $product_size;
        $this->product_color = $product_color;
        $this->product_quantity = $product_quantity;
        $this->product_price = $product_price;
        $this->created_at = $created_at;
        $this->updated_at = $updated_at;
    }

    public function getId(): ?string {
        return $this->id;
    }

    public function setId(string $id): void {
        $this->id = $id;
    }

    public function getUid(): string {
        return $this->uid;
    }

    public function setUid(string $uid): void {
        $this->uid = $uid;
    }

    public function getBuyerUid(): string {
        return $this->buyer_uid;
    }

    public function setBuyerUid(string $buyer_uid): void {
        $this->buyer_uid = $buyer_uid;
    }

    public function getSellerUid(): string {
        return $this->seller_uid;
    }

    public function setSellerUid(string $seller_uid): void {
        $this->seller_uid = $seller_uid;
    }

    public function getProductName(): string {
        return $this->product_name;
    }

    public function setProductName(string $product_name): void {
        $this->product_name = $product_name;
    }

    public function getProductSize(): string {
        return $this->product_size;
    }

    public function setProductSize(string $product_size): void {
        $this->product_size = $product_size;
    }

    public function getProductColor(): string {
        return $this->product_color;
    }

    public function setProductColor(string $product_color): void {
        $this->product_color = $product_color;
    }

    public function getProductQuantity(): string {
        return $this->product_quantity;
    }

    public function setProductQuantity(string $product_quantity): void {
        $this->product_quantity = $product_quantity;
    }

    public function getProductPrice(): string {
        return $this->product_price;
    }

    public function setProductPrice(string $product_price): void {
        $this->product_price = $product_price;
    }

    public function getCreatedAt(): string {
        return $this->created_at;
    }

    public function setCreatedAt(string $created_at): void {
        $this->created_at = $created_at;
    }

    public function getUpdatedAt(): string {
        return $this->updated_at;
    }

    public function setUpdatedAt(string $updated_at): void {
        $this->updated_at = $updated_at;
    }

}
