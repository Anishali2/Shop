<?php


class BlockFactory {
    /**
     * @param string[]|null|false $result
     * @return BlockEntity
     */
    public static function mapFromDatabaseResult($result): BlockEntity {
        $entity = new BlockEntity(
            $result[BlockTableSchema::UID],
            $result[BlockTableSchema::BLOCKER],
            $result[BlockTableSchema::BLOCKED],
            $result[BlockTableSchema::CREATED_AT],
            $result[BlockTableSchema::UPDATED_AT]
        );
        $entity->setId($result[BlockTableSchema::ID]);
        return $entity;
    }
}
