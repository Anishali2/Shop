<?php

class AppDB {
    const HOSTNAME = "localhost";
    const USERNAME = "globtqsc_umair";
    const PASSWORD = "Devils@dvocate007";
    const DATABASE = "globtqsc_testapi";

    private mysqli $conn;

    private PostDao $postDao;
    private EmailCodeDao $emailCodeDao;
    private ConversationDao $conversationDao;
    private BuyerNotificationDao $buyerNotificationDao;
    private SellerNotificationDao $sellerNotificationDao;
    private BuyerDao $buyerDao;
    private SellerDao $sellerDao;
    private BlockDao $blockDao;
    private LiveStreamDao $liveStreamDao;
    private ReviewDao $reviewDao;
    private SummaryDao $summaryDao;
    private ProductDao $productDao;
    private FollowerDao $followerDao;

    function __construct() {
        $temp_conn = mysqli_connect(self::HOSTNAME, self::USERNAME, self::PASSWORD, self::DATABASE);

        if (!$temp_conn) {
            die("Couldn't Connect to DB!");
        }

        $this->conn = $temp_conn;

        mysqli_query($this->conn, (new PostTableSchema())->getBlueprint()); // Creates Post Table
        $this->postDao = new PostDao($this->conn); // Initialize Post Dao

        mysqli_query($this->conn, (new EmailCodeTableSchema())->getBlueprint()); // Creates EmailCode Table
        $this->emailCodeDao = new EmailCodeDao($this->conn); // Initialize EmailCode Dao

        mysqli_query($this->conn, (new ConversationTableSchema())->getBlueprint()); // Creates Conversation Table
        $this->conversationDao = new ConversationDao($this->conn); // Initialize Conversation Dao

        mysqli_query($this->conn, (new BuyerNotificationTableSchema())->getBlueprint()); // Creates BuyerNotification Table
        $this->buyerNotificationDao = new BuyerNotificationDao($this->conn); // Initialize BuyerNotification Dao

        mysqli_query($this->conn, (new SellerNotificationTableSchema())->getBlueprint()); // Creates SellerNotification Table
        $this->sellerNotificationDao = new SellerNotificationDao($this->conn); // Initialize SellerNotification Dao

        mysqli_query($this->conn, (new BuyerTableSchema())->getBlueprint()); // Creates Buyer Table
        $this->buyerDao = new BuyerDao($this->conn); // Initialize Buyer Dao

        mysqli_query($this->conn, (new SellerTableSchema())->getBlueprint()); // Creates Seller Table
        $this->sellerDao = new SellerDao($this->conn); // Initialize Seller Dao

        mysqli_query($this->conn, (new BlockTableSchema())->getBlueprint()); // Creates Block Table
        $this->blockDao = new BlockDao($this->conn); // Initialize Block Dao

        mysqli_query($this->conn, (new LiveStreamTableSchema())->getBlueprint()); // Creates LiveStream Table
        $this->liveStreamDao = new LiveStreamDao($this->conn); // Initialize LiveStream Dao

        mysqli_query($this->conn, (new ReviewTableSchema())->getBlueprint()); // Creates Review Table
        $this->reviewDao = new ReviewDao($this->conn); // Initialize Review Dao

        mysqli_query($this->conn, (new SummaryTableSchema())->getBlueprint()); // Creates Summary Table
        $this->summaryDao = new SummaryDao($this->conn); // Initialize Summary Dao

        mysqli_query($this->conn, (new ProductTableSchema())->getBlueprint()); // Creates Product Table
        $this->productDao = new ProductDao($this->conn); // Initialize Product Dao

        mysqli_query($this->conn, (new FollowerTableSchema())->getBlueprint()); // Creates Follower Table
        $this->followerDao = new FollowerDao($this->conn); // Initialize Follower Dao

    }

    public function getConnection(): mysqli {
        return $this->conn;
    }

    public function closeConnection() {
        $this->conn->close();
    }

    public function getPostDao(): PostDao {
        return $this->postDao;
    }

    public function getEmailCodeDao(): EmailCodeDao {
        return $this->emailCodeDao;
    }

    public function getConversationDao(): ConversationDao {
        return $this->conversationDao;
    }

    public function getBuyerNotificationDao(): BuyerNotificationDao {
        return $this->buyerNotificationDao;
    }

    public function getSellerNotificationDao(): SellerNotificationDao {
        return $this->sellerNotificationDao;
    }

    public function getBuyerDao(): BuyerDao {
        return $this->buyerDao;
    }

    public function getSellerDao(): SellerDao {
        return $this->sellerDao;
    }

    public function getBlockDao(): BlockDao {
        return $this->blockDao;
    }

    public function getLiveStreamDao(): LiveStreamDao {
        return $this->liveStreamDao;
    }

    public function getReviewDao(): ReviewDao {
        return $this->reviewDao;
    }

    public function getSummaryDao(): SummaryDao {
        return $this->summaryDao;
    }

    public function getProductDao(): ProductDao {
        return $this->productDao;
    }

    public function getFollowerDao(): FollowerDao {
        return $this->followerDao;
    }
}

