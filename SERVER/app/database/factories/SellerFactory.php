<?php


class SellerFactory {
    /**
     * @param string[]|null|false $result
     * @return SellerEntity
     */
    public static function mapFromDatabaseResult($result): SellerEntity {
        $entity = new SellerEntity(
            $result[SellerTableSchema::UID],
            $result[SellerTableSchema::FIRST_NAME],
            $result[SellerTableSchema::LAST_NAME],
            $result[SellerTableSchema::EMAIL],
            $result[SellerTableSchema::COUNTRY],
            $result[SellerTableSchema::ADDRESS],
            $result[SellerTableSchema::PHONE],
            $result[SellerTableSchema::PROFILE_PICTURE],
            $result[SellerTableSchema::PASSWORD],
            $result[SellerTableSchema::BIO],
            $result[SellerTableSchema::CREATED_AT],
            $result[SellerTableSchema::UPDATED_AT]
        );
        $entity->setId($result[SellerTableSchema::ID]);
        return $entity;
    }
}
