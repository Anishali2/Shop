<?php

class GetSellerProducts extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'no product for this seller found'
        );
        $products = [];
        /** @var ProductEntity[] $productEntities */
        $productEntities = $this->getAppDB()->getProductDao()->getAllProductWithSellerUid($_POST[self::SELLER_UID]);

        foreach ($productEntities as $productEntity) {
            array_push($products , /** @_ */[
                'uid' => $productEntity->getUid(),
                'seller_uid' => $productEntity->getSellerUid(),
                'number' => $productEntity->getNumber(),
                'name' => $productEntity->getName(),
                'image' => $productEntity->getImage() === null ? null : $this->createLinkForProductImage($productEntity->getImage()),
                'price' => $productEntity->getPrice(),
                'size' => $productEntity->getSize(),
                'color' => $productEntity->getColor(),
                'quantity' => $productEntity->getQuantity(),
                'created_at' => $productEntity->getCreatedAt()
            ]);
        }

        $this->resSendOK([
            'seller_products' => $products
        ]);


    }
}
