<?php

class LoginSeller extends ElectroApi {

    const EMAIL = "email";
    const PASSWORD = "password";

    protected function onAssemble() {
        foreach ([self::EMAIL,self::PASSWORD] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {

        $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithEmail($_POST[self::EMAIL]);

        if ($sellerEntity === null) {

            $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
                $this->getAppDB()->getBuyerDao()->getBuyerWithEmail($_POST[self::EMAIL]),
                null,
                'No Buyer Or Seller found With This email'
            );

            if (!$buyerEntity->isIsSeller()) {
                $this->killFailureWithMsg('Not registered as seller');
            }

            if ($buyerEntity->getPassword() !== $_POST[self::PASSWORD]) {
                $this->killFailureWithMsg('Invalid password');
            }

            $userMeta = [
                'uid' => $buyerEntity->getUid(),
                'first_name' => $buyerEntity->getFirstName(),
                'last_name' => $buyerEntity->getLastName(),
                'email' => $buyerEntity->getEmail(),
                'phone' => $buyerEntity->getPhone(),
                'profile_picture' => $buyerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($buyerEntity->getProfilePicture()),
                'country' => $buyerEntity->getCountry(),
                'address' => $buyerEntity->getAddress(),
                'password' => $buyerEntity->getPassword(),
                'is_seller' => $buyerEntity->isIsSeller()
            ];

        } else {

            if ($sellerEntity->getPassword() !== $_POST[self::PASSWORD]) {
                $this->killFailureWithMsg('Invalid password');
            }

            $userMeta = [
                'uid' => $sellerEntity->getUid(),
                'first_name' => $sellerEntity->getFirstName(),
                'last_name' => $sellerEntity->getLastName(),
                'email' => $sellerEntity->getEmail(),
                'phone' => $sellerEntity->getPhone(),
                'profile_picture' => $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                'country' => $sellerEntity->getCountry(),
                'address' => $sellerEntity->getAddress(),
                'password' => $sellerEntity->getPassword()
            ];

        }

        $this->resSendOK([
            'meta' => $userMeta
        ]);
    }
}
