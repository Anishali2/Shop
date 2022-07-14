<?php

class GetBlockList extends ElectroApi {

    const UID = "uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::UID);
    }

    protected function onDevise() {
        /** @var BlockEntity[] $blockEntities */
        $blockEntities = $this->getAppDB()->getBlockDao()->getBlockWithBlockerUid($_POST[self::UID]);
        if($blockEntities === null){
            $this->killFailureWithMsg('block_list_empty');
        }

        $blockMeta = [];
        foreach ($blockEntities as $blockEntity) {
            $buyerEntity = $this->getAppDB()->getBuyerDao()->getBuyerWithUid($blockEntity->getBlocked());
            if($buyerEntity !== null){
                array_push($blockMeta , /** @_ */[
                    'uid' => $blockEntity->getUid(),
                    'buyer_uid' => $buyerEntity === null ? null : $buyerEntity->getUid(),
                    'full_name' => $buyerEntity->getFirstName() . ' ' . $buyerEntity->getLastName()
                ]);
            }
            if($buyerEntity === null){
                $sellerEntity = $this->getAppDB()->getSellerDao()->getSellerWithUid($blockEntity->getBlocked());
                array_push($blockMeta , /** @_ */[
                    'uid' => $blockEntity->getUid(),
                    'buyer_uid' => $sellerEntity === null ? null : $sellerEntity->getUid(),
                    'full_name' => $sellerEntity->getFirstName() . ' ' . $sellerEntity->getLastName()
                ]);
            }
        }
        $this->resSendOK([
            'block_list' => $blockMeta
        ]);
    }
}
