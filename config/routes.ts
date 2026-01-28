export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user/login',
                layout: false,
                name: 'login',
                component: './user/Login',
            },
            {
                path: '/user',
                redirect: '/user/login',
            },
        ],
    },

    ///////////////////////////////////
    // DEFAULT MENU
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: './TrangChu',
        icon: 'HomeOutlined',
    },

    // --- BẮT ĐẦU PHẦN THÊM MỚI ---
    {
        path: '/bai-1',
        name: 'Bài 1: Đoán số',
        component: './Bai1',
        icon: 'QuestionCircleOutlined',
        locale: false, // dòng này để tắt cảnh báo dịch
    },
    {
        path: '/bai-2',
        name: 'Bài 2: TodoList',
        component: './Bai2',
        icon: 'UnorderedListOutlined',
        locale: false, 
    },
    // --- KẾT THÚC PHẦN THÊM MỚI ---

    {
        path: '/gioi-thieu',
        name: 'About',
        component: './TienIch/GioiThieu',
        hideInMenu: true,
    },
    {
        path: '/random-user',
        name: 'RandomUser',
        component: './RandomUser',
        icon: 'ArrowsAltOutlined',
    },

    // {
    //  name: 'DanhMuc',
    //  path: '/danh-muc',
    //  icon: 'copy',
    //  routes: [
    //      {
    //          name: 'ChucVu',
    //          path: 'chuc-vu',
    //          component: './DanhMuc/ChucVu',
    //      },
    //  ],
    // },

    {
        path: '/notification',
        routes: [
            {
                path: './subscribe',
                exact: true,
                component: './ThongBao/Subscribe',
            },
            {
                path: './check',
                exact: true,
                component: './ThongBao/Check',
            },
            {
                path: './',
                exact: true,
                component: './ThongBao/NotifOneSignal',
            },
        ],
        layout: false,
        hideInMenu: true,
    },
    {
        path: '/',
        redirect: '/dashboard', // Thêm redirect để khi vào web nó tự vào trang chủ
    },
    {
        path: '/403',
        component: './exception/403/403Page',
        layout: false,
    },
    {
        path: '/hold-on',
        component: './exception/DangCapNhat',
        layout: false,
    },
    {
        path: '/404', // Nên thêm path rõ ràng cho 404
        component: './exception/404',
    },
    {
        component: './exception/404',
    },
];