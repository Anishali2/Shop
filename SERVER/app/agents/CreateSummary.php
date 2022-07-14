<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class CreateSummary extends ElectroApi {

    const BUYER_UID = 'buyer_uid';
    const SELLER_UID = 'seller_uid';
    const PRODUCT_NAME = 'product_name';
    const PRODUCT_SIZE = 'product_size';
    const PRODUCT_COLOR = 'product_color';
    const PRODUCT_QUANTITY = 'product_quantity';
    const PRODUCT_PRICE = 'product_price';

    protected function onAssemble() {
        foreach ([self::SELLER_UID,self::BUYER_UID,self::PRODUCT_NAME,self::PRODUCT_SIZE,self::PRODUCT_COLOR,self::PRODUCT_QUANTITY,self::PRODUCT_PRICE] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $current_time = Carbon::now();

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No seller found with this uid'
        );

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::BUYER_UID]),
            null,
            'No buyer found with this uid'
        );

        $summaryEntity = $this->killFailureIfNullElseGetSummaryEntity(
            $this->getAppDB()->getSummaryDao()->insertSummary(new SummaryEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::BUYER_UID],
                $_POST[self::SELLER_UID],
                $_POST[self::PRODUCT_NAME],
                $_POST[self::PRODUCT_SIZE],
                $_POST[self::PRODUCT_COLOR],
                $_POST[self::PRODUCT_QUANTITY],
                $_POST[self::PRODUCT_PRICE],
                $current_time,
                $current_time,
            )), null ,
            "failed_to_create_summery"
        );

        $this->resSendOK([
            'summary' => [
                'uid' => $summaryEntity->getUid(),
                'buyer_uid' => $summaryEntity->getBuyerUid(),
                'seller_uid' => $summaryEntity->getSellerUid(),
                'product_name' => $summaryEntity->getProductName(),
                'product_size' => $summaryEntity->getProductSize(),
                'product_color' => $summaryEntity->getProductColor(),
                'product_quantity' => $summaryEntity->getProductQuantity(),
                'product_price' => $summaryEntity->getProductPrice(),
                'created_at' => $summaryEntity->getCreatedAt()
            ]
        ]);
    }
}
