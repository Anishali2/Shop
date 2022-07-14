<?php

class ConversationEntity {
    const TABLE_NAME = "conversations";
    private string $id;
    private string $uid;
    private string $sender_uid;
    private string $receiver_uid;
    private string $message;
    private string $created_at;
    private string $updated_at;

    public function __construct(string $uid, string $sender_uid, string $receiver_uid, string $message,  string $created_at, string $updated_at) {
        $this->uid = $uid;
        $this->sender_uid = $sender_uid;
        $this->receiver_uid = $receiver_uid;
        $this->message = $message;
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

    public function getSenderUid(): string {
        return $this->sender_uid;
    }

    public function setSenderUid(string $sender_uid): void {
        $this->sender_uid = $sender_uid;
    }

    public function getReceiverUid(): string {
        return $this->receiver_uid;
    }

    public function setReceiverUid(string $receiver_uid): void {
        $this->receiver_uid = $receiver_uid;
    }

    public function getMessage(): string {
        return $this->message;
    }

    public function setMessage(string $message): void {
        $this->message = $message;
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
