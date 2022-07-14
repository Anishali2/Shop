<?php


class ProductFactory {
    /**
     * @param string[]|null|false $result
     * @return ProductEntity
     */
    public static function mapFromDatabaseResult($result): ProductEntity {
        $entity = new ProductEntity(
            $result[ProductTableSchema::UID],
            $result[ProductTableSchema::SELLER_UID],
            $result[ProductTableSchema::NUMBER],
            $result[ProductTableSchema::NAME],
            $result[ProductTableSchema::IMAGE],
            $result[ProductTableSchema::PRICE],
            $result[ProductTableSchema::SIZE],
            $result[ProductTableSchema::COLOR],
            $result[ProductTableSchema::QUANTITY],
            $result[ProductTableSchema::CREATED_AT],
            $result[ProductTableSchema::UPDATED_AT]
        );
        $entity->setId($result[ProductTableSchema::ID]);
        return $entity;
    }
}
