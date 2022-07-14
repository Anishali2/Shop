<?php

class SellerNotificationDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertSellerNotification(SellerNotificationEntity $sellerNotificationEntity): ?SellerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(SellerNotificationEntity::TABLE_NAME)
            ->columns([
                SellerNotificationTableSchema::UID,
                SellerNotificationTableSchema::SELLER_UID,
                SellerNotificationTableSchema::NOTIFICATION,
                SellerNotificationTableSchema::STATUS,
                SellerNotificationTableSchema::CREATED_AT,
                SellerNotificationTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($sellerNotificationEntity->getUid()),
                $this->escape_string($sellerNotificationEntity->getSellerUid()),
                $this->escape_string($sellerNotificationEntity->getNotification()),
                $this->escape_string($sellerNotificationEntity->getStatus()),
                $this->escape_string($sellerNotificationEntity->getCreatedAt()),
                $this->escape_string($sellerNotificationEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getSellerNotificationWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSellerNotificationWithId(string $id): ?SellerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SellerNotificationEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [SellerNotificationTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SellerNotificationFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSellerNotificationWithUid(string $uid): ?SellerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SellerNotificationEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [SellerNotificationTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SellerNotificationFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllSellerNotification(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SellerNotificationEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $sellerNotifications = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($sellerNotifications, SellerNotificationFactory::mapFromDatabaseResult($row));
            }
        }
        return $sellerNotifications;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateSellerNotification(SellerNotificationEntity $sellerNotificationEntity): ?SellerNotificationEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(SellerNotificationEntity::TABLE_NAME)
            ->updateParams([
                [SellerNotificationTableSchema::SELLER_UID, $this->escape_string($sellerNotificationEntity->getSellerUid())],
                [SellerNotificationTableSchema::NOTIFICATION, $this->escape_string($sellerNotificationEntity->getNotification())],
                [SellerNotificationTableSchema::STATUS, $this->escape_string($sellerNotificationEntity->getStatus())],
                [SellerNotificationTableSchema::CREATED_AT, $this->escape_string($sellerNotificationEntity->getCreatedAt())],
                [SellerNotificationTableSchema::UPDATED_AT, $this->escape_string($sellerNotificationEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [SellerNotificationTableSchema::ID, '=', $this->escape_string($sellerNotificationEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getSellerNotificationWithId($sellerNotificationEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteSellerNotification(SellerNotificationEntity $sellerNotificationEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(SellerNotificationEntity::TABLE_NAME)
            ->whereParams([
                [SellerNotificationTableSchema::ID, '=', $this->escape_string($sellerNotificationEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllSellerNotifications() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(SellerNotificationEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllSellerNotificationWithSellerUid(string $seller): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(SellerNotificationEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [SellerNotificationTableSchema::SELLER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $sellerNotifications = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($sellerNotifications, SellerNotificationFactory::mapFromDatabaseResult($row));
            }
        }
        return $sellerNotifications;
    }

}
