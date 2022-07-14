<?php

class GetBuyerNotifications extends ElectroApi {

    const BUYER_UID = "buyer_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::BUYER_UID);
    }

    protected function onDevise() {

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::BUYER_UID]),
            null,
            'No Buyer found'
        );

        /** @var BuyerNotificationEntity[] $buyerNotificationEntities */
        $buyerNotificationEntities = $this->getAppDB()->getBuyerNotificationDao()->getAllBuyerNotificationWithBuyerUid($_POST[self::BUYER_UID]);

        $buyerNotificationMeta = [];
        foreach ($buyerNotificationEntities as $buyerNotificationEntity) {
            array_push($buyerNotificationMeta , /** @_ */[
                'uid' => $buyerNotificationEntity->getUid(),
                'buyer_uid' => $buyerNotificationEntity->getBuyerUid(),
                'notification' => $buyerNotificationEntity->getNotification(),
                'status' => $buyerNotificationEntity->getStatus(),
                'created_at' => $buyerNotificationEntity->getCreatedAt()
            ]);
        }

        $this->resSendOK([
            'buyer_notifications' => $buyerNotificationMeta
        ]);
    }
}
