<?php

class DeletePost extends ElectroApi {

    const POST_UID = "post_uid";

    protected function onAssemble()
    {
        $this->killWithBadRequestExceptionIfTextualParamIsMissing(self::POST_UID);
    }

    protected function onDevise() {

        $postEntity = $this->getAppDB()->getPostDao()->getPostWithUid($_POST[self::POST_UID]);

        $this->getAppDB()->getPostDao()->deletePost($postEntity);

        $this->resSendOK([
            'post_deleted_successfully' => true
        ]);
    }
}
