<?php

class Manifest {
    const API_KEY = "secret key";
    const DEBUG_MODE = true;
    const MAINTENANCE_MODE = false;
    const FCM_SERVER_API_KEY = "TODO: Please Add FCM KEY";

    private const COMPOSER_VENDOR = [
        'dir_path' => '../',
        'vendor' => [
            'autoload'
        ]
    ];

    private const LIBS = [
        'dir_path' => './libs',
        'magician' => [
            MagicianSpell::class,
            MagicianPasswordSpell::class,
            Magician::class,
        ],
        'query_builder' => [
            QueryType::class,
            Query::class,
            InsertQuery::class,
            WhereApplicableQuery::class,
            SelectQuery::class,
            UpdateQuery::class,
            DeleteQuery::class,
            QueryBuilder::class,
        ],
        'db_libs' => [
            TableDao::class,
            TableSchema::class,
        ],
    ];

    private const DATABASE = [
        'dir_path' => './database',
        'entities' => [
            PostEntity::class,
            EmailCodeEntity::class,
            ConversationEntity::class,
            BuyerNotificationEntity::class,
            SellerNotificationEntity::class,
            BuyerEntity::class,
            SellerEntity::class,
            BlockEntity::class,
            LiveStreamEntity::class,
            ReviewEntity::class,
            SummaryEntity::class,
            ProductEntity::class,
            FollowerEntity::class,
        ],
        'schema' => [
            PostTableSchema::class,
            EmailCodeTableSchema::class,
            ConversationTableSchema::class,
            BuyerNotificationTableSchema::class,
            SellerNotificationTableSchema::class,
            BuyerTableSchema::class,
            SellerTableSchema::class,
            BlockTableSchema::class,
            LiveStreamTableSchema::class,
            ReviewTableSchema::class,
            SummaryTableSchema::class,
            ProductTableSchema::class,
            FollowerTableSchema::class,
        ],
        'factories' => [
            PostFactory::class,
            EmailCodeFactory::class,
            ConversationFactory::class,
            BuyerNotificationFactory::class,
            SellerNotificationFactory::class,
            BuyerFactory::class,
            SellerFactory::class,
            BlockFactory::class,
            LiveStreamFactory::class,
            ReviewFactory::class,
            SummaryFactory::class,
            ProductFactory::class,
            FollowerFactory::class,
        ],
        'dao' => [
            PostDao::class,
            EmailCodeDao::class,
            ConversationDao::class,
            BuyerNotificationDao::class,
            SellerNotificationDao::class,
            BuyerDao::class,
            SellerDao::class,
            BlockDao::class,
            LiveStreamDao::class,
            ReviewDao::class,
            SummaryDao::class,
            ProductDao::class,
            FollowerDao::class,
        ],
        'db' => [
            AppDB::class
        ],
    ];

    private const CORE = [
        'dir_path' => './',
        'core' => [
            Environment::class,
            ElectroResponse::class,
            ElectroMagicalExtensions::class,
            ElectroApi::class,
        ],
    ];

    private const UTILS = [
        'dir_path' => './utils',
        'image_uploader' => [
            ImageUploader::class,
        ],
    ];

    private const MODELS = [
        'dir_path' => './',
        'models' => [
        ]
    ];

    private const AGENTS = [
        'dir_path' => './',
        'agents' => [
            FetchPosts::class,
            CreateSummary::class,
            UnblockPerson::class,
            GetProductDetails::class,
            GetReviews::class,
            UpdateBuyerDetails::class,
            GetBuyerConversations::class,
            GetSellerDetails::class,
            LoginBuyer::class,
            LoginSeller::class,
            SendVerificationCode::class,
            GetBuyerDetails::class,
            GetTotalFollowers::class,
            CreateProduct::class,
            CreateReview::class,
            GetSalesSummary::class,
            GetBlockList::class,
            CreateLiveStream::class,
            VerifyEmailVerificationCode::class,
            UpdateProduct::class,
            UnfollowSeller::class,
            ReadBuyerNotification::class,
            SendMessage::class,
            DeleteLiveStream::class,
            GetAllSellers::class,
            BlockStatus::class,
            CheckFollow::class,
            GetSellerNotifications::class,
            GetFollowers::class,
            BlockPerson::class,
            GetSellerConversations::class,
            GetBuyerNotifications::class,
            UpdateProductQuantity::class,
            UpdateSellerDetails::class,
            GetPurchaseSummary::class,
            GetBuyerFollowers::class,
            FetchLiveStreamDetails::class,
            GetSellerProducts::class,
            DeleteProduct::class,
            ReadSellerNotification::class,
            RegisterSeller::class,
            CreatePost::class,
            RegisterBuyer::class,
            DeletePost::class,
            GetTotalReviews::class,
            FollowSeller::class,
        ]
    ];

    public static function getAppSystemRoot(): string {
        return substr(self::devisePath('../'), 0, -1);
    }

    public static function devisePath($path): string {
        $root_path = explode('/', __DIR__);

        if (substr($path, 0, 2) === './') {
            $path = substr($path, 2);
        } else {
            while (substr($path, 0, 3) === '../') {
                $path = substr($path, 3);
                array_pop($root_path);
            }
        }

        return implode('/', $root_path) . '/' . $path;
    }

    private function requireItems(array $package) {
        foreach ($package as $key => $value) {
            if ($key !== 'dir_path') {
                foreach ($value as $module) {
                    $dir_path = $package['dir_path'];
                    $path = $dir_path;
                    if ($dir_path !== './' && $dir_path !== '../') {
                        $path = $path . '/';
                    }
                    $path = $path . $key . '/' . $module . '.php';
                    require self::devisePath($path) . '';
                }
            }
        }
    }

    private function loadRequirements() {
        self::requireItems(self::COMPOSER_VENDOR);
        self::requireItems(self::LIBS);
        self::requireItems(self::DATABASE);
        self::requireItems(self::CORE);
        self::requireItems(self::UTILS);
        self::requireItems(self::MODELS);
        self::requireItems(self::AGENTS);
    }

    private function __construct() {
        $this->loadRequirements();
    }

    public static function create() {
        new Manifest();
    }
}

Manifest::create();
