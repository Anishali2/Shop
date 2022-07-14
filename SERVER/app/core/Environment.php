<?php

trait Environment {

    private function getServerNameWithAvailableProtocol(): string {
        $server_name = $_SERVER["SERVER_NAME"];
        return 'http' . (isset($_SERVER['HTTPS']) ? 's' : '') . '://' . $server_name;
    }

    private function getServerUrlUptoDataDir(): string {
        return $this->getServerNameWithAvailableProtocol() . "/data";
    }

    public function getDataDirectoryPath(): string {
        return Manifest::getAppSystemRoot() . "/data";
    }

    /**
     * <UserAvatarImage>
     */
    public function getUserAvatarImageDirPath(): string {
        return $this->getDataDirectoryPath() . '/images/user_avatars';
    }

    public function createLinkForUserAvatarImage(string $file_name): string {
        return $this->getServerUrlUptoDataDir() . "/images/user_avatars/" . $file_name;
    }
    /** ----------------- </UserAvatarImage> */

    /**
     * <PostImage>
     */
    public function getPostImageDirPath(): string {
        return $this->getDataDirectoryPath() . '/images/posts';
    }

    public function createLinkForPostImage(string $file_name): string {
        return $this->getServerUrlUptoDataDir() . "/images/posts/" . $file_name;
    }
    /** ----------------- </PostImage> */

    /**
     * <ProductImage>
     */
    public function getProductImageDirPath(): string {
        return $this->getDataDirectoryPath() . '/images/products';
    }

    public function createLinkForProductImage(string $file_name): string {
        return $this->getServerUrlUptoDataDir() . "/images/products/" . $file_name;
    }
    /** ----------------- </ProductImage> */

    /**
     * <StatusVideo>
     */
    public function getStatusVideoDirPath(): string {
        return $this->getDataDirectoryPath() . '/videos/user_statuses';
    }

    public function createLinkForStatusVideo(string $file_name): string {
        return $this->getServerUrlUptoDataDir() . "/videos/user_statuses/" . $file_name;
    }
    /** ----------------- </StatusVideo> */

}
