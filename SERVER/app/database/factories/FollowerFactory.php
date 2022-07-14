<?php


class FollowerFactory {
    /**
     * @param string[]|null|false $result
     * @return FollowerEntity
     */
    public static function mapFromDatabaseResult($result): FollowerEntity {
        $entity = new FollowerEntity(
            $result[FollowerTableSchema::UID],
            $result[FollowerTableSchema::BUYER_UID],
            $result[FollowerTableSchema::SELLER_UID],
            $result[FollowerTableSchema::CREATED_AT],
            $result[FollowerTableSchema::UPDATED_AT]
        );
        $entity->setId($result[FollowerTableSchema::ID]);
        return $entity;
    }
}
