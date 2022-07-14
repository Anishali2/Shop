<?php

class GetSellerNotifications extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No seller found'
        );

        /** @var SellerNotificationEntity[] $sellerNotificationEntities */
        $sellerNotificationEntities = $this->getAppDB()->getSellerNotificationDao()->getAllSellerNotificationWithSellerUid($_POST[self::SELLER_UID]);

        $sellerNotificationMeta = [];
        foreach ($sellerNotificationEntities as $sellerNotificationEntity) {
            array_push($sellerNotificationMeta , /** @_ */[
                'uid' => $sellerNotificationEntity->getUid(),
                'seller_uid' => $sellerNotificationEntity->getSellerUid(),
                'notification' => $sellerNotificationEntity->getNotification(),
                'status' => $sellerNotificationEntity->getStatus(),
                'created_at' => $sellerNotificationEntity->getCreatedAt()
            ]);
        }

        $this->resSendOK([
            'seller_notifications' => $sellerNotificationMeta
        ]);
    }
}
