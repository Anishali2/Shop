<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class CreatePost extends ElectroApi {

    const SELLER_UID = 'seller_uid';
    const DESCRIPTION = 'description';
    const IMAGES = 'images';

    protected function onAssemble() {
        foreach ([self::SELLER_UID,self::DESCRIPTION] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }

        $this->killWithBadRequestExceptionIfMultipartParamIsMissing(self::IMAGES);

    }

    protected function onDevise() {
        $current_time = Carbon::now();

        $sellerEntity = $this->killFailureIfNullElseGetSellerEntity(
            $this->getAppDB()->getSellerDao()->getSellerWithUid($_POST[self::SELLER_UID]),
            null,
            'No seller found with this uid'
        );

        $images = [];

        if (count($_FILES[self::IMAGES]['tmp_name']) > 10) {
            $this->killFailureWithMsg('Images count should be less then 10');
        }

        for( $i = 0; $i < count($_FILES[self::IMAGES]['tmp_name']); $i++) {
            $imageName = '';

            $this->killFailureIfImageNotSaved(
                self::IMAGES,
                ImageUploader::withSrc($_FILES[self::IMAGES]['tmp_name'][$i])
                    ->destinationDir($this->getPostImageDirPath())
                    ->generateUniqueName($_FILES[self::IMAGES]['name'][$i])
                    ->mapGeneratedName($imageName)
                    ->compressQuality(75)
                    ->save()
            );

            array_push($images, $imageName); /** @_ */
        }

        $postEntity = $this->killFailureIfNullElseGetPostEntity(
            $this->getAppDB()->getPostDao()->insertPost(new PostEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::SELLER_UID],
                $_POST[self::DESCRIPTION],
                json_encode($images),
                $current_time,
                $current_time,
            )), null ,
            "failed_to_create_post"
        );


        $postImages = [];

        foreach ($images as $image) {
            array_push($postImages, /** @_ */ $this->createLinkForPostImage($image));
        }

        $this->resSendOK([
            'post' => [
                'uid' => $postEntity->getUid(),
                'seller_uid' => $postEntity->getSellerUid(),
                'description' => $postEntity->getDescription(),
                'images' => $postImages,
                'created_at' => $postEntity->getCreatedAt()
            ]
        ]);
    }
}
