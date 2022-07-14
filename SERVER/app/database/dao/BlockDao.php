<?php

class BlockDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertBlock(BlockEntity $blockEntity): ?BlockEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(BlockEntity::TABLE_NAME)
            ->columns([
                BlockTableSchema::UID,
                BlockTableSchema::BLOCKER,
                BlockTableSchema::BLOCKED,
                BlockTableSchema::CREATED_AT,
                BlockTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($blockEntity->getUid()),
                $this->escape_string($blockEntity->getBlocker()),
                $this->escape_string($blockEntity->getBlocked()),
                $this->escape_string($blockEntity->getCreatedAt()),
                $this->escape_string($blockEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getBlockWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBlockWithId(string $id): ?BlockEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BlockEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [BlockTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BlockFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBlockWithUid(string $uid): ?BlockEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BlockEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [BlockTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BlockFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllBlock(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(BlockEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $blocks = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($blocks, BlockFactory::mapFromDatabaseResult($row));
            }
        }
        return $blocks;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateBlock(BlockEntity $blockEntity): ?BlockEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(BlockEntity::TABLE_NAME)
            ->updateParams([
                [BlockTableSchema::BLOCKER, $this->escape_string($blockEntity->getBlocker())],
                [BlockTableSchema::BLOCKED, $this->escape_string($blockEntity->getBlocked())],
                [BlockTableSchema::CREATED_AT, $this->escape_string($blockEntity->getCreatedAt())],
                [BlockTableSchema::UPDATED_AT, $this->escape_string($blockEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [BlockTableSchema::ID, '=', $this->escape_string($blockEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getBlockWithId($blockEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteBlock(BlockEntity $blockEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(BlockEntity::TABLE_NAME)
            ->whereParams([
                [BlockTableSchema::ID, '=', $this->escape_string($blockEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllBlocks() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(BlockEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getBlockWithBlockerAndBlocked(string $blocker, string $blocked): ?BlockEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(BlockEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [BlockTableSchema::BLOCKER, '=', $this->escape_string($blocker)],
                ["AND"],
                [BlockTableSchema::BLOCKED, '=', $this->escape_string($blocked)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return BlockFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

    public function getBlockWithBlockerUid(string $buyer): ?array {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(BlockEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [BlockTableSchema::BLOCKER, '=', $this->escape_string($buyer)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $blocks = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($blocks, BlockFactory::mapFromDatabaseResult($row));
            }
        }
        return $blocks;
    }

}
