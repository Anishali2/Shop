<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class SendMessage extends ElectroApi {

    const SENDER_UID = 'sender_uid';
    const RECEIVER_UID = 'receiver_uid';
    const MESSAGE = 'message';

    protected function onAssemble() {
        foreach ([self::SENDER_UID, self::RECEIVER_UID, self::MESSAGE] as $args) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($args);
        }
    }

    protected function onDevise() {
        $current_time = Carbon::now();

        $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SENDER_UID]);
        $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::SENDER_UID]);

        if ($sellerEntity === null && $buyerEntity === null) {
            $this->killFailureWithMsg('No entity found with sender uid');
        }

        $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::RECEIVER_UID]);
        $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::RECEIVER_UID]);

        if ($sellerEntity === null && $buyerEntity === null) {
            $this->killFailureWithMsg('No entity found with receiver uid');
        }

        $this->killFailureIfNullElseGetConversationEntity(
            $this->getAppDB()->getConversationDao()->insertConversation(
                new ConversationEntity(
                    Uuid::uuid4()->toString(),
                    $_POST[self::SENDER_UID],
                    $_POST[self::RECEIVER_UID],
                    $_POST[self::MESSAGE],
                    Carbon::now(),
                    Carbon::now()
                )
            ),
            null,
            'Error occur while sending message'
        );

        $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::RECEIVER_UID]);
        $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::RECEIVER_UID]);

        if($sellerEntity !== null){
            $sellerNotificationEntity = $this->killFailureIfNullElseGetSellerNotificationEntity(
                $this->getAppDB()->getSellerNotificationDao()->insertSellerNotification(new SellerNotificationEntity(
                    Uuid::uuid4()->toString(),
                    $_POST[self::RECEIVER_UID],
                    'You have received a new message.',
                    $current_time,
                    $current_time,
                    false
                )),
                null,
                "Failed to send notification"
            );
        }
        if($buyerEntity !== null){
            $buyerNotificationEntity = $this->killFailureIfNullElseGetBuyerNotificationEntity(
                $this->getAppDB()->getBuyerNotificationDao()->insertBuyerNotification(new BuyerNotificationEntity(
                    Uuid::uuid4()->toString(),
                    $_POST[self::RECEIVER_UID],
                    'You have received a new message.',
                    $current_time,
                    $current_time,
                    false
                )),
                null,
                "Failed to send notification"
            );
        }

        $this->resSendOK([
            'message_sent' => true
        ]);
    }
}
