<?php

class ProductDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertProduct(ProductEntity $productEntity): ?ProductEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(ProductEntity::TABLE_NAME)
            ->columns([
                ProductTableSchema::UID,
                ProductTableSchema::SELLER_UID,
                ProductTableSchema::NUMBER,
                ProductTableSchema::NAME,
                ProductTableSchema::IMAGE,
                ProductTableSchema::PRICE,
                ProductTableSchema::SIZE,
                ProductTableSchema::COLOR,
                ProductTableSchema::QUANTITY,
                ProductTableSchema::CREATED_AT,
                ProductTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($productEntity->getUid()),
                $this->escape_string($productEntity->getSellerUid()),
                $this->escape_string($productEntity->getNumber()),
                $this->escape_string($productEntity->getName()),
                $this->escape_string($productEntity->getImage()),
                $this->escape_string($productEntity->getPrice()),
                $this->escape_string($productEntity->getSize()),
                $this->escape_string($productEntity->getColor()),
                $this->escape_string($productEntity->getQuantity()),
                $this->escape_string($productEntity->getCreatedAt()),
                $this->escape_string($productEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getProductWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getProductWithId(string $id): ?ProductEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ProductEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [ProductTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ProductFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getProductWithUid(string $uid): ?ProductEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ProductEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [ProductTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ProductFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllProduct(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(ProductEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $products = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($products, ProductFactory::mapFromDatabaseResult($row));
            }
        }
        return $products;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateProduct(ProductEntity $productEntity): ?ProductEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(ProductEntity::TABLE_NAME)
            ->updateParams([
                [ProductTableSchema::SELLER_UID, $this->escape_string($productEntity->getSellerUid())],
                [ProductTableSchema::NUMBER, $this->escape_string($productEntity->getNumber())],
                [ProductTableSchema::NAME, $this->escape_string($productEntity->getName())],
                [ProductTableSchema::IMAGE, $this->escape_string($productEntity->getImage())],
                [ProductTableSchema::PRICE, $this->escape_string($productEntity->getPrice())],
                [ProductTableSchema::SIZE, $this->escape_string($productEntity->getSize())],
                [ProductTableSchema::COLOR, $this->escape_string($productEntity->getColor())],
                [ProductTableSchema::QUANTITY, $this->escape_string($productEntity->getQuantity())],
                [ProductTableSchema::CREATED_AT, $this->escape_string($productEntity->getCreatedAt())],
                [ProductTableSchema::UPDATED_AT, $this->escape_string($productEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [ProductTableSchema::ID, '=', $this->escape_string($productEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getProductWithId($productEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteProduct(ProductEntity $productEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(ProductEntity::TABLE_NAME)
            ->whereParams([
                [ProductTableSchema::ID, '=', $this->escape_string($productEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllProducts() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(ProductEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getProductWithSellerUidAndProductNumber(string $seller, string $number): ?ProductEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(ProductEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [ProductTableSchema::SELLER_UID, '=', $this->escape_string($seller)],
                ["AND"],
                [ProductTableSchema::NUMBER, '=', $this->escape_string($number)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return ProductFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

    public function getAllProductWithSellerUid(string $seller): array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(ProductEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [ProductTableSchema::SELLER_UID, '=', $this->escape_string($seller)],
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $products = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($products, ProductFactory::mapFromDatabaseResult($row));
            }
        }
        return $products;
    }

}
