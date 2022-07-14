<?php


class ConversationFactory {
    /**
     * @param string[]|null|false $result
     * @return ConversationEntity
     */
    public static function mapFromDatabaseResult($result): ConversationEntity {
        $entity = new ConversationEntity(
            $result[ConversationTableSchema::UID],
            $result[ConversationTableSchema::SENDER_UID],
            $result[ConversationTableSchema::RECEIVER_UID],
            $result[ConversationTableSchema::MESSAGE],
            $result[ConversationTableSchema::CREATED_AT],
            $result[ConversationTableSchema::UPDATED_AT]
        );
        $entity->setId($result[ConversationTableSchema::ID]);
        return $entity;
    }
}
