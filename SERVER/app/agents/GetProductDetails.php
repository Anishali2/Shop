<?php

class GetProductDetails extends ElectroApi {

    const PRODUCT_UID = "product_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::PRODUCT_UID);
    }

    protected function onDevise() {
        $productEntity = null;

        $productEntity = $this->killFailureIfNullElseGetProductEntity(
            $this->getAppDB()->getProductDao()->getProductWithUid($_POST[self::PRODUCT_UID]),
            null,
            'No product found with this Uid'
        );

        $this->resSendOK([
            'product_details' => [
                'uid' => $productEntity->getUid(),
                'seller_uid' => $productEntity->getSellerUid(),
                'number' => $productEntity->getNumber(),
                'name' => $productEntity->getName(),
                'price' => $productEntity->getPrice(),
                'size' => $productEntity->getSize(),
                'color' => $productEntity->getColor(),
                'quantity' => $productEntity->getQuantity(),
                'image' => $productEntity->getImage() === null ? null : $this->createLinkForProductImage($productEntity->getImage()),
                'created_at' => $productEntity->getCreatedAt()
            ]
        ]);
    }
}
