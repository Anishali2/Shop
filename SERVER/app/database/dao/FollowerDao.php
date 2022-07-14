<?php

class FollowerDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertFollower(FollowerEntity $followerEntity): ?FollowerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->columns([
                FollowerTableSchema::UID,
                FollowerTableSchema::BUYER_UID,
                FollowerTableSchema::SELLER_UID,
                FollowerTableSchema::CREATED_AT,
                FollowerTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($followerEntity->getUid()),
                $this->escape_string($followerEntity->getBuyerUid()),
                $this->escape_string($followerEntity->getSellerUid()),
                $this->escape_string($followerEntity->getCreatedAt()),
                $this->escape_string($followerEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getFollowerWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getFollowerWithId(string $id): ?FollowerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(FollowerEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [FollowerTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return FollowerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getFollowerWithUid(string $uid): ?FollowerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(FollowerEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [FollowerTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return FollowerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllFollower(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(FollowerEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $followers = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($followers, FollowerFactory::mapFromDatabaseResult($row));
            }
        }
        return $followers;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateFollower(FollowerEntity $followerEntity): ?FollowerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->updateParams([
                [FollowerTableSchema::BUYER_UID, $this->escape_string($followerEntity->getBuyerUid())],
                [FollowerTableSchema::SELLER_UID, $this->escape_string($followerEntity->getSellerUid())],
                [FollowerTableSchema::CREATED_AT, $this->escape_string($followerEntity->getCreatedAt())],
                [FollowerTableSchema::UPDATED_AT, $this->escape_string($followerEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [FollowerTableSchema::ID, '=', $this->escape_string($followerEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getFollowerWithId($followerEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteFollower(FollowerEntity $followerEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->whereParams([
                [FollowerTableSchema::ID, '=', $this->escape_string($followerEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllFollowers() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getFollowerWithBuyerAndSellerUid(string $buyer,string $seller): ?FollowerEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [FollowerTableSchema::BUYER_UID, '=', $this->escape_string($buyer)],
                ["AND"],
                [FollowerTableSchema::SELLER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return FollowerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

    public function getFollowerWithSellerUid(string $seller): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [FollowerTableSchema::SELLER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $followers = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($followers, FollowerFactory::mapFromDatabaseResult($row));
            }
        }
        return $followers;
    }

    public function getFollowerWithBuyerUid(string $buyer): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(FollowerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [FollowerTableSchema::BUYER_UID, '=', $this->escape_string($buyer)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $followers = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($followers, FollowerFactory::mapFromDatabaseResult($row));
            }
        }
        return $followers;
    }

}
