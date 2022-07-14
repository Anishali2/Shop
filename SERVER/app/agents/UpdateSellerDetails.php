<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class UpdateSellerDetails extends ElectroApi {

    const SELLER_UID = "seller_uid";
    const FIRST_NAME = "first_name";
    const LAST_NAME = "last_name";
    const PHONE = "phone";
    const COUNTRY = "country";
    const ADDRESS = "address";
    const PROFILE_PICTURE = "profile_picture";

    protected function onAssemble() {
        foreach ([self::SELLER_UID,self::FIRST_NAME,self::LAST_NAME,self::PHONE,self::COUNTRY,self::ADDRESS] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
        $this->killWithBadRequestExceptionIfMultipartParamIsMissing(self::PROFILE_PICTURE);
    }

    protected function onDevise() {
        $current_time = Carbon::now();
        $sellerEntity = null;

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No seller found with this uid'
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

        $sellerEntity->setProfilePicture($imageName);

        $sellerEntity->setFirstName($_POST[self::FIRST_NAME]);
        $sellerEntity->setLastName($_POST[self::LAST_NAME]);
        $sellerEntity->setCountry($_POST[self::COUNTRY]);
        $sellerEntity->setAddress($_POST[self::ADDRESS]);
        $sellerEntity->setPhone($_POST[self::PHONE]);
        $sellerEntity->setUpdatedAt($current_time);

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->updateSeller($sellerEntity)
            , null
            , 'Failed to update seller entity'
        );

        $this->resSendOK([
            'seller_profile_updated' => true
        ]);
    }
}
