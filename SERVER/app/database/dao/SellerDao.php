<?php

class SellerDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertSeller(SellerEntity $sellerEntity): ?SellerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(SellerEntity::TABLE_NAME)
            ->columns([
                SellerTableSchema::UID,
                SellerTableSchema::FIRST_NAME,
                SellerTableSchema::LAST_NAME,
                SellerTableSchema::EMAIL,
                SellerTableSchema::COUNTRY,
                SellerTableSchema::ADDRESS,
                SellerTableSchema::PHONE,
                SellerTableSchema::PROFILE_PICTURE,
                SellerTableSchema::PASSWORD,
                SellerTableSchema::BIO,
                SellerTableSchema::CREATED_AT,
                SellerTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($sellerEntity->getUid()),
                $this->escape_string($sellerEntity->getFirstName()),
                $this->escape_string($sellerEntity->getLastName()),
                $this->escape_string($sellerEntity->getEmail()),
                $this->escape_string($sellerEntity->getCountry()),
                $this->escape_string($sellerEntity->getAddress()),
                $this->escape_string($sellerEntity->getPhone()),
                $this->escape_string($sellerEntity->getProfilePicture()),
                $this->escape_string($sellerEntity->getPassword()),
                $this->escape_string($sellerEntity->getBio()),
                $this->escape_string($sellerEntity->getCreatedAt()),
                $this->escape_string($sellerEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getSellerWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSellerWithId(string $id): ?SellerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SellerEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [SellerTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SellerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSellerWithUid(string $uid): ?SellerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SellerEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [SellerTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SellerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllSeller(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SellerEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $sellers = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($sellers, SellerFactory::mapFromDatabaseResult($row));
            }
        }
        return $sellers;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateSeller(SellerEntity $sellerEntity): ?SellerEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(SellerEntity::TABLE_NAME)
            ->updateParams([
                [SellerTableSchema::FIRST_NAME, $this->escape_string($sellerEntity->getFirstName())],
                [SellerTableSchema::LAST_NAME, $this->escape_string($sellerEntity->getLastName())],
                [SellerTableSchema::EMAIL, $this->escape_string($sellerEntity->getEmail())],
                [SellerTableSchema::COUNTRY, $this->escape_string($sellerEntity->getCountry())],
                [SellerTableSchema::ADDRESS, $this->escape_string($sellerEntity->getAddress())],
                [SellerTableSchema::PHONE, $this->escape_string($sellerEntity->getPhone())],
                [SellerTableSchema::PROFILE_PICTURE, $this->escape_string($sellerEntity->getProfilePicture())],
                [SellerTableSchema::PASSWORD, $this->escape_string($sellerEntity->getPassword())],
                [SellerTableSchema::BIO, $this->escape_string($sellerEntity->getBio())],
                [SellerTableSchema::CREATED_AT, $this->escape_string($sellerEntity->getCreatedAt())],
                [SellerTableSchema::UPDATED_AT, $this->escape_string($sellerEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [SellerTableSchema::ID, '=', $this->escape_string($sellerEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getSellerWithId($sellerEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteSeller(SellerEntity $sellerEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(SellerEntity::TABLE_NAME)
            ->whereParams([
                [SellerTableSchema::ID, '=', $this->escape_string($sellerEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllSellers() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(SellerEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSellerWithEmail(string $email): ?SellerEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(SellerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [SellerTableSchema::EMAIL, '=', $this->escape_string($email)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SellerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

    public function getSellerWithPhone(string $phone): ?SellerEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(SellerEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [SellerTableSchema::PHONE, '=', $this->escape_string($phone)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SellerFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

}
