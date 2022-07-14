<?php

class PostEntity {
    const TABLE_NAME = "posts";
    private string $id;
    private string $uid;
    private string $seller_uid;
    private string $description;
    private string $picture;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $seller_uid, string $description, string $picture,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->seller_uid = $seller_uid;
        $this->description = $description;
        $this->picture = $picture;
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

    public function getDescription(): string {
        return $this->description;
    }

    public function setDescription(string $description): void {
        $this->description = $description;
    }

    public function getPicture(): string {
        return $this->picture;
    }

    public function setPicture(string $picture): void {
        $this->picture = $picture;
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
