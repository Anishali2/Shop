<?php

class LoginBuyer extends ElectroApi {

    const EMAIL = "email";
    const PASSWORD = "password";

    protected function onAssemble() {
        foreach ([self::EMAIL,self::PASSWORD] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $buyerEntity = null;

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithEmail($_POST[self::EMAIL]),
            null,
            'No buyer found with this email'
        );

        if ($buyerEntity->getPassword() !== $_POST[self::PASSWORD]) {
            $this->killFailureWithMsg("Invalid Password");
        }

        $this->resSendOK([
            'buyer' => [
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
            ]
        ]);
    }
}
