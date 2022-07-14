<?php


class EmailCodeFactory {
    /**
     * @param string[]|null|false $result
     * @return EmailCodeEntity
     */
    public static function mapFromDatabaseResult($result): EmailCodeEntity {
        $entity = new EmailCodeEntity(
            $result[EmailCodeTableSchema::UID],
            $result[EmailCodeTableSchema::OTP],
            $result[EmailCodeTableSchema::CREATED_AT],
            $result[EmailCodeTableSchema::UPDATED_AT]
        );
        $entity->setId($result[EmailCodeTableSchema::ID]);
        return $entity;
    }
}
