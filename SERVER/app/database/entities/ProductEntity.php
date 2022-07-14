<?php

class ProductEntity {
    const TABLE_NAME = "products";
    private string $id;
    private string $uid;
    private string $seller_uid;
    private string $number;
    private string $name;
    private string $image;
    private string $price;
    private string $size;
    private string $color;
    private string $quantity;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $seller_uid, string $number, string $name, string $image, string $price, string $size, string $color, string $quantity,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->seller_uid = $seller_uid;
        $this->number = $number;
        $this->name = $name;
        $this->image = $image;
        $this->price = $price;
        $this->size = $size;
        $this->color = $color;
        $this->quantity = $quantity;
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

    public function getSellerUid(): string {
        return $this->seller_uid;
    }

    public function setSellerUid(string $seller_uid): void {
        $this->seller_uid = $seller_uid;
    }

    public function getNumber(): string {
        return $this->number;
    }

    public function setNumber(string $number): void {
        $this->number = $number;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getImage(): string {
        return $this->image;
    }

    public function setImage(string $image): void {
        $this->image = $image;
    }

    public function getPrice(): string {
        return $this->price;
    }

    public function setPrice(string $price): void {
        $this->price = $price;
    }

    public function getSize(): string {
        return $this->size;
    }

    public function setSize(string $size): void {
        $this->size = $size;
    }

    public function getColor(): string {
        return $this->color;
    }

    public function setColor(string $color): void {
        $this->color = $color;
    }

    public function getQuantity(): string {
        return $this->quantity;
    }

    public function setQuantity(string $quantity): void {
        $this->quantity = $quantity;
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
