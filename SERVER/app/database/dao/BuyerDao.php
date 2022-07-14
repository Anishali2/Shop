<?php

class BuyerDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertBuyer(BuyerEntity $buyerEntity): ?BuyerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(BuyerEntity::TABLE_NAME)
            ->columns([
                BuyerTableSchema::UID,
                BuyerTableSchema::FIRST_NAME,
                BuyerTableSchema::LAST_NAME,
                BuyerTableSchema::EMAIL,
                BuyerTableSchema::COUNTRY,
                BuyerTableSchema::ADDRESS,
                BuyerTableSchema::PHONE,
                BuyerTableSchema::PROFILE_PICTURE,
                BuyerTableSchema::PASSWORD,
                BuyerTableSchema::IS_SELLER,
                BuyerTableSchema::CREATED_AT,
                BuyerTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($buyerEntity->getUid()),
                $this->escape_string($buyerEntity->getFirstName()),
                $this->escape_string($buyerEntity->getLastName()),
                $this->escape_string($buyerEntity->getEmail()),
                $this->escape_string($buyerEntity->getCountry()),
                $this->escape_string($buyerEntity->getAddress()),
                $this->escape_string($buyerEntity->getPhone()),
                $this->escape_string($buyerEntity->getProfilePicture()),
                $this->escape_string($buyerEntity->getPassword()),
                $this->wrapBool($buyerEntity->isIsSeller()),
                $this->escape_string($buyerEntity->getCreatedAt()),
                $this->escape_string($buyerEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getBuyerWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBuyerWithId(string $id): ?BuyerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BuyerEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [BuyerTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BuyerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBuyerWithUid(string $uid): ?BuyerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BuyerEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [BuyerTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BuyerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllBuyer(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BuyerEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $buyers = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($buyers, BuyerFactory::mapFromDatabaseResult($row));
            }
        }
        return $buyers;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateBuyer(BuyerEntity $buyerEntity): ?BuyerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(BuyerEntity::TABLE_NAME)
            ->updateParams([
                [BuyerTableSchema::FIRST_NAME, $this->escape_string($buyerEntity->getFirstName())],
                [BuyerTableSchema::LAST_NAME, $this->escape_string($buyerEntity->getLastName())],
                [BuyerTableSchema::EMAIL, $this->escape_string($buyerEntity->getEmail())],
                [BuyerTableSchema::COUNTRY, $this->escape_string($buyerEntity->getCountry())],
                [BuyerTableSchema::ADDRESS, $this->escape_string($buyerEntity->getAddress())],
                [BuyerTableSchema::PHONE, $this->escape_string($buyerEntity->getPhone())],
                [BuyerTableSchema::PROFILE_PICTURE, $this->escape_string($buyerEntity->getProfilePicture())],
                [BuyerTableSchema::PASSWORD, $this->escape_string($buyerEntity->getPassword())],
                [BuyerTableSchema::IS_SELLER, $this->wrapBool($buyerEntity->isIsSeller())],
                [BuyerTableSchema::CREATED_AT, $this->escape_string($buyerEntity->getCreatedAt())],
                [BuyerTableSchema::UPDATED_AT, $this->escape_string($buyerEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [BuyerTableSchema::ID, '=', $this->escape_string($buyerEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getBuyerWithId($buyerEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteBuyer(BuyerEntity $buyerEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(BuyerEntity::TABLE_NAME)
            ->whereParams([
                [BuyerTableSchema::ID, '=', $this->escape_string($buyerEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllBuyers() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(BuyerEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBuyerWithEmail(string $email): ?BuyerEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(BuyerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [BuyerTableSchema::EMAIL, '=', $this->escape_string($email)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BuyerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

    public function getBuyerWithPhone(string $phone): ?BuyerEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(BuyerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [BuyerTableSchema::PHONE, '=', $this->escape_string($phone)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BuyerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

}
