<?php

class FollowerEntity {
    const TABLE_NAME = "followers";
    private string $id;
    private string $uid;
    private string $buyer_uid;
    private string $seller_uid;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $buyer_uid, string $seller_uid,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->buyer_uid = $buyer_uid;
        $this->seller_uid = $seller_uid;
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
