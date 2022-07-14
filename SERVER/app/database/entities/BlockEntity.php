<?php

class BlockEntity {
    const TABLE_NAME = "blocks";
    private string $id;
    private string $uid;
    private string $blocker;
    private string $blocked;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $blocker, string $blocked,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->blocker = $blocker;
        $this->blocked = $blocked;
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

    public function getBlocker(): string {
        return $this->blocker;
    }

    public function setBlocker(string $blocker): void {
        $this->blocker = $blocker;
    }

    public function getBlocked(): string {
        return $this->blocked;
    }

    public function setBlocked(string $blocked): void {
        $this->blocked = $blocked;
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
