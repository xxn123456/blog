const permission = [
    {
        id: "1",
        label: "权限",
        children: [
            {
                id: "1-1",
                permission: "user",
                label: "用户管理",
                children: [
                    {
                        id: "1-1-1",
                        permission: "user-add",
                        label: "新增",
                    },
                    {
                        id: "1-1-2",
                        permission: "user-edit",
                        label: "编辑",
                    },
                    {
                        id: "1-1-3",
                        permission: "userd-del",
                        label: "删除",
                    },
                    {
                        id: "1-1-4",
                        permission: "user-change-pass",
                        label: "修改密码",
                    },
                ],
            },
            {
                id: "1-2",
                permission: "role",
                label: "角色管理",
                children: [
                    {
                        id: "1-2-1",
                        permission: "role-add",
                        label: "新增",
                    },
                    {
                        id: "1-2-2",
                        permission: "role-edit",
                        label: "编辑",
                    },
                    {
                        id: "1-2-3",
                        permission: "role-del",
                        label: "删除",
                    }
                ],
            },
        ],
    },
    {
        id: "2",
        label: "博客",
        children: [
            {
                id: "2-1",
                permission: "nav",
                label: "栏目",
                children: [
                    {
                        id: "2-1-1",
                        permission: "nav-add",
                        label: "新增",
                    },
                    {
                        id: "2-1-2",
                        permission: "nav-edit",
                        label: "编辑",
                    },
                    {
                        id: "2-1-3",
                        permission: "nav-del",
                        label: "删除",
                    }
                ],
            },
            {
                id: "2-2",
                permission: "swiper",
                label: "首页轮播",
                children: [
                    {
                        id: "2-2-1",
                        permission: "swiper-add",
                        label: "新增",
                    },
                    {
                        id: "2-2-2",
                        permission: "swiper-edit",
                        label: "编辑",
                    },
                    {
                        id: "2-2-3",
                        permission: "swiper-del",
                        label: "删除",
                    }
                ],
            },
            {
                id: "2-3",
                permission: "article",
                label: "文章",
                children: [
                    {
                        id: "2-3-1",
                        permission: "article-add",
                        label: "新增",
                    },
                    {
                        id: "2-3-2",
                        permission: "article-deit",
                        label: "编辑",
                    },
                    {
                        id: "2-3-3",
                        permission: "article-del",
                        label: "删除",
                    },
                    {
                        id: "2-3-4",
                        permission: "article-cont",
                        label: "编辑内容",
                    },
                ],
            },
            {
                id: "2-4",
                permission: "works",
                label: "作品集",
                children: [
                    {
                        id: "2-4-1",
                        permission: "works-add",
                        label: "新增",
                    },
                    {
                        id: "2-4-2",
                        permission: "works-edit",
                        label: "编辑",
                    },
                    {
                        id: "2-4-3",
                        permission: "works-del",
                        label: "删除",
                    },
                    {
                        id: "2-4-4",
                        permission: "works-cont",
                        label: "编辑内容",
                    },
                ],
            },
             {
                id: "2-5",
                permission: "reply",
                label: "文章评论",
                children: [
                    {
                        id: "2-5-1",
                        permission: "reply-add",
                        label: "新增",
                    },
                    {
                        id: "2-5-2",
                        permission: "reply-edit",
                        label: "编辑",
                    },
                    {
                        id: "2-5-3",
                        permission: "reply-del",
                        label: "删除",
                    },
                    {
                        id: "2-5-4",
                        permission: "reply-cont",
                        label: "编辑内容",
                    },
                ],
            },
            {
                id: "2-6",
                permission: "set",
                label: "网站配置",
                children: [
                    {
                        id: "2-6-1",
                        permission: "set-add",
                        label: "新增",
                    },
                    {
                        id: "2-6-2",
                        permission: "set-edit",
                        label: "编辑",
                    },
                    {
                        id: "2-6-3",
                        permission: "set-del",
                        label: "删除",
                    }
                ],
            },
        ],
    }
]

export {
    permission
}