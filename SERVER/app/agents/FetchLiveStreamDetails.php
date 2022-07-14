<?php

class FetchLiveStreamDetails extends ElectroApi {

    protected function onDevise() {
        /** @var LiveStreamEntity[] $streamEntities */
        $streamEntities = $this->getAppDB()->getLiveStreamDao()->getAllLiveStream();

        $streamMeta = [];
        foreach ($streamEntities as $streamEntity) {

            $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($streamEntity->getSellerUid());

            array_push($streamMeta , /** @_ */ [
                'stream_uid' => $streamEntity->getUid(),
                'channel_name' => $streamEntity->getChannelName(),
                'seller_uid' => $streamEntity === null ? null : $streamEntity->getSellerUid(),
                'full_name' => $sellerEntity === null ? null : $sellerEntity->getFirstName() . ' ' . $sellerEntity->getLastName(),
                'seller_profile_picture' => $sellerEntity === null || $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                'created_at' => $streamEntity->getCreatedAt()
            ]);
        }
        $this->resSendOK([
            'live_streams' => $streamMeta
        ]);
    }
}
