<?php

class DeleteProduct extends ElectroApi {

    const PRODUCT_UID = "product_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::PRODUCT_UID);
    }

    protected function onDevise() {

        $productEntity = $this->getAppDB()->getProductDao()->getProductWithUid($_POST[self::PRODUCT_UID]);

        $this->getAppDB()->getProductDao()->deleteProduct($productEntity);

        $this->resSendOK([
            'product_deleted_successfully' => true
        ]);
    }
}
