<?php


class BuyerFactory {
    /**
     * @param string[]|null|false $result
     * @return BuyerEntity
     */
    public static function mapFromDatabaseResult($result): BuyerEntity {
        $entity = new BuyerEntity(
            $result[BuyerTableSchema::UID],
            $result[BuyerTableSchema::FIRST_NAME],
            $result[BuyerTableSchema::LAST_NAME],
            $result[BuyerTableSchema::EMAIL],
            $result[BuyerTableSchema::COUNTRY],
            $result[BuyerTableSchema::ADDRESS],
            $result[BuyerTableSchema::PHONE],
            $result[BuyerTableSchema::PROFILE_PICTURE],
            $result[BuyerTableSchema::PASSWORD],
            $result[BuyerTableSchema::CREATED_AT],
            $result[BuyerTableSchema::UPDATED_AT]
        );
        $entity->setId($result[BuyerTableSchema::ID]);
        $entity->setIsSeller(((int) $result[BuyerTableSchema::IS_SELLER]) === 1);
        return $entity;
    }
}
