<?php

class BuyerNotificationDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertBuyerNotification(BuyerNotificationEntity $buyerNotificationEntity): ?BuyerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(BuyerNotificationEntity::TABLE_NAME)
            ->columns([
                BuyerNotificationTableSchema::UID,
                BuyerNotificationTableSchema::BUYER_UID,
                BuyerNotificationTableSchema::NOTIFICATION,
                BuyerNotificationTableSchema::STATUS,
                BuyerNotificationTableSchema::CREATED_AT,
                BuyerNotificationTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($buyerNotificationEntity->getUid()),
                $this->escape_string($buyerNotificationEntity->getBuyerUid()),
                $this->escape_string($buyerNotificationEntity->getNotification()),
                $this->escape_string($buyerNotificationEntity->getStatus()),
                $this->escape_string($buyerNotificationEntity->getCreatedAt()),
                $this->escape_string($buyerNotificationEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getBuyerNotificationWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBuyerNotificationWithId(string $id): ?BuyerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BuyerNotificationEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [BuyerNotificationTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BuyerNotificationFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBuyerNotificationWithUid(string $uid): ?BuyerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BuyerNotificationEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [BuyerNotificationTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BuyerNotificationFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllBuyerNotification(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BuyerNotificationEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $buyerNotifications = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($buyerNotifications, BuyerNotificationFactory::mapFromDatabaseResult($row));
            }
        }
        return $buyerNotifications;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateBuyerNotification(BuyerNotificationEntity $buyerNotificationEntity): ?BuyerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(BuyerNotificationEntity::TABLE_NAME)
            ->updateParams([
                [BuyerNotificationTableSchema::BUYER_UID, $this->escape_string($buyerNotificationEntity->getBuyerUid())],
                [BuyerNotificationTableSchema::NOTIFICATION, $this->escape_string($buyerNotificationEntity->getNotification())],
                [BuyerNotificationTableSchema::STATUS, $this->escape_string($buyerNotificationEntity->getStatus())],
                [BuyerNotificationTableSchema::CREATED_AT, $this->escape_string($buyerNotificationEntity->getCreatedAt())],
                [BuyerNotificationTableSchema::UPDATED_AT, $this->escape_string($buyerNotificationEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [BuyerNotificationTableSchema::ID, '=', $this->escape_string($buyerNotificationEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getBuyerNotificationWithId($buyerNotificationEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteBuyerNotification(BuyerNotificationEntity $buyerNotificationEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(BuyerNotificationEntity::TABLE_NAME)
            ->whereParams([
                [BuyerNotificationTableSchema::ID, '=', $this->escape_string($buyerNotificationEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllBuyerNotifications() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(BuyerNotificationEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllBuyerNotificationWithBuyerUid(string $buyer): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(BuyerNotificationEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [BuyerNotificationTableSchema::BUYER_UID, '=', $this->escape_string($buyer)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $buyerNotifications = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($buyerNotifications, BuyerNotificationFactory::mapFromDatabaseResult($row));
            }
        }
        return $buyerNotifications;
    }

}
