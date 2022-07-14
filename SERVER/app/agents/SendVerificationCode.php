<?php

use Carbon\Carbon;
use Ramsey\Uuid\Uuid;

class SendVerificationCode extends ElectroApi {

    const EMAIL = 'email';

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::EMAIL);
    }

    protected function onDevise() {
        if(filter_var($_POST[self::EMAIL], FILTER_VALIDATE_EMAIL)) {

            $num_str = sprintf("%06d", mt_rand(1, 999999));

            if (mail($_POST[self::EMAIL],"ShopenLive Email Verification Code",$num_str)) {

                $this->killFailureIfNullElseGetEmailCodeEntity(
                    $this->getAppDB()->getEmailCodeDao()->insertEmailCode(
                        new EmailCodeEntity(
                            Uuid::uuid4()->toString(),
                            $num_str,
                            Carbon::now(),
                            Carbon::now(),
                        )
                    )
                    , null
                    , 'Failed to save otp code'
                );

            } else {

                $this->killFailureWithMsg('Failed to send otp');

            }

        } else {
            $this->killFailureWithMsg('Invalid email');
        }

        $this->resSendOK([
            'opt_sent_successfully' => true
        ]);
    }
}
