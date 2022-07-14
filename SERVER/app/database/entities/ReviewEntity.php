<?php

class ReviewEntity {
    const TABLE_NAME = "reviews";
    private string $id;
    private string $uid;
    private string $seller_uid;
    private string $buyer_uid;
    private string $review;
    private float $rating;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $seller_uid, string $buyer_uid, string $review, float $rating,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->seller_uid = $seller_uid;
        $this->buyer_uid = $buyer_uid;
        $this->review = $review;
        $this->rating = $rating;
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

    public function getBuyerUid(): string {
        return $this->buyer_uid;
    }

    public function setBuyerUid(string $buyer_uid): void {
        $this->buyer_uid = $buyer_uid;
    }

    public function getReview(): string {
        return $this->review;
    }

    public function setReview(string $review): void {
        $this->review = $review;
    }

    public function getRating(): float {
        return $this->rating;
    }

    public function setRating(float $rating): void {
        $this->rating = $rating;
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
