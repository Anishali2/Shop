<?php

use Carbon\Carbon;

class VerifyEmailVerificationCode extends ElectroApi {

    const OTP = 'otp';

    protected function onAssemble() {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::OTP);
    }

    protected function onDevise() {
        $emailVerificationCodeEntities = $this->getAppDB()->getEmailCodeDao()->getAllEmailCode();

        /** @var EmailCodeEntity $emailVerificationCodeEntity */
        foreach ($emailVerificationCodeEntities as $emailVerificationCodeEntity) {
            if (((new Carbon($emailVerificationCodeEntity->getCreatedAt()))->diffInMinutes(Carbon::now())) > 5) {
                $this->getAppDB()->getEmailCodeDao()->deleteEmailCode($emailVerificationCodeEntity);
            }
        }

        $emailVerificationCodeEntity = $this->killFailureIfNullElseGetEmailCodeEntity(
            $this->getAppDB()->getEmailCodeDao()->getEmailCodeWithCode($_POST[self::OTP]),
            null,
            'Invalid otp'
        );

        if (((new Carbon($emailVerificationCodeEntity->getCreatedAt()))->diffInMinutes(Carbon::now())) > 1) {
            $this->killFailureWithMsg('Opt expired');
        }

        $this->resSendOK([
            'otp_verified' => true
        ]);
    }
}
