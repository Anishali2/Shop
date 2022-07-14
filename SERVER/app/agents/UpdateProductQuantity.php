<?php

use Carbon\Carbon;

class UpdateProductQuantity extends ElectroApi {

    const PRODUCT_UID = "product_uid";
    const COLOR = "color";
    const QUANTITY = "quantity";

    protected function onAssemble() {
        foreach ([self::PRODUCT_UID,self::COLOR,self::QUANTITY] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $current_time = Carbon::now();
        $productEntity = null;

        $productEntity = $this->killFailureIfNullElseGetProductEntity(
            $this->getAppDB()->getProductDao()->getProductWithUid($_POST[self::PRODUCT_UID]),
            null,
            'No product found with this uid'
        );

        $productEntity->setColor($_POST[self::COLOR]);
        $productEntity->setQuantity($_POST[self::QUANTITY]);
        $productEntity->setUpdatedAt($current_time);

        $productEntity = $this->killFailureIfNullElseGetProductEntity(
            $this->getAppDB()->getProductDao()->updateProduct($productEntity)
            , null
            , 'Failed to update product entity'
        );

        $this->resSendOK([
            'product_quantity_updated' => true
        ]);
    }
}
