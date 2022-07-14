<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class BlockPerson extends ElectroApi {

    const BLOCKER = "blocker";
    const BLOCKING = "blocking";

    protected function onAssemble() {
        foreach ([self::BLOCKER,self::BLOCKING] as $item) {
            $this->killWithBadRequestExceptionIfTextualParamIsMissing($item);
        }
    }

    protected function onDevise() {
        $current_time = Carbon::now();

        $followCheck = $this->getAppDB()->getBlockDao()->getBlockWithBlockerAndBlocked($_POST[self::BLOCKER],$_POST[self::BLOCKING]);
        if($followCheck !== null){
            $this->killFailureWithMsg("Already_Blocked");
        }

        $blockEntity = $this->killFailureIfNullElseGetBlockEntity(
            $this->getAppDB()->getBlockDao()->insertBlock(new BlockEntity(
                Uuid::uuid4()->toString(),
                $_POST[self::BLOCKER],
                $_POST[self::BLOCKING],
                $current_time,
                $current_time
            )),
            null,
            "Failed to block Person"
        );

        $this->resSendOK([
            'person_blocked' => true
        ]);
    }
}
