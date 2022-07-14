<?php

class ProductTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const SELLER_UID = "seller_uid";
    const NUMBER = "number";
    const NAME = "name";
    const IMAGE = "image";
    const PRICE = "price";
    const SIZE = "size";
    const COLOR = "color";
    const QUANTITY = "quantity";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(ProductEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::SELLER_UID . " VARCHAR(50) NOT NULL,
            " . self::NUMBER . " VARCHAR(50) NOT NULL,
            " . self::NAME . " VARCHAR(500) NOT NULL,
            " . self::IMAGE . " VARCHAR(500) NOT NULL,
            " . self::PRICE . " VARCHAR(170) NOT NULL,
            " . self::SIZE . " VARCHAR(500) NOT NULL,
            " . self::COLOR . " VARCHAR(500) NOT NULL,
            " . self::QUANTITY . " VARCHAR(500) NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}
