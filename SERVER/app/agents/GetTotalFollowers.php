<?php

class GetTotalFollowers extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {
        /** @var FollowerEntity[] $followerEntities */
        $followerEntities = $this->getAppDB()->getFollowerDao()->getFollowerWithSellerUid($_POST[self::SELLER_UID]);

        $count = 0;
        foreach ($followerEntities as $followerEntity) {
            $count = $count + 1;
        }
        $this->resSendOK([
            'total_followers' => $count
        ]);
    }
}
