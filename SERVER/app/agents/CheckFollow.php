<?php

class CheckFollow extends ElectroApi {

    const BUYER_UID = "buyer_uid";
    const SELLER_UID = "seller_uid";

    protected function onAssemble() {
        foreach ([self::BUYER_UID,self::SELLER_UID] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $followEntity = $this->getAppDB()->getFollowerDao()->getFollowerWithBuyerAndSellerUid($_POST[self::BUYER_UID],$_POST[self::SELLER_UID]);
        if($followEntity !== null){
            $this->resSendOK([
                'seller_followed' => true
            ]);
        }else{
            $this->resSendOK([
                'seller_not_followed' => true
            ]);
        }
    }
}
