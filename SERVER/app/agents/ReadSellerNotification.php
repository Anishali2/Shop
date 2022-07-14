<?php

class ReadSellerNotification extends ElectroApi {

    const NOTIFICATION_UID = "uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::NOTIFICATION_UID);
    }

    protected function onDevise() {
        $sellerNotificationEntity = $this->killFailureIfNullElseGetSellerNotificationEntity(
            $this->getAppDB()->getSellerNotificationDao()->getSellerNotificationWithUid($_POST[self::NOTIFICATION_UID]),
            null,
            'no_notification_found'
        );

        $sellerNotificationEntity->setStatus(true);

        $buyerNotificationEntity = $this->killFailureIfNullElseGetSellerNotificationEntity(
            $this->getAppDB()->getSellerNotificationDao()->updateSellerNotification($sellerNotificationEntity),
            null,
            'unable_to_mark_as_read'
        );

        $this->resSendOK([
            'marked_as_read' => true
        ]);
    }
}
