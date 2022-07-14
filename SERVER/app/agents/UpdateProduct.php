<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class UpdateProduct extends ElectroApi {

    const PRODUCT_UID = "product_uid";
    const NUMBER = "number";
    const PRICE = "price";
    const SIZE = "size";
    const COLOR = "color";
    const QUANTITY = "quantity";
    const IMAGE = "image";

    protected function onAssemble() {
        foreach ([self::PRODUCT_UID,self::NUMBER,self::PRICE,self::SIZE,self::COLOR,self::QUANTITY] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
        $this->killWithBadRequestExceptionIfMultipartParamIsMissing(self::IMAGE);
    }

    protected function onDevise() {
        $current_time = Carbon::now();
        $productEntity = null;

        $productEntity = $this->killFailureIfNullElseGetProductEntity(
            $this->getAppDB()->getProductDao()->getProductWithUid($_POST[self::PRODUCT_UID]),
            null,
            'No product found with this uid'
        );

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

        $productEntity->setImage($imageName);

        $productEntity->setNumber($_POST[self::NUMBER]);
        $productEntity->setPrice($_POST[self::PRICE]);
        $productEntity->setSize($_POST[self::SIZE]);
        $productEntity->setColor($_POST[self::COLOR]);
        $productEntity->setQuantity($_POST[self::QUANTITY]);
        $productEntity->setUpdatedAt($current_time);

        $productEntity = $this->killFailureIfNullElseGetProductEntity(
            $this->getAppDB()->getProductDao()->updateProduct($productEntity)
            , null
            , 'Failed to update product entity'
        );

        $this->resSendOK([
            'product_updated' => true
        ]);
    }
}
