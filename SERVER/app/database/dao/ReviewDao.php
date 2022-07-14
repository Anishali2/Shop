<?php

class ReviewDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertReview(ReviewEntity $reviewEntity): ?ReviewEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(ReviewEntity::TABLE_NAME)
            ->columns([
                ReviewTableSchema::UID,
                ReviewTableSchema::SELLER_UID,
                ReviewTableSchema::BUYER_UID,
                ReviewTableSchema::REVIEW,
                ReviewTableSchema::RATING,
                ReviewTableSchema::CREATED_AT,
                ReviewTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($reviewEntity->getUid()),
                $this->escape_string($reviewEntity->getSellerUid()),
                $this->escape_string($reviewEntity->getBuyerUid()),
                $this->escape_string($reviewEntity->getReview()),
                $this->escape_string($reviewEntity->getRating()),
                $this->escape_string($reviewEntity->getCreatedAt()),
                $this->escape_string($reviewEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getReviewWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getReviewWithId(string $id): ?ReviewEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ReviewEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [ReviewTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ReviewFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getReviewWithUid(string $uid): ?ReviewEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ReviewEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [ReviewTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ReviewFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllReview(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ReviewEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $reviews = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($reviews, ReviewFactory::mapFromDatabaseResult($row));
            }
        }
        return $reviews;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateReview(ReviewEntity $reviewEntity): ?ReviewEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(ReviewEntity::TABLE_NAME)
            ->updateParams([
                [ReviewTableSchema::SELLER_UID, $this->escape_string($reviewEntity->getSellerUid())],
                [ReviewTableSchema::BUYER_UID, $this->escape_string($reviewEntity->getBuyerUid())],
                [ReviewTableSchema::REVIEW, $this->escape_string($reviewEntity->getReview())],
                [ReviewTableSchema::RATING, $this->escape_string($reviewEntity->getRating())],
                [ReviewTableSchema::CREATED_AT, $this->escape_string($reviewEntity->getCreatedAt())],
                [ReviewTableSchema::UPDATED_AT, $this->escape_string($reviewEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [ReviewTableSchema::ID, '=', $this->escape_string($reviewEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getReviewWithId($reviewEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteReview(ReviewEntity $reviewEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(ReviewEntity::TABLE_NAME)
            ->whereParams([
                [ReviewTableSchema::ID, '=', $this->escape_string($reviewEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllReviews() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(ReviewEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getReviewWithSellerUid(string $seller): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(ReviewEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [ReviewTableSchema::SELLER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $reviews = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($reviews, ReviewFactory::mapFromDatabaseResult($row));
            }
        }
        return $reviews;
    }

}
