<?php

use Carbon\Carbon;

class GetBuyerConversations extends ElectroApi {

    const BUYER_UID = 'buyer_uid';

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::BUYER_UID);
    }

    protected function onDevise() {

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::BUYER_UID]),
            null,
            'no buyer found'
        );

        $sellers = [];

        /** @var ConversationEntity[] $conversationEntities */
        $conversationEntities = $this->getAppDB()->getConversationDao()->getAllConversationWithBuyerUid($_POST[self::BUYER_UID]);

        foreach ($conversationEntities as $conversationEntity) {

            if ($buyerEntity->getUid() !== $conversationEntity->getSenderUid() && !in_array($conversationEntity->getSenderUid(), $sellers)) {
                array_push($sellers, $conversationEntity->getSenderUid()); /** @_ */
            }
            if ($buyerEntity->getUid() !== $conversationEntity->getReceiverUid() && !in_array($conversationEntity->getReceiverUid(), $sellers)) {
                array_push($sellers, $conversationEntity->getReceiverUid()); /** @_ */
            }

        }

        $buyersConversationMeta = [];

        foreach ($sellers as $sellerUid) {

            $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($sellerUid);

            if ($sellerEntity) {

                $buyerConversationMeta = [];

                /** @var ConversationEntity[] $conversationEntities */
                $conversationEntities = $this->getAppDB()->getConversationDao()->getAllConversationBetweenSenderAndReceiver($buyerEntity->getUid(), $sellerUid);

                foreach ($conversationEntities as $conversationEntity) {

                    array_push($buyerConversationMeta, /** @_ */ [
                        'uid' => $conversationEntity->getUid(),
                        'message' => $conversationEntity->getMessage(),
                        'sender_uid' => $conversationEntity->getSenderUid(),
                        'receiver_uid' => $conversationEntity->getReceiverUid(),
                        'time' => (new Carbon($conversationEntity->getCreatedAt()))->diffForHumans(Carbon::now())
                    ]);

                }

                array_push($buyersConversationMeta, /** @_ */ [
                    'uid' => $sellerEntity->getUid(),
                    'name' => $sellerEntity->getFirstName() . ' ' . $sellerEntity->getLastName(),
                    'avatar' => $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                    'conversations' => $buyerConversationMeta
                ]);

            }
        }

        $this->resSendOK([
            'conversations' => $buyersConversationMeta
        ]);
    }
}
