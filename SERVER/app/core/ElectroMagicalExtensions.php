<?php

trait ElectroMagicalExtensions {
    private function findLastEntityOrKill(
        $iterable,
        $msg,
        ?int $contract_code,
        $compromised=false
    ) {
        if (count($iterable) === 0) {
            if ($contract_code !== null) {
                $this->onKillContractSigned($contract_code);
            }
            if ($compromised) {
                $this->killAsCompromised([ $msg => true ]);
            } else {
                $this->killAsFailure([ $msg => true ]);
            }
        }
        return end($iterable);
    }

    private function killIfNull(
        $payload,
        string $msg,
        ?int $contract_code,
        bool $compromised=false
    ) {
        if ($payload === null) {
            if ($contract_code !== null) {
                $this->onKillContractSigned($contract_code);
            }
            if ($compromised) {
                $this->killAsCompromised([ $msg => true ]);
            } else {
                $this->killAsFailure([ $msg => true ]);
            }
        }
        return $payload;
    }

    private function killIfEmpty(
        $payload,
        string $msg,
        ?int $contract_code,
        bool $compromised=false
    ) {
        if (count($payload) === 0) {
            if ($contract_code !== null) {
                $this->onKillContractSigned($contract_code);
            }
            if ($compromised) {
                $this->killAsCompromised([ $msg => true ]);
            } else {
                $this->killAsFailure([ $msg => true ]);
            }
        }
        return $payload;
    }

    public function findLastBuyerNotificationEntityOrKillFailure(
        array $buyerNotifications, 
        ?int $contract_code=null,
        $msg=''
    ): BuyerNotificationEntity {
        return $this->findLastEntityOrKill(
             $buyerNotifications,
             $msg === '' ? 'failed_to_find_buyer_notification_entity' : $msg,
             $contract_code
         );
    }

    public function findLastBuyerNotificationEntityOrKillCompromised(
        array $buyerNotifications,
        ?int $contract_code=null,
        $msg=''
    ): BuyerNotificationEntity {
        return $this->findLastEntityOrKill(
            $buyerNotifications,
            $msg === '' ? 'data_compromised_buyer_notification_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetBuyerNotificationEntity(
        ?BuyerNotificationEntity $buyerNotificationEntity,
        ?int $contract_code=null,
         string $msg=''
    ): BuyerNotificationEntity {
        return $this->killIfNull(
            $buyerNotificationEntity, 
            $msg === '' ? 'buyer_notification_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetBuyerNotificationEntity(
        ?BuyerNotificationEntity $buyerNotificationEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): BuyerNotificationEntity {
        return $this->killIfNull(
            $buyerNotificationEntity,
            $msg === '' ? 'data_compromised_buyer_notification_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param BuyerNotificationEntity[] $buyerNotificationEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return BuyerNotificationEntity[]
     */
    public function killFailureIfEmptyElseGetBuyerNotificationEntities(
        array $buyerNotificationEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $buyerNotificationEntities,
            $msg === '' ? 'buyer_notification_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param BuyerNotificationEntity[] $buyerNotificationEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return BuyerNotificationEntity[]
     */
    public function killCompromisedIfEmptyElseGetBuyerNotificationEntities(
        array $buyerNotificationEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $buyerNotificationEntities,
            $msg === '' ? 'data_compromised_buyer_notification_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastProductEntityOrKillFailure(
        array $products, 
        ?int $contract_code=null,
        $msg=''
    ): ProductEntity {
        return $this->findLastEntityOrKill(
             $products,
             $msg === '' ? 'failed_to_find_product_entity' : $msg,
             $contract_code
         );
    }

    public function findLastProductEntityOrKillCompromised(
        array $products,
        ?int $contract_code=null,
        $msg=''
    ): ProductEntity {
        return $this->findLastEntityOrKill(
            $products,
            $msg === '' ? 'data_compromised_product_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetProductEntity(
        ?ProductEntity $productEntity,
        ?int $contract_code=null,
         string $msg=''
    ): ProductEntity {
        return $this->killIfNull(
            $productEntity, 
            $msg === '' ? 'product_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetProductEntity(
        ?ProductEntity $productEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): ProductEntity {
        return $this->killIfNull(
            $productEntity,
            $msg === '' ? 'data_compromised_product_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param ProductEntity[] $productEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return ProductEntity[]
     */
    public function killFailureIfEmptyElseGetProductEntities(
        array $productEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $productEntities,
            $msg === '' ? 'product_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param ProductEntity[] $productEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return ProductEntity[]
     */
    public function killCompromisedIfEmptyElseGetProductEntities(
        array $productEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $productEntities,
            $msg === '' ? 'data_compromised_product_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastLiveStreamEntityOrKillFailure(
        array $liveStreams, 
        ?int $contract_code=null,
        $msg=''
    ): LiveStreamEntity {
        return $this->findLastEntityOrKill(
             $liveStreams,
             $msg === '' ? 'failed_to_find_live_stream_entity' : $msg,
             $contract_code
         );
    }

    public function findLastLiveStreamEntityOrKillCompromised(
        array $liveStreams,
        ?int $contract_code=null,
        $msg=''
    ): LiveStreamEntity {
        return $this->findLastEntityOrKill(
            $liveStreams,
            $msg === '' ? 'data_compromised_live_stream_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetLiveStreamEntity(
        ?LiveStreamEntity $liveStreamEntity,
        ?int $contract_code=null,
         string $msg=''
    ): LiveStreamEntity {
        return $this->killIfNull(
            $liveStreamEntity, 
            $msg === '' ? 'live_stream_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetLiveStreamEntity(
        ?LiveStreamEntity $liveStreamEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): LiveStreamEntity {
        return $this->killIfNull(
            $liveStreamEntity,
            $msg === '' ? 'data_compromised_live_stream_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param LiveStreamEntity[] $liveStreamEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return LiveStreamEntity[]
     */
    public function killFailureIfEmptyElseGetLiveStreamEntities(
        array $liveStreamEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $liveStreamEntities,
            $msg === '' ? 'live_stream_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param LiveStreamEntity[] $liveStreamEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return LiveStreamEntity[]
     */
    public function killCompromisedIfEmptyElseGetLiveStreamEntities(
        array $liveStreamEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $liveStreamEntities,
            $msg === '' ? 'data_compromised_live_stream_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastPostEntityOrKillFailure(
        array $posts, 
        ?int $contract_code=null,
        $msg=''
    ): PostEntity {
        return $this->findLastEntityOrKill(
             $posts,
             $msg === '' ? 'failed_to_find_post_entity' : $msg,
             $contract_code
         );
    }

    public function findLastPostEntityOrKillCompromised(
        array $posts,
        ?int $contract_code=null,
        $msg=''
    ): PostEntity {
        return $this->findLastEntityOrKill(
            $posts,
            $msg === '' ? 'data_compromised_post_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetPostEntity(
        ?PostEntity $postEntity,
        ?int $contract_code=null,
         string $msg=''
    ): PostEntity {
        return $this->killIfNull(
            $postEntity, 
            $msg === '' ? 'post_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetPostEntity(
        ?PostEntity $postEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): PostEntity {
        return $this->killIfNull(
            $postEntity,
            $msg === '' ? 'data_compromised_post_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param PostEntity[] $postEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return PostEntity[]
     */
    public function killFailureIfEmptyElseGetPostEntities(
        array $postEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $postEntities,
            $msg === '' ? 'post_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param PostEntity[] $postEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return PostEntity[]
     */
    public function killCompromisedIfEmptyElseGetPostEntities(
        array $postEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $postEntities,
            $msg === '' ? 'data_compromised_post_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastConversationEntityOrKillFailure(
        array $conversations, 
        ?int $contract_code=null,
        $msg=''
    ): ConversationEntity {
        return $this->findLastEntityOrKill(
             $conversations,
             $msg === '' ? 'failed_to_find_conversation_entity' : $msg,
             $contract_code
         );
    }

    public function findLastConversationEntityOrKillCompromised(
        array $conversations,
        ?int $contract_code=null,
        $msg=''
    ): ConversationEntity {
        return $this->findLastEntityOrKill(
            $conversations,
            $msg === '' ? 'data_compromised_conversation_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetConversationEntity(
        ?ConversationEntity $conversationEntity,
        ?int $contract_code=null,
         string $msg=''
    ): ConversationEntity {
        return $this->killIfNull(
            $conversationEntity, 
            $msg === '' ? 'conversation_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetConversationEntity(
        ?ConversationEntity $conversationEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): ConversationEntity {
        return $this->killIfNull(
            $conversationEntity,
            $msg === '' ? 'data_compromised_conversation_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param ConversationEntity[] $conversationEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return ConversationEntity[]
     */
    public function killFailureIfEmptyElseGetConversationEntities(
        array $conversationEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $conversationEntities,
            $msg === '' ? 'conversation_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param ConversationEntity[] $conversationEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return ConversationEntity[]
     */
    public function killCompromisedIfEmptyElseGetConversationEntities(
        array $conversationEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $conversationEntities,
            $msg === '' ? 'data_compromised_conversation_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastSellerNotificationEntityOrKillFailure(
        array $sellerNotifications, 
        ?int $contract_code=null,
        $msg=''
    ): SellerNotificationEntity {
        return $this->findLastEntityOrKill(
             $sellerNotifications,
             $msg === '' ? 'failed_to_find_seller_notification_entity' : $msg,
             $contract_code
         );
    }

    public function findLastSellerNotificationEntityOrKillCompromised(
        array $sellerNotifications,
        ?int $contract_code=null,
        $msg=''
    ): SellerNotificationEntity {
        return $this->findLastEntityOrKill(
            $sellerNotifications,
            $msg === '' ? 'data_compromised_seller_notification_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetSellerNotificationEntity(
        ?SellerNotificationEntity $sellerNotificationEntity,
        ?int $contract_code=null,
         string $msg=''
    ): SellerNotificationEntity {
        return $this->killIfNull(
            $sellerNotificationEntity, 
            $msg === '' ? 'seller_notification_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetSellerNotificationEntity(
        ?SellerNotificationEntity $sellerNotificationEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): SellerNotificationEntity {
        return $this->killIfNull(
            $sellerNotificationEntity,
            $msg === '' ? 'data_compromised_seller_notification_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param SellerNotificationEntity[] $sellerNotificationEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return SellerNotificationEntity[]
     */
    public function killFailureIfEmptyElseGetSellerNotificationEntities(
        array $sellerNotificationEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $sellerNotificationEntities,
            $msg === '' ? 'seller_notification_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param SellerNotificationEntity[] $sellerNotificationEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return SellerNotificationEntity[]
     */
    public function killCompromisedIfEmptyElseGetSellerNotificationEntities(
        array $sellerNotificationEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $sellerNotificationEntities,
            $msg === '' ? 'data_compromised_seller_notification_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastBlockEntityOrKillFailure(
        array $blocks, 
        ?int $contract_code=null,
        $msg=''
    ): BlockEntity {
        return $this->findLastEntityOrKill(
             $blocks,
             $msg === '' ? 'failed_to_find_block_entity' : $msg,
             $contract_code
         );
    }

    public function findLastBlockEntityOrKillCompromised(
        array $blocks,
        ?int $contract_code=null,
        $msg=''
    ): BlockEntity {
        return $this->findLastEntityOrKill(
            $blocks,
            $msg === '' ? 'data_compromised_block_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetBlockEntity(
        ?BlockEntity $blockEntity,
        ?int $contract_code=null,
         string $msg=''
    ): BlockEntity {
        return $this->killIfNull(
            $blockEntity, 
            $msg === '' ? 'block_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetBlockEntity(
        ?BlockEntity $blockEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): BlockEntity {
        return $this->killIfNull(
            $blockEntity,
            $msg === '' ? 'data_compromised_block_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param BlockEntity[] $blockEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return BlockEntity[]
     */
    public function killFailureIfEmptyElseGetBlockEntities(
        array $blockEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $blockEntities,
            $msg === '' ? 'block_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param BlockEntity[] $blockEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return BlockEntity[]
     */
    public function killCompromisedIfEmptyElseGetBlockEntities(
        array $blockEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $blockEntities,
            $msg === '' ? 'data_compromised_block_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastSellerEntityOrKillFailure(
        array $sellers, 
        ?int $contract_code=null,
        $msg=''
    ): SellerEntity {
        return $this->findLastEntityOrKill(
             $sellers,
             $msg === '' ? 'failed_to_find_seller_entity' : $msg,
             $contract_code
         );
    }

    public function findLastSellerEntityOrKillCompromised(
        array $sellers,
        ?int $contract_code=null,
        $msg=''
    ): SellerEntity {
        return $this->findLastEntityOrKill(
            $sellers,
            $msg === '' ? 'data_compromised_seller_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetSellerEntity(
        ?SellerEntity $sellerEntity,
        ?int $contract_code=null,
         string $msg=''
    ): SellerEntity {
        return $this->killIfNull(
            $sellerEntity, 
            $msg === '' ? 'seller_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetSellerEntity(
        ?SellerEntity $sellerEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): SellerEntity {
        return $this->killIfNull(
            $sellerEntity,
            $msg === '' ? 'data_compromised_seller_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param SellerEntity[] $sellerEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return SellerEntity[]
     */
    public function killFailureIfEmptyElseGetSellerEntities(
        array $sellerEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $sellerEntities,
            $msg === '' ? 'seller_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param SellerEntity[] $sellerEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return SellerEntity[]
     */
    public function killCompromisedIfEmptyElseGetSellerEntities(
        array $sellerEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $sellerEntities,
            $msg === '' ? 'data_compromised_seller_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastSummaryEntityOrKillFailure(
        array $summarys, 
        ?int $contract_code=null,
        $msg=''
    ): SummaryEntity {
        return $this->findLastEntityOrKill(
             $summarys,
             $msg === '' ? 'failed_to_find_summary_entity' : $msg,
             $contract_code
         );
    }

    public function findLastSummaryEntityOrKillCompromised(
        array $summarys,
        ?int $contract_code=null,
        $msg=''
    ): SummaryEntity {
        return $this->findLastEntityOrKill(
            $summarys,
            $msg === '' ? 'data_compromised_summary_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetSummaryEntity(
        ?SummaryEntity $summaryEntity,
        ?int $contract_code=null,
         string $msg=''
    ): SummaryEntity {
        return $this->killIfNull(
            $summaryEntity, 
            $msg === '' ? 'summary_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetSummaryEntity(
        ?SummaryEntity $summaryEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): SummaryEntity {
        return $this->killIfNull(
            $summaryEntity,
            $msg === '' ? 'data_compromised_summary_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param SummaryEntity[] $summaryEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return SummaryEntity[]
     */
    public function killFailureIfEmptyElseGetSummaryEntities(
        array $summaryEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $summaryEntities,
            $msg === '' ? 'summary_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param SummaryEntity[] $summaryEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return SummaryEntity[]
     */
    public function killCompromisedIfEmptyElseGetSummaryEntities(
        array $summaryEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $summaryEntities,
            $msg === '' ? 'data_compromised_summary_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastReviewEntityOrKillFailure(
        array $reviews, 
        ?int $contract_code=null,
        $msg=''
    ): ReviewEntity {
        return $this->findLastEntityOrKill(
             $reviews,
             $msg === '' ? 'failed_to_find_review_entity' : $msg,
             $contract_code
         );
    }

    public function findLastReviewEntityOrKillCompromised(
        array $reviews,
        ?int $contract_code=null,
        $msg=''
    ): ReviewEntity {
        return $this->findLastEntityOrKill(
            $reviews,
            $msg === '' ? 'data_compromised_review_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetReviewEntity(
        ?ReviewEntity $reviewEntity,
        ?int $contract_code=null,
         string $msg=''
    ): ReviewEntity {
        return $this->killIfNull(
            $reviewEntity, 
            $msg === '' ? 'review_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetReviewEntity(
        ?ReviewEntity $reviewEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): ReviewEntity {
        return $this->killIfNull(
            $reviewEntity,
            $msg === '' ? 'data_compromised_review_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param ReviewEntity[] $reviewEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return ReviewEntity[]
     */
    public function killFailureIfEmptyElseGetReviewEntities(
        array $reviewEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $reviewEntities,
            $msg === '' ? 'review_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param ReviewEntity[] $reviewEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return ReviewEntity[]
     */
    public function killCompromisedIfEmptyElseGetReviewEntities(
        array $reviewEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $reviewEntities,
            $msg === '' ? 'data_compromised_review_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastEmailCodeEntityOrKillFailure(
        array $emailCodes, 
        ?int $contract_code=null,
        $msg=''
    ): EmailCodeEntity {
        return $this->findLastEntityOrKill(
             $emailCodes,
             $msg === '' ? 'failed_to_find_email_code_entity' : $msg,
             $contract_code
         );
    }

    public function findLastEmailCodeEntityOrKillCompromised(
        array $emailCodes,
        ?int $contract_code=null,
        $msg=''
    ): EmailCodeEntity {
        return $this->findLastEntityOrKill(
            $emailCodes,
            $msg === '' ? 'data_compromised_email_code_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetEmailCodeEntity(
        ?EmailCodeEntity $emailCodeEntity,
        ?int $contract_code=null,
         string $msg=''
    ): EmailCodeEntity {
        return $this->killIfNull(
            $emailCodeEntity, 
            $msg === '' ? 'email_code_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetEmailCodeEntity(
        ?EmailCodeEntity $emailCodeEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): EmailCodeEntity {
        return $this->killIfNull(
            $emailCodeEntity,
            $msg === '' ? 'data_compromised_email_code_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param EmailCodeEntity[] $emailCodeEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return EmailCodeEntity[]
     */
    public function killFailureIfEmptyElseGetEmailCodeEntities(
        array $emailCodeEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $emailCodeEntities,
            $msg === '' ? 'email_code_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param EmailCodeEntity[] $emailCodeEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return EmailCodeEntity[]
     */
    public function killCompromisedIfEmptyElseGetEmailCodeEntities(
        array $emailCodeEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $emailCodeEntities,
            $msg === '' ? 'data_compromised_email_code_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastBuyerEntityOrKillFailure(
        array $buyers, 
        ?int $contract_code=null,
        $msg=''
    ): BuyerEntity {
        return $this->findLastEntityOrKill(
             $buyers,
             $msg === '' ? 'failed_to_find_buyer_entity' : $msg,
             $contract_code
         );
    }

    public function findLastBuyerEntityOrKillCompromised(
        array $buyers,
        ?int $contract_code=null,
        $msg=''
    ): BuyerEntity {
        return $this->findLastEntityOrKill(
            $buyers,
            $msg === '' ? 'data_compromised_buyer_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetBuyerEntity(
        ?BuyerEntity $buyerEntity,
        ?int $contract_code=null,
         string $msg=''
    ): BuyerEntity {
        return $this->killIfNull(
            $buyerEntity, 
            $msg === '' ? 'buyer_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetBuyerEntity(
        ?BuyerEntity $buyerEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): BuyerEntity {
        return $this->killIfNull(
            $buyerEntity,
            $msg === '' ? 'data_compromised_buyer_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param BuyerEntity[] $buyerEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return BuyerEntity[]
     */
    public function killFailureIfEmptyElseGetBuyerEntities(
        array $buyerEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $buyerEntities,
            $msg === '' ? 'buyer_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param BuyerEntity[] $buyerEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return BuyerEntity[]
     */
    public function killCompromisedIfEmptyElseGetBuyerEntities(
        array $buyerEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $buyerEntities,
            $msg === '' ? 'data_compromised_buyer_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function findLastFollowerEntityOrKillFailure(
        array $followers, 
        ?int $contract_code=null,
        $msg=''
    ): FollowerEntity {
        return $this->findLastEntityOrKill(
             $followers,
             $msg === '' ? 'failed_to_find_follower_entity' : $msg,
             $contract_code
         );
    }

    public function findLastFollowerEntityOrKillCompromised(
        array $followers,
        ?int $contract_code=null,
        $msg=''
    ): FollowerEntity {
        return $this->findLastEntityOrKill(
            $followers,
            $msg === '' ? 'data_compromised_follower_entity_must_exist_but_not_found' : $msg,
            $contract_code,
            true
        );
    }

    public function killFailureIfNullElseGetFollowerEntity(
        ?FollowerEntity $followerEntity,
        ?int $contract_code=null,
         string $msg=''
    ): FollowerEntity {
        return $this->killIfNull(
            $followerEntity, 
            $msg === '' ? 'follower_entity_not_found' : $msg,
            $contract_code
        );
    }

    public function killCompromisedIfNullElseGetFollowerEntity(
        ?FollowerEntity $followerEntity, 
        ?int $contract_code=null,
         string $msg=''
    ): FollowerEntity {
        return $this->killIfNull(
            $followerEntity,
            $msg === '' ? 'data_compromised_follower_entity_not_found' : $msg,
            $contract_code,
            true
        );
    }

    /**
     * @param FollowerEntity[] $followerEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return FollowerEntity[]
     */
    public function killFailureIfEmptyElseGetFollowerEntities(
        array $followerEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $followerEntities,
            $msg === '' ? 'follower_entities_not_found' : $msg,
            $contract_code
        );
    }

    /**
     * @param FollowerEntity[] $followerEntities
     * @param string $msg
     * @param int|null $contract_code
     * @return FollowerEntity[]
     */
    public function killCompromisedIfEmptyElseGetFollowerEntities(
        array $followerEntities,
        ?int $contract_code=null,
        string $msg=''
    ): array {
        return $this->killIfEmpty(
            $followerEntities,
            $msg === '' ? 'data_compromised_follower_entities_not_found' : $msg,
            $contract_code,
            true
        );
    }

    private function isNone($payload): bool {
        return $payload === null || (is_array($payload) && count($payload) === 0);
    }

    public function killCustomFailureIfAnyHaveSome(
        string $msg,
        ?int $contract_code,
        ...$args
    ): void {
        foreach ($args as $payload) {
            if (!$this->isNone($payload)) {
                if ($contract_code !== null) {
                    $this->onKillContractSigned($contract_code);
                }
                $this->killAsFailure([$msg => true]);
            }
        }
    }

    public function killCustomFailureIfAnyHasNone(string $msg, ?int $contract_code, ...$args): void {
        foreach ($args as $payload) {
            if ($this->isNone($payload)) {
                if ($contract_code !== null) {
                    $this->onKillContractSigned($contract_code);
                }
                $this->killAsFailure([$msg => true]);
            }
        }
    }

    public function killCustomFailureWhenAllHaveNone(string $msg, ?int $contract_code, ...$args): void {
        $every_one_have_none = true;
        foreach ($args as $payload) {
            if (!$this->isNone($payload)) {
                $every_one_have_none = false;
                break;
            }
        }
        if ($every_one_have_none) {
            if ($contract_code !== null) {
                $this->onKillContractSigned($contract_code);
            }
            $this->killAsFailure([$msg => true]);
        }
    }

    public function killCustomFailureWhenAllHaveSome(string $msg, ?int $contract_code, ...$args): void {
        $every_one_have_something = true;
        foreach ($args as $payload) {
            if ($this->isNone($payload)) {
                $every_one_have_something = false;
                break;
            }
        }
        if ($every_one_have_something) {
            if ($contract_code !== null) {
                $this->onKillContractSigned($contract_code);
            }
            $this->killAsFailure([$msg => true]);
        }
    }

    public function killFailureIfImageNotSaved(
        string $request_key,
        bool $saved,
        ?int $contract_code=null
    ): void {
        if (!$saved) {
            if ($contract_code !== null) {
                $this->onKillContractSigned($contract_code);
            }
            $this->killAsFailure([
                'failed_to_save_' . $request_key . '_file' => true
            ]);
        }
    }

    public function deleteFileTillItDoesNotDelete(string $path): void {
        while (true) {
            if (!file_exists($path)) {
                break;
            }
            unlink($path);
        }
    }

    public function killWithBadRequestExceptionIfTextualParamIsMissing(string $param): void {
        if (!isset($_POST[$param])) {
            $this->killAsBadRequestWithMissingParamException($param);
        }
    }

    public function killWithBadRequestExceptionIfMultipartParamIsMissing(string $param): void {
        if (!isset($_FILES[$param])) {
            $this->killAsBadRequestWithMissingParamException($param);
        }
    }
}
