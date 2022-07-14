<?php

class ConversationDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertConversation(ConversationEntity $conversationEntity): ?ConversationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(ConversationEntity::TABLE_NAME)
            ->columns([
                ConversationTableSchema::UID,
                ConversationTableSchema::SENDER_UID,
                ConversationTableSchema::RECEIVER_UID,
                ConversationTableSchema::MESSAGE,
                ConversationTableSchema::CREATED_AT,
                ConversationTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($conversationEntity->getUid()),
                $this->escape_string($conversationEntity->getSenderUid()),
                $this->escape_string($conversationEntity->getReceiverUid()),
                $this->escape_string($conversationEntity->getMessage()),
                $this->escape_string($conversationEntity->getCreatedAt()),
                $this->escape_string($conversationEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getConversationWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getConversationWithId(string $id): ?ConversationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ConversationEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [ConversationTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ConversationFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getConversationWithUid(string $uid): ?ConversationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ConversationEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [ConversationTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ConversationFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllConversation(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ConversationEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $conversations = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($conversations, ConversationFactory::mapFromDatabaseResult($row));
            }
        }
        return $conversations;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateConversation(ConversationEntity $conversationEntity): ?ConversationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(ConversationEntity::TABLE_NAME)
            ->updateParams([
                [ConversationTableSchema::SENDER_UID, $this->escape_string($conversationEntity->getSenderUid())],
                [ConversationTableSchema::RECEIVER_UID, $this->escape_string($conversationEntity->getReceiverUid())],
                [ConversationTableSchema::MESSAGE, $this->escape_string($conversationEntity->getMessage())],
                [ConversationTableSchema::CREATED_AT, $this->escape_string($conversationEntity->getCreatedAt())],
                [ConversationTableSchema::UPDATED_AT, $this->escape_string($conversationEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [ConversationTableSchema::ID, '=', $this->escape_string($conversationEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getConversationWithId($conversationEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteConversation(ConversationEntity $conversationEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(ConversationEntity::TABLE_NAME)
            ->whereParams([
                [ConversationTableSchema::ID, '=', $this->escape_string($conversationEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllConversations() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(ConversationEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllConversationWithSellerUid(string $seller): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(ConversationEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [ConversationTableSchema::SENDER_UID, '=', $this->escape_string($seller)],
                ["OR"],
                [ConversationTableSchema::RECEIVER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $conversation = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($conversation, ConversationFactory::mapFromDatabaseResult($row));
            }
        }
        return $conversation;
    }

    public function getAllConversationWithBuyerUid(string $buyer): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(ConversationEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [ConversationTableSchema::SENDER_UID, '=', $this->escape_string($buyer)],
                ["OR"],
                [ConversationTableSchema::RECEIVER_UID, '=', $this->escape_string($buyer)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $conversation = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($conversation, ConversationFactory::mapFromDatabaseResult($row));
            }
        }
        return $conversation;
    }

    public function getAllConversationBetweenSenderAndReceiver(string $seller, string $buyer): array {
        $query = "SELECT * FROM " . ConversationEntity::TABLE_NAME . "
         WHERE (" . ConversationTableSchema::SENDER_UID . " ='" . $this->escape_string($seller) . "'
        AND " . ConversationTableSchema::RECEIVER_UID . " ='" . $this->escape_string($buyer) . "') OR (" . ConversationTableSchema::RECEIVER_UID . " ='" . $this->escape_string($seller) . "'
            AND " . ConversationTableSchema::SENDER_UID . " ='" . $this->escape_string($buyer) . "')";

        $result = mysqli_query($this->getConnection(), $query);

        $conversation = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($conversation, ConversationFactory::mapFromDatabaseResult($row));
            }
        }
        return $conversation;
    }

}
