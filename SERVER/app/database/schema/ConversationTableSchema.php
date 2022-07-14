<?php

class ConversationTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const SENDER_UID = "sender_uid";
    const RECEIVER_UID = "receiver_uid";
    const MESSAGE = "message";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(ConversationEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::SENDER_UID . " VARCHAR(50) NOT NULL,
            " . self::RECEIVER_UID . " VARCHAR(50) NOT NULL,
            " . self::MESSAGE . " VARCHAR(1000) NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}
