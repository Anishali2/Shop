<?php

class GetPurchaseSummary extends ElectroApi {

    const BUYER_UID = "buyer_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::BUYER_UID);
    }

    protected function onDevise() {
        /** @var SummaryEntity[] $summaryEntities */
        $summaryEntities = $this->getAppDB()->getSummaryDao()->getSummaryWithBuyerUid($_POST[self::BUYER_UID]);
        if($summaryEntities === null){
            $this->killFailureWithMsg("No Data Found");
        }

        $summaryMeta = [];
        foreach ($summaryEntities as $summaryEntity) {
            $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($summaryEntity->getSellerUid());

            array_push($summaryMeta , /** @_ */[
                'uid' => $summaryEntity->getUid(),
                'seller_uid' => $sellerEntity === null ? null : $sellerEntity->getUid(),
                'seller_name' => $sellerEntity->getFirstName() . ' ' . $sellerEntity->getLastName(),
                'product_name' => $summaryEntity->getProductName(),
                'product_size' => $summaryEntity->getProductSize(),
                'product_color' => $summaryEntity->getProductColor(),
                'product_quantity' => $summaryEntity->getProductQuantity(),
                'product_price' => $summaryEntity->getProductPrice(),
                'created_at' => $summaryEntity->getCreatedAt()
            ]);
        }
        $this->resSendOK([
            'purchase_summary' => $summaryMeta
        ]);
    }
}
