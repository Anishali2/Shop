<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class UpdateBuyerDetails extends ElectroApi {

    const BUYER_UID = "buyer_uid";
    const FIRST_NAME = "first_name";
    const LAST_NAME = "last_name";
    const PHONE = "phone";
    const COUNTRY = "country";
    const ADDRESS = "address";
    const PROFILE_PICTURE = "profile_picture";

    protected function onAssemble() {
        foreach ([self::BUYER_UID,self::FIRST_NAME,self::LAST_NAME,self::PHONE,self::COUNTRY,self::ADDRESS] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
        $this->killWithBadRequestExceptionIfMultipartParamIsMissing(self::PROFILE_PICTURE);
    }

    protected function onDevise() {
        $current_time = Carbon::now();
        $buyerEntity = null;

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->getBuyerWithUid($_POST[self::BUYER_UID]),
            null,
            'No buyer found with this uid'
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

        $buyerEntity->setProfilePicture($imageName);

        $buyerEntity->setFirstName($_POST[self::FIRST_NAME]);
        $buyerEntity->setLastName($_POST[self::LAST_NAME]);
        $buyerEntity->setCountry($_POST[self::COUNTRY]);
        $buyerEntity->setAddress($_POST[self::ADDRESS]);
        $buyerEntity->setPhone($_POST[self::PHONE]);
        $buyerEntity->setUpdatedAt($current_time);

        $buyerEntity = $this->killFailureIfNullElseGetBuyerEntity(
            $this->getAppDB()->getBuyerDao()->updateBuyer($buyerEntity)
            , null
            , 'Failed to update buyer entity'
        );

        $this->resSendOK([
            'buyer_profile_updated' => true
        ]);
    }
}
