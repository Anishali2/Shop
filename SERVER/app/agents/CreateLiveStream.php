<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class CreateLiveStream extends ElectroApi {

    const SELLER_UID = 'seller_uid';
    const CHANNEL_NAME = 'channel_name';

    protected function onAssemble() {
        foreach ([self::SELLER_UID,self::CHANNEL_NAME] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $current_time = Carbon::now();

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No_seller_found_with_this_Uid'
        );

        $this->killCustomFailureIfAnyHaveSome(
            'live_stream_is_already_started',
            null,
            $this->getAppDB()->getLiveStreamDao()->getLiveStreamWithSellerUid($_POST[self::SELLER_UID])
        );

        $streamEntity = $this->killFailureIfNullElseGetLiveStreamEntity(
            $this->getAppDB()->getLiveStreamDao()->insertLiveStream(new LiveStreamEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::SELLER_UID],
                $_POST[self::CHANNEL_NAME],
                $current_time,
                $current_time,
            )), null ,
            "failed_to_create_live_stream"
        );

        $this->resSendOK([
            'live_stream' => [
                'uid' => $streamEntity->getUid(),
                'seller_uid' => $streamEntity->getSellerUid(),
                'description' => $streamEntity->getChannelName(),
                'created_at' => $streamEntity->getCreatedAt()
            ]
        ]);
    }
}
