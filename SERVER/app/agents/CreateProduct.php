<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class CreateProduct extends ElectroApi {

    const SELLER_UID = "seller_uid";
    const NUMBER = "number";
    const NAME = "name";
    const IMAGE = "image";
    const PRICE = "price";
    const SIZE = "size";
    const COLOR = "color";
    const QUANTITY = "quantity";

    protected function onAssemble() {
        foreach ([self::SELLER_UID,self::NUMBER,self::NAME,self::PRICE,self::SIZE,self::COLOR,self::QUANTITY] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
        if (!isset($_FILES[self::IMAGE])) {
            $this->killAsBadRequestWithMissingParamException(self::IMAGE);
        }
    }

    protected function onDevise() {

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'no seller found'
        );

        $productEntity = $this->getAppDB()->getProductDao()->getProductWithSellerUidAndProductNumber($_POST[self::SELLER_UID],$_POST[self::NUMBER]);

        if($productEntity !== null){
            $this->killFailureWithMsg(
                "product_with_same_number_already_exists"
            );
        }

        $imageName = '';

        $this->killFailureIfImageNotSaved(
            self::IMAGE,
            ImageUploader::withSrc($_FILES[self::IMAGE]['tmp_name'])
                ->destinationDir($this->getProductImageDirPath())
                ->generateUniqueName($_FILES[self::IMAGE]['name'])
                ->mapGeneratedName($imageName)
                ->compressQuality(75)
                ->save()
        );

        $current_time = Carbon::now();

        $productEntity = $this->killFailureIfNullElseGetProductEntity(
            $this->getAppDB()->getProductDao()->insertProduct(new ProductEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::SELLER_UID],
                $_POST[self::NUMBER],
                $_POST[self::NAME],
                $imageName,
                $_POST[self::PRICE],
                $_POST[self::SIZE],
                $_POST[self::COLOR],
                $_POST[self::QUANTITY],
                $current_time,
                $current_time
            )),
            null,
            "Failed to Add Product"
        );
        $this->resSendOK([
            'buyer' => [
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
            ]
        ]);
    }
}
