<?php


class SellerNotificationFactory {
    /**
     * @param string[]|null|false $result
     * @return SellerNotificationEntity
     */
    public static function mapFromDatabaseResult($result): SellerNotificationEntity {
        $entity = new SellerNotificationEntity(
            $result[SellerNotificationTableSchema::UID],
            $result[SellerNotificationTableSchema::SELLER_UID],
            $result[SellerNotificationTableSchema::NOTIFICATION],
            $result[SellerNotificationTableSchema::CREATED_AT],
            $result[SellerNotificationTableSchema::UPDATED_AT]
        );
        $entity->setId($result[SellerNotificationTableSchema::ID]);
        $entity->setStatus((int) $result[SellerNotificationTableSchema::STATUS]);
        return $entity;
    }
}
