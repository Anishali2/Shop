<?php

class UnblockPerson extends ElectroApi {

    const BLOCKER = "blocker";
    const BLOCKED = "blocked";

    protected function onAssemble() {
        foreach ([self::BLOCKER,self::BLOCKED] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $blockEntity = $this->getAppDB()->getBlockDao()->getBlockWithBlockerAndBlocked($_POST[self::BLOCKER],$_POST[self::BLOCKED]);
        $this->getAppDB()->getBlockDao()->deleteBlock($blockEntity);
        $this->resSendOK([
            'Unblocked_Successfully' => true
        ]);
    }
}
