<?php

class GetBuyerDetails extends ElectroApi {

    const BUYER_UID = "buyer_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::BUYER_UID);
    }

    protected function onDevise() {
        $buyerEntity = null;

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::BUYER_UID]),
            null,
            'No buyer found with this Uid'
        );

        $this->resSendOK([
            'buyer_details' => [
                'uid' => $buyerEntity->getUid(),
                'first_name' => $buyerEntity->getFirstName(),
                'last_name' => $buyerEntity->getLastName(),
                'email' => $buyerEntity->getEmail(),
                'phone' => $buyerEntity->getPhone(),
                'profile_picture' => $buyerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($buyerEntity->getProfilePicture()),
                'country' => $buyerEntity->getCountry(),
                'address' => $buyerEntity->getAddress(),
                'is_seller' => $buyerEntity->isIsSeller()
            ]
        ]);
    }
}
