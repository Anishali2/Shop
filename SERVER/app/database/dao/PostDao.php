<?php

class PostDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertPost(PostEntity $postEntity): ?PostEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(PostEntity::TABLE_NAME)
            ->columns([
                PostTableSchema::UID,
                PostTableSchema::SELLER_UID,
                PostTableSchema::DESCRIPTION,
                PostTableSchema::PICTURE,
                PostTableSchema::CREATED_AT,
                PostTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($postEntity->getUid()),
                $this->escape_string($postEntity->getSellerUid()),
                $this->escape_string($postEntity->getDescription()),
                $this->escape_string($postEntity->getPicture()),
                $this->escape_string($postEntity->getCreatedAt()),
                $this->escape_string($postEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getPostWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getPostWithId(string $id): ?PostEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(PostEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [PostTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return PostFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getPostWithUid(string $uid): ?PostEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(PostEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [PostTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return PostFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllPost(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(PostEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $posts = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($posts, PostFactory::mapFromDatabaseResult($row));
            }
        }
        return $posts;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updatePost(PostEntity $postEntity): ?PostEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(PostEntity::TABLE_NAME)
            ->updateParams([
                [PostTableSchema::SELLER_UID, $this->escape_string($postEntity->getSellerUid())],
                [PostTableSchema::DESCRIPTION, $this->escape_string($postEntity->getDescription())],
                [PostTableSchema::PICTURE, $this->escape_string($postEntity->getPicture())],
                [PostTableSchema::CREATED_AT, $this->escape_string($postEntity->getCreatedAt())],
                [PostTableSchema::UPDATED_AT, $this->escape_string($postEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [PostTableSchema::ID, '=', $this->escape_string($postEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getPostWithId($postEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deletePost(PostEntity $postEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(PostEntity::TABLE_NAME)
            ->whereParams([
                [PostTableSchema::ID, '=', $this->escape_string($postEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllPosts() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(PostEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

}
