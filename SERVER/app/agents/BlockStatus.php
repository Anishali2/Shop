<?php

class BlockStatus extends ElectroApi {

    const BLOCKER = "blocker";
    const BLOCKING = "blocking";

    protected function onAssemble() {
        foreach ([self::BLOCKER,self::BLOCKING] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {

        $blockCheck = $this->getAppDB()->getBlockDao()->getBlockWithBlockerAndBlocked($_POST[self::BLOCKER],$_POST[self::BLOCKING]);
        if($blockCheck !== null){
            $this->resSendOK([
                'blocked' => true
            ]);
        }else{
            $this->resSendOK([
                'blocked' => false
            ]);
        }


    }
}
