<?php

class LiveStreamTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const SELLER_UID = "seller_uid";
    const CHANNEL_NAME = "channel_name";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(LiveStreamEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::SELLER_UID . " VARCHAR(50) NOT NULL,
            " . self::CHANNEL_NAME . " VARCHAR(500) NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}