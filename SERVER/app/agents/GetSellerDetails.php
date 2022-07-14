<?php

class GetSellerDetails extends ElectroApi {

    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::SELLER_UID);
    }

    protected function onDevise() {
        $sellerEntity = null;

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No seller found with this Uid'
        );

        $this->resSendOK([
            'buyer_details' => [
                'uid' => $sellerEntity->getUid(),
                'first_name' => $sellerEntity->getFirstName(),
                'last_name' => $sellerEntity->getLastName(),
                'bio' => $sellerEntity->getBio(),
                'email' => $sellerEntity->getEmail(),
                'phone' => $sellerEntity->getPhone(),
                'profile_picture' => $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                'country' => $sellerEntity->getCountry(),
                'address' => $sellerEntity->getAddress()
            ]
        ]);
    }
}
