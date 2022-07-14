<?php

class FetchPosts extends ElectroApi {

    protected function onDevise() {
        /** @var PostEntity[] $postEntities */
        $postEntities = $this->getAppDB()->getPostDao()->getAllPost();

        $postMeta = [];
        foreach ($postEntities as $postEntity) {
            $postImages = [];

            /** @var string[] $images */
            $images = json_decode($postEntity->getPicture() , true);

            foreach ($images as $i => $image) {
                array_push($postImages,  /** @_ */
                    $this->createLinkForPostImage($image)
                );
            }
            $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($postEntity->getSellerUid());

            array_push($postMeta , /** @_ */ [
                'post_uid' => $postEntity->getUid(),
                'seller_uid' => $postEntity === null ? null : $postEntity->getSellerUid(),
                'first_name' => $sellerEntity === null ? null : $sellerEntity->getFirstName(),
                'last_name' => $sellerEntity === null ? null : $sellerEntity->getLastName(),
                'profile_picture' => $sellerEntity === null || $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                'description' => $postEntity->getDescription(),
                'post_image' => $postImages,
                'created_at' => $postEntity->getCreatedAt()
            ]);
        }
        $this->resSendOK([
            'posts' => $postMeta
        ]);
    }
}
