<?php

class LiveStreamDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertLiveStream(LiveStreamEntity $liveStreamEntity): ?LiveStreamEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(LiveStreamEntity::TABLE_NAME)
            ->columns([
                LiveStreamTableSchema::UID,
                LiveStreamTableSchema::SELLER_UID,
                LiveStreamTableSchema::CHANNEL_NAME,
                LiveStreamTableSchema::CREATED_AT,
                LiveStreamTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($liveStreamEntity->getUid()),
                $this->escape_string($liveStreamEntity->getSellerUid()),
                $this->escape_string($liveStreamEntity->getChannelName()),
                $this->escape_string($liveStreamEntity->getCreatedAt()),
                $this->escape_string($liveStreamEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getLiveStreamWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getLiveStreamWithId(string $id): ?LiveStreamEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(LiveStreamEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [LiveStreamTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return LiveStreamFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getLiveStreamWithUid(string $uid): ?LiveStreamEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(LiveStreamEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [LiveStreamTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return LiveStreamFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllLiveStream(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(LiveStreamEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $liveStreams = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($liveStreams, LiveStreamFactory::mapFromDatabaseResult($row));
            }
        }
        return $liveStreams;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateLiveStream(LiveStreamEntity $liveStreamEntity): ?LiveStreamEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(LiveStreamEntity::TABLE_NAME)
            ->updateParams([
                [LiveStreamTableSchema::SELLER_UID, $this->escape_string($liveStreamEntity->getSellerUid())],
                [LiveStreamTableSchema::CHANNEL_NAME, $this->escape_string($liveStreamEntity->getChannelName())],
                [LiveStreamTableSchema::CREATED_AT, $this->escape_string($liveStreamEntity->getCreatedAt())],
                [LiveStreamTableSchema::UPDATED_AT, $this->escape_string($liveStreamEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [LiveStreamTableSchema::ID, '=', $this->escape_string($liveStreamEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getLiveStreamWithId($liveStreamEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteLiveStream(LiveStreamEntity $liveStreamEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(LiveStreamEntity::TABLE_NAME)
            ->whereParams([
                [LiveStreamTableSchema::ID, '=', $this->escape_string($liveStreamEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllLiveStreams() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(LiveStreamEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getLiveStreamWithSellerUid(string $seller): ?LiveStreamEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(LiveStreamEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [LiveStreamTableSchema::SELLER_UID, '=', $this->escape_string($seller)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return LiveStreamFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

}
