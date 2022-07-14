<?php

class DeleteLiveStream extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {

        $streamEntity = $this->getAppDB()->getLiveStreamDao()->getLiveStreamWithSellerUid($_POST[self::SELLER_UID]);

        $this->getAppDB()->getLiveStreamDao()->deleteLiveStream($streamEntity);

        $this->resSendOK([
            'stream_deleted_successfully' => true
        ]);
    }
}
