<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class FollowSeller extends ElectroApi {

    const BUYER_UID = "buyer_uid";
    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        foreach ([self::BUYER_UID,self::SELLER_UID] as $item) {
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

        $followCheck = $this->getAppDB()->getFollowerDao()->getFollowerWithBuyerAndSellerUid($_POST[self::BUYER_UID],$_POST[self::SELLER_UID]);
        if($followCheck !== null){
            $this->killFailureWithMsg("Already_followed");
        }

        $followEntity = $this->killFailureIfNullElseGetFollowerEntity(
            $this->getAppDB()->getFollowerDao()->insertFollower(new FollowerEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::BUYER_UID],
                $_POST[self::SELLER_UID],
                $current_time,
                $current_time
            )),
            null,
            "Failed to Follow Seller"
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
            'Followed_Seller_Successfully' => true
        ]);
    }
}
