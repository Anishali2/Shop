<?php

use Carbon\Carbon;

class GetSellerConversations extends ElectroApi {

    const SELLER_UID = 'seller_uid';

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'no seller found'
        );

        $buyers = [];

        /** @var ConversationEntity[] $conversationEntities */
        $conversationEntities = $this->getAppDB()->getConversationDao()->getAllConversationWithSellerUid($_POST[self::SELLER_UID]);

        foreach ($conversationEntities as $conversationEntity) {

            if ($sellerEntity->getUid() !== $conversationEntity->getSenderUid() && !in_array($conversationEntity->getSenderUid(), $buyers)) {
                array_push($buyers, $conversationEntity->getSenderUid()); /** @_ */
            }
            if ($sellerEntity->getUid() !== $conversationEntity->getReceiverUid() && !in_array($conversationEntity->getReceiverUid(), $buyers)) {
                array_push($buyers, $conversationEntity->getReceiverUid()); /** @_ */
            }

        }

        $sellersConversationMeta = [];

        foreach ($buyers as $buyerUid) {

            $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($buyerUid);

            if ($buyerEntity) {

                $sellerConversationMeta = [];

                /** @var ConversationEntity[] $conversationEntities */
                $conversationEntities = $this->getAppDB()->getConversationDao()->getAllConversationBetweenSenderAndReceiver($sellerEntity->getUid(), $buyerUid);

                foreach ($conversationEntities as $conversationEntity) {

                    array_push($sellerConversationMeta, /** @_ */ [
                        'uid' => $conversationEntity->getUid(),
                        'message' => $conversationEntity->getMessage(),
                        'sender_uid' => $conversationEntity->getSenderUid(),
                        'receiver_uid' => $conversationEntity->getReceiverUid(),
                        'time' => (new Carbon($conversationEntity->getCreatedAt()))->diffForHumans(Carbon::now())
                    ]);

                }

                array_push($sellersConversationMeta, /** @_ */ [
                    'uid' => $buyerEntity->getUid(),
                    'name' => $buyerEntity->getFirstName() . ' ' . $buyerEntity->getLastName(),
                    'avatar' => $buyerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($buyerEntity->getProfilePicture()),
                    'conversations' => $sellerConversationMeta
                ]);

            }
        }

        $this->resSendOK([
            'conversations' => $sellersConversationMeta
        ]);
    }
}
