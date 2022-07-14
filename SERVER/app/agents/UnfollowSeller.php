<?php

class UnfollowSeller extends ElectroApi {

    const BUYER_UID = "buyer_uid";
    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        foreach ([self::BUYER_UID,self::SELLER_UID] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $sellerEntity = $this->getAppDB()->getFollowerDao()->getFollowerWithBuyerAndSellerUid($_POST[self::BUYER_UID],$_POST[self::SELLER_UID]);
        $this->getAppDB()->getFollowerDao()->deleteFollower($sellerEntity);
        $this->resSendOK([
            'Unfollowed_Seller_Successfully' => true
        ]);
    }
}
