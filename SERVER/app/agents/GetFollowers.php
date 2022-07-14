<?php

class GetFollowers extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {
        /** @var FollowerEntity[] $followerEntities */
        $followerEntities = $this->getAppDB()->getFollowerDao()->getFollowerWithSellerUid($_POST[self::SELLER_UID]);

        $followerMeta = [];
        foreach ($followerEntities as $followerEntity) {
            $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($followerEntity->getBuyerUid());

            array_push($followerMeta , /** @_ */[
                'uid' => $followerEntity->getUid(),
                'buyer_uid' => $buyerEntity === null ? null : $buyerEntity->getUid(),
                'first_name' => $buyerEntity === null ? null : $buyerEntity->getFirstName(),
                'last_name' => $buyerEntity === null ? null : $buyerEntity->getLastName(),
                'profile_picture' => $buyerEntity === null || $buyerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($buyerEntity->getProfilePicture()),
            ]);
        }
        $this->resSendOK([
            'followers' => $followerMeta
        ]);
    }
}
