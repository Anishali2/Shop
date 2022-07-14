<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class RegisterSeller extends ElectroApi {

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
            $this->getAppDB()->getSellerDao()->getSellerWithEmail($_POST[self::EMAIL])
        );

        $this->killCustomFailureIfAnyHaveSome(
            'Phone Already Exists',
            null,
            $this->getAppDB()->getSellerDao()->getSellerWithPhone($_POST[self::PHONE])
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

        $bio = " ";
        $current_time = Carbon::now();

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->insertSeller(new SellerEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::FIRST_NAME],
                $_POST[self::LAST_NAME],
                $_POST[self::EMAIL],
                $_POST[self::COUNTRY],
                $_POST[self::ADDRESS],
                $_POST[self::PHONE],
                $imageName,
                $_POST[self::PASSWORD],
                $bio,
                $current_time,
                $current_time
            )),
            null,
            "Failed to Register Seller"
        );
        $this->resSendOK([
            'seller' => [
                'uid' => $sellerEntity->getUid(),
                'first_name' => $sellerEntity->getFirstName(),
                'last_name' => $sellerEntity->getLastName(),
                'email' => $sellerEntity->getEmail(),
                'phone' => $sellerEntity->getPhone(),
                'profile_picture' => $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                'country' => $sellerEntity->getCountry(),
                'address' => $sellerEntity->getAddress(),
                'password' => $sellerEntity->getPassword()
            ]
        ]);
    }
}
