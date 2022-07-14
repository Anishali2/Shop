<?php

class GetTotalReviews extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {
        /** @var ReviewEntity[] $reviewEntities */
        $reviewEntities = $this->getAppDB()->getReviewDao()->getReviewWithSellerUid($_POST[self::SELLER_UID]);

        $count = 0;
        foreach ($reviewEntities as $reviewEntity) {
            $count = $count + 1;
        }
        $this->resSendOK([
            'total_reviews' => $count
        ]);
    }
}
