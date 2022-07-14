<?php

class ReadBuyerNotification extends ElectroApi {

    const NOTIFICATION_UID = "uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::NOTIFICATION_UID);
    }

    protected function onDevise() {
        $buyerNotificationEntity = $this->killFailureIfNullElseGetBuyerNotificationEntity(
            $this->getAppDB()->getBuyerNotificationDao()->getBuyerNotificationWithUid($_POST[self::NOTIFICATION_UID]),
            null,
            'no_notification_found'
        );

        $buyerNotificationEntity->setStatus(true);

        $buyerNotificationEntity = $this->killFailureIfNullElseGetBuyerNotificationEntity(
            $this->getAppDB()->getBuyerNotificationDao()->updateBuyerNotification($buyerNotificationEntity),
            null,
            'unable_to_mark_as_read'
        );

        $this->resSendOK([
            'marked_as_read' => true
        ]);
    }
}
