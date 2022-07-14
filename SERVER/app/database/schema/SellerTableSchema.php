<?php

class SellerTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const FIRST_NAME = "first_name";
    const LAST_NAME = "last_name";
    const EMAIL = "email";
    const COUNTRY = "country";
    const ADDRESS = "address";
    const PHONE = "phone";
    const PROFILE_PICTURE = "profile_picture";
    const PASSWORD = "password";
    const BIO = "bio";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(SellerEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::FIRST_NAME . " VARCHAR(50) NOT NULL,
            " . self::LAST_NAME . " VARCHAR(50) NOT NULL,
            " . self::EMAIL . " VARCHAR(50) NOT NULL,
            " . self::COUNTRY . " VARCHAR(100) NOT NULL,
            " . self::ADDRESS . " VARCHAR(500) NOT NULL,
            " . self::PHONE . " VARCHAR(250) NOT NULL,
            " . self::PROFILE_PICTURE . " VARCHAR(250) NOT NULL,
            " . self::PASSWORD . " VARCHAR(250) NOT NULL,
            " . self::BIO . " VARCHAR(500) NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}
