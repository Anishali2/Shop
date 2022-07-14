<?php


class BuyerNotificationFactory {
    /**
     * @param string[]|null|false $result
     * @return BuyerNotificationEntity
     */
    public static function mapFromDatabaseResult($result): BuyerNotificationEntity {
        $entity = new BuyerNotificationEntity(
            $result[BuyerNotificationTableSchema::UID],
            $result[BuyerNotificationTableSchema::BUYER_UID],
            $result[BuyerNotificationTableSchema::NOTIFICATION],
            $result[BuyerNotificationTableSchema::CREATED_AT],
            $result[BuyerNotificationTableSchema::UPDATED_AT]
        );
        $entity->setId($result[BuyerNotificationTableSchema::ID]);
        $entity->setStatus((int) $result[BuyerNotificationTableSchema::STATUS]);
        return $entity;
    }
}
