<?php

class BuyerNotificationEntity {
    const TABLE_NAME = "buyernotifications";
    private string $id;
    private string $uid;
    private string $buyer_uid;
    private string $notification;
    private int $status;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $buyer_uid, string $notification,  string $created_at, string $updated_at, int $status = 0) {
        $this->uid = $uid;
        $this->buyer_uid = $buyer_uid;
        $this->notification = $notification;
        $this->status = $status;
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

    public function getNotification(): string {
        return $this->notification;
    }

    public function setNotification(string $notification): void {
        $this->notification = $notification;
    }

    public function getStatus(): int {
        return $this->status;
    }

    public function setStatus(int $status = 0): void {
        $this->status = $status;
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
