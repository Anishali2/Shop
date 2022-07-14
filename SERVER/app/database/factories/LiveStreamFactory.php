<?php


class LiveStreamFactory {
    /**
     * @param string[]|null|false $result
     * @return LiveStreamEntity
     */
    public static function mapFromDatabaseResult($result): LiveStreamEntity {
        $entity = new LiveStreamEntity(
            $result[LiveStreamTableSchema::UID],
            $result[LiveStreamTableSchema::SELLER_UID],
            $result[LiveStreamTableSchema::CHANNEL_NAME],
            $result[LiveStreamTableSchema::CREATED_AT],
            $result[LiveStreamTableSchema::UPDATED_AT]
        );
        $entity->setId($result[LiveStreamTableSchema::ID]);
        return $entity;
    }
}
