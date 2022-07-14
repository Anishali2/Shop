<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class CreateReview extends ElectroApi {

    const SELLER_UID = "seller_uid";
    const BUYER_UID = "buyer_uid";
    const REVIEW = "review";
    const RATING = "rating";

    protected function onAssemble() {
        foreach ([self::SELLER_UID,self::BUYER_UID,self::REVIEW,self::RATING] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $current_time = Carbon::now();

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'no seller found'
        );

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::BUYER_UID]),
            null,
            'no buyer found'
        );

        $reviewEntity = $this->killFailureIfNullElseGetReviewEntity(
            $this->getAppDB()->getReviewDao()->insertReview(new ReviewEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::SELLER_UID],
                $_POST[self::BUYER_UID],
                $_POST[self::REVIEW],
                $_POST[self::RATING],
                $current_time,
                $current_time
            )),
            null,
            "Failed to add Review"
        );

        $sellerNotificationEntity = $this->killFailureIfNullElseGetSellerNotificationEntity(
            $this->getAppDB()->getSellerNotificationDao()->insertSellerNotification(new SellerNotificationEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::SELLER_UID],
                $sellerEntity->getFirstName() . ' ' . $sellerEntity->getLastName() . ' started following you.',
                $current_time,
                $current_time,
                false
            )),
            null,
            "Failed to send notification"
        );

        $this->resSendOK([
            'Review_added_successfully' => true
        ]);
    }
}
