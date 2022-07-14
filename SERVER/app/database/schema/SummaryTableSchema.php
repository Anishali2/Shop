<?php

class SummaryTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const BUYER_UID = "buyer_uid";
    const SELLER_UID = "seller_uid";
    const PRODUCT_NAME = "product_name";
    const PRODUCT_SIZE = "product_size";
    const PRODUCT_COLOR = "product_color";
    const PRODUCT_QUANTITY = "product_quantity";
    const PRODUCT_PRICE = "product_price";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(SummaryEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::BUYER_UID . " VARCHAR(50) NOT NULL,
            " . self::SELLER_UID . " VARCHAR(50) NOT NULL,
            " . self::PRODUCT_NAME . " VARCHAR(500) NOT NULL,
            " . self::PRODUCT_SIZE . " VARCHAR(500) NOT NULL,
            " . self::PRODUCT_COLOR . " VARCHAR(500) NOT NULL,
            " . self::PRODUCT_QUANTITY . " VARCHAR(500) NOT NULL,
            " . self::PRODUCT_PRICE . " VARCHAR(500) NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}
