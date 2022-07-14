<?php

class BlockTableSchema extends TableSchema {

    const ID = "id";
    const UID = "uid";
    const BLOCKER = "blocker";
    const BLOCKED = "blocked";
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public function __construct() { parent::__construct(BlockEntity::TABLE_NAME); }

    public function getBlueprint(): string {
        return "CREATE TABLE IF NOT EXISTS " . $this->getTableName() . "(
            " . self::ID . " INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            " . self::UID . " VARCHAR(50) NOT NULL,
            " . self::BLOCKER . " VARCHAR(50) NOT NULL,
            " . self::BLOCKED . " VARCHAR(50) NOT NULL,
            " . self::CREATED_AT . " VARCHAR(100) NOT NULL,
            " . self::UPDATED_AT . " VARCHAR(100) NOT NULL
        )";
    }
}
