<?php

class GetAllSellers extends ElectroApi {

    protected function onDevise() {
        /** @var SellerEntity[] $sellerEntities */
        $sellerEntities = $this->getAppDB()->getSellerDao()->getAllSeller();

        $sellerMeta = [];
        foreach ($sellerEntities as $sellerEntity) {
            array_push($sellerMeta , /** @_ */ [
                'seller_uid' => $sellerEntity->getUid(),
                'full_name' => $sellerEntity->getFirstName() . ' ' . $sellerEntity->getLastName(),
                'profile_picture' => $sellerEntity === null || $sellerEntity->getProfilePicture() === null ? null : $this->createLinkForUserAvatarImage($sellerEntity->getProfilePicture()),
                'created_at' => $sellerEntity->getCreatedAt()
            ]);
        }
        $this->resSendOK([
            'all_sellers' => $sellerMeta
        ]);
    }
}
