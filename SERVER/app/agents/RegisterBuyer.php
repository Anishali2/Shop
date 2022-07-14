<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class RegisterBuyer extends ElectroApi {

    const FIRST_NAME = "first_name";
    const LAST_NAME = "last_name";
    const EMAIL = "email";
    const PHONE = "phone";
    const PROFILE_PICTURE = "profile_picture";
    const COUNTRY = "country";
    const ADDRESS = "address";
    const PASSWORD = "password";

    protected function onAssemble() {
        foreach ([self::FIRST_NAME,self::LAST_NAME,self::EMAIL,self::PHONE,self::COUNTRY,self::ADDRESS,self::PASSWORD] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
        if (!isset($_FILES[self::PROFILE_PICTURE])) {
            $this->killAsBadRequestWithMissingParamException(self::PROFILE_PICTURE);
        }
    }

    protected function onDevise() {
        $this->killCustomFailureIfAnyHaveSome(
            'Email already Exists',
            null,
            $this->getAppDB()->getBuyerDao()->getBuyerWithEmail($_POST[self::EMAIL])
        );

        $this->killCustomFailureIfAnyHaveSome(
            'Phone Already Exists',
            null,
            $this->getAppDB()->getBuyerDao()->getBuyerWithPhone($_POST[self::PHONE])
        );

        $imageName = '';

        $this->killFailureIfImageNotSaved(
            self::PROFILE_PICTURE,
            ImageUploader::withSrc($_FILES[self::PROFILE_PICTURE]['tmp_name'])
                ->destinationDir($this->getUserAvatarImageDirPath())
                ->generateUniqueName($_FILES[self::PROFILE_PICTURE]['name'])
                ->mapGeneratedName($imageName)
                ->compressQuality(75)
                ->save()
        );

        $current_time = Carbon::now();

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->insertBuyer(new BuyerEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::FIRST_NAME],
                $_POST[self::LAST_NAME],
                $_POST[self::EMAIL],
                $_POST[self::COUNTRY],
                $_POST[self::ADDRESS],
                $_POST[self::PHONE],
                $imageName,
                $_POST[self::PASSWORD],
                $current_time,
                $current_time,
                false
            )),
            null,
            "Failed to Register Buyer"
        );
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
