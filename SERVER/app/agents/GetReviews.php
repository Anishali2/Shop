<?php

class GetReviews extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No Seller found'
        );

        /** @var ReviewEntity[] $reviewEntities */
        $reviewEntities = $this->getAppDB()->getReviewDao()->getReviewWithSellerUid($_POST[self::SELLER_UID]);

        $reviewMeta = [];
        foreach ($reviewEntities as $reviewEntity) {
            array_push($reviewMeta , /** @_ */[
                'uid' => $reviewEntity->getUid(),
                'seller_uid' => $reviewEntity->getSellerUid(),
                'buyer_uid' => $reviewEntity->getBuyerUid(),
                'review' => $reviewEntity->getReview(),
                'rating' => $reviewEntity->getRating(),
                'created_at' => $reviewEntity->getCreatedAt()
            ]);
        }

        $this->resSendOK([
            'reviews' => $reviewMeta
        ]);
    }
}
