<?php


class SummaryFactory {
    /**
     * @param string[]|null|false $result
     * @return SummaryEntity
     */
    public static function mapFromDatabaseResult($result): SummaryEntity {
        $entity = new SummaryEntity(
            $result[SummaryTableSchema::UID],
            $result[SummaryTableSchema::BUYER_UID],
            $result[SummaryTableSchema::SELLER_UID],
            $result[SummaryTableSchema::PRODUCT_NAME],
            $result[SummaryTableSchema::PRODUCT_SIZE],
            $result[SummaryTableSchema::PRODUCT_COLOR],
            $result[SummaryTableSchema::PRODUCT_QUANTITY],
            $result[SummaryTableSchema::PRODUCT_PRICE],
            $result[SummaryTableSchema::CREATED_AT],
            $result[SummaryTableSchema::UPDATED_AT]
        );
        $entity->setId($result[SummaryTableSchema::ID]);
        return $entity;
    }
}
