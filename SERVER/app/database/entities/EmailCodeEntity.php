<?php

class EmailCodeEntity {
    const TABLE_NAME = "emailcodes";
    private string $id;
    private string $uid;
    private string $otp;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $otp,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->otp = $otp;
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

    public function getOtp(): string {
        return $this->otp;
    }

    public function setOtp(string $otp): void {
        $this->otp = $otp;
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
