<?php

class EmailCodeDao extends TableDao {


    public function __construct(mysqli $connection) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        parent::__construct($connection);
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function insertEmailCode(EmailCodeEntity $emailCodeEntity): ?EmailCodeEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::INSERT)
            ->withTableName(EmailCodeEntity::TABLE_NAME)
            ->columns([
                EmailCodeTableSchema::UID,
                EmailCodeTableSchema::OTP,
                EmailCodeTableSchema::CREATED_AT,
                EmailCodeTableSchema::UPDATED_AT
            ])
            ->values([
                $this->escape_string($emailCodeEntity->getUid()),
                $this->escape_string($emailCodeEntity->getOtp()),
                $this->escape_string($emailCodeEntity->getCreatedAt()),
                $this->escape_string($emailCodeEntity->getUpdatedAt())
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getEmailCodeWithId($this->inserted_id());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getEmailCodeWithId(string $id): ?EmailCodeEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(EmailCodeEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [EmailCodeTableSchema::ID, '=', $this->escape_string($id)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return EmailCodeFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getEmailCodeWithUid(string $uid): ?EmailCodeEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(EmailCodeEntity::TABLE_NAME)
             ->columns(['*'])
             ->whereParams([
                [EmailCodeTableSchema::UID, '=', $this->escape_string($uid)]
             ])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return EmailCodeFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getAllEmailCode(): array { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
             ->withTableName(EmailCodeEntity::TABLE_NAME)
             ->columns(['*'])
             ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        $emailCodes = [];

        if ($result) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($emailCodes, EmailCodeFactory::mapFromDatabaseResult($row));
            }
        }
        return $emailCodes;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function updateEmailCode(EmailCodeEntity $emailCodeEntity): ?EmailCodeEntity { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::UPDATE)
            ->withTableName(EmailCodeEntity::TABLE_NAME)
            ->updateParams([
                [EmailCodeTableSchema::OTP, $this->escape_string($emailCodeEntity->getOtp())],
                [EmailCodeTableSchema::CREATED_AT, $this->escape_string($emailCodeEntity->getCreatedAt())],
                [EmailCodeTableSchema::UPDATED_AT, $this->escape_string($emailCodeEntity->getUpdatedAt())]
            ])
            ->whereParams([
                [EmailCodeTableSchema::ID, '=', $this->escape_string($emailCodeEntity->getId())]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result) {
            return $this->getEmailCodeWithId($emailCodeEntity->getId());
        }
        return null;
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteEmailCode(EmailCodeEntity $emailCodeEntity) { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(EmailCodeEntity::TABLE_NAME)
            ->whereParams([
                [EmailCodeTableSchema::ID, '=', $this->escape_string($emailCodeEntity->getId())]
            ])
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function deleteAllEmailCodes() { // <***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>
        $query = QueryBuilder::withQueryType(QueryType::DELETE)
            ->withTableName(EmailCodeEntity::TABLE_NAME)
            ->generate();

        while(true) {
            if (mysqli_query($this->getConnection(), $query)) {
                break;
            }
        }
    } // </***_ELECTRO_GENERATED_DO_NOT_REMOVE_***>

    public function getEmailCodeWithCode(string $code): ?EmailCodeEntity {
        $query = QueryBuilder::withQueryType(QueryType::SELECT)
            ->withTableName(EmailCodeEntity::TABLE_NAME)
            ->columns(['*'])
            ->whereParams([
                [EmailCodeTableSchema::OTP, '=', $this->escape_string($code)]
            ])
            ->generate();

        $result = mysqli_query($this->getConnection(), $query);

        if ($result && $result->num_rows >= 1) {
            return EmailCodeFactory::mapFromDatabaseResult(mysqli_fetch_assoc($result));
        }
        return null;
    }

}
