<?php

class GetSalesSummary extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {
        /** @var SummaryEntity[] $summaryEntities */
        $summaryEntities = $this->getAppDB()->getSummaryDao()->getSummaryWithSellerUid($_POST[self::SELLER_UID]);
        if($summaryEntities === null){
            $this->killFailureWithMsg("No Data Found");
        }

        $summaryMeta = [];
        foreach ($summaryEntities as $summaryEntity) {
            $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($summaryEntity->getBuyerUid());

            array_push($summaryMeta , /** @_ */[
                'uid' => $summaryEntity->getUid(),
                'seller_uid' => $buyerEntity === null ? null : $buyerEntity->getUid(),
                'seller_name' => $buyerEntity->getFirstName() . ' ' . $buyerEntity->getLastName(),
                'product_name' => $summaryEntity->getProductName(),
                'product_size' => $summaryEntity->getProductSize(),
                'product_color' => $summaryEntity->getProductColor(),
                'product_quantity' => $summaryEntity->getProductQuantity(),
                'product_price' => $summaryEntity->getProductPrice(),
                'created_at' => $summaryEntity->getCreatedAt()
            ]);
        }
        $this->resSendOK([
            'sale_summary' => $summaryMeta
        ]);
    }
}
