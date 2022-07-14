<?php

class BuyerNotificationTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const BUYER_UID = "buyer_uid";
    const NOTIFICATION = "notification";
    const STATUS = "status";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(BuyerNotificationEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::BUYER_UID . " VARCHAR(50) NOT NULL,
            " . self::NOTIFICATION . " VARCHAR(1000) NOT NULL,
            " . self::STATUS . " INT NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}
