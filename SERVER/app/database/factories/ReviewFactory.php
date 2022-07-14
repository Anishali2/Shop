<?php


class ReviewFactory {
    /**
     * @param string[]|null|false $result
     * @return ReviewEntity
     */
    public static function mapFromDatabaseResult($result): ReviewEntity {
        $entity = new ReviewEntity(
            $result[ReviewTableSchema::UID],
            $result[ReviewTableSchema::SELLER_UID],
            $result[ReviewTableSchema::BUYER_UID],
            $result[ReviewTableSchema::REVIEW],
            (float) $result[ReviewTableSchema::RATING],
            $result[ReviewTableSchema::CREATED_AT],
            $result[ReviewTableSchema::UPDATED_AT]
        );
        $entity->setId($result[ReviewTableSchema::ID]);
        return $entity;
    }
}
