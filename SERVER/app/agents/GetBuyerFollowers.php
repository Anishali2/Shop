<?php

class GetBuyerFollowers extends ElectroApi {

    const BUYER_UID = "buyer_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::BUYER_UID);
    }

    protected function onDevise() {
        /** @var FollowerEntity[] $followerEntities */
        $followerEntities = $this->getAppDB()->getFollowerDao()->getFollowerWithBuyerUid($_POST[self::BUYER_UID]);

        $followerMeta = [];
        foreach ($followerEntities as $followerEntity) {
            $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($followerEntity->getSellerUid());

            array_push($followerMeta , /** @_ */[
                'uid' => $followerEntity->getUid(),
                'buyer_uid' => $sellerEntity === null ? null : $sellerEntity->getUid(),
                'first_name' => $sellerEntity === null ? null : $sellerEntity->getFirstName(),
                'last_name' => $sellerEntity === null ? null : $sellerEntity->getLastName(),
                'profile_picture' => $sellerEntity === null || $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
            ]);
        }
        $this->resSendOK([
            'followers' => $followerMeta
        ]);
    }
}
