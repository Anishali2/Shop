<?php

class SummaryDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertSummary(SummaryEntity $summaryEntity): ?SummaryEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(SummaryEntity::TABLE_NAME)
            ->columns([
                SummaryTableSchema::UID,
                SummaryTableSchema::BUYER_UID,
                SummaryTableSchema::SELLER_UID,
                SummaryTableSchema::PRODUCT_NAME,
                SummaryTableSchema::PRODUCT_SIZE,
                SummaryTableSchema::PRODUCT_COLOR,
                SummaryTableSchema::PRODUCT_QUANTITY,
                SummaryTableSchema::PRODUCT_PRICE,
                SummaryTableSchema::CREATED_AT,
                SummaryTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($summaryEntity->getUid()),
                $this->escape_string($summaryEntity->getBuyerUid()),
                $this->escape_string($summaryEntity->getSellerUid()),
                $this->escape_string($summaryEntity->getProductName()),
                $this->escape_string($summaryEntity->getProductSize()),
                $this->escape_string($summaryEntity->getProductColor()),
                $this->escape_string($summaryEntity->getProductQuantity()),
                $this->escape_string($summaryEntity->getProductPrice()),
                $this->escape_string($summaryEntity->getCreatedAt()),
                $this->escape_string($summaryEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getSummaryWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSummaryWithId(string $id): ?SummaryEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SummaryEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [SummaryTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SummaryFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSummaryWithUid(string $uid): ?SummaryEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SummaryEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [SummaryTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SummaryFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllSummary(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(SummaryEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $summarys = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($summarys, SummaryFactory::mapFromDatabaseResult($row));
            }
        }
        return $summarys;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateSummary(SummaryEntity $summaryEntity): ?SummaryEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(SummaryEntity::TABLE_NAME)
            ->updateParams([
                [SummaryTableSchema::BUYER_UID, $this->escape_string($summaryEntity->getBuyerUid())],
                [SummaryTableSchema::SELLER_UID, $this->escape_string($summaryEntity->getSellerUid())],
                [SummaryTableSchema::PRODUCT_NAME, $this->escape_string($summaryEntity->getProductName())],
                [SummaryTableSchema::PRODUCT_SIZE, $this->escape_string($summaryEntity->getProductSize())],
                [SummaryTableSchema::PRODUCT_COLOR, $this->escape_string($summaryEntity->getProductColor())],
                [SummaryTableSchema::PRODUCT_QUANTITY, $this->escape_string($summaryEntity->getProductQuantity())],
                [SummaryTableSchema::PRODUCT_PRICE, $this->escape_string($summaryEntity->getProductPrice())],
                [SummaryTableSchema::CREATED_AT, $this->escape_string($summaryEntity->getCreatedAt())],
                [SummaryTableSchema::UPDATED_AT, $this->escape_string($summaryEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [SummaryTableSchema::ID, '=', $this->escape_string($summaryEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getSummaryWithId($summaryEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteSummary(SummaryEntity $summaryEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(SummaryEntity::TABLE_NAME)
            ->whereParams([
                [SummaryTableSchema::ID, '=', $this->escape_string($summaryEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllSummarys() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(SummaryEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getSummaryWithBuyerUid(string $buyer): ?SummaryEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(SummaryEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [SummaryTableSchema::BUYER_UID, '=', $this->escape_string($buyer)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SummaryFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

    public function getSummaryWithSellerUid(string $seller): ?SummaryEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(SummaryEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [SummaryTableSchema::SELLER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return SummaryFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }
}
