const db = require('../config/db.config.js');
const User = db.user; //  引入表模型
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//  查看所有用户
exports.getAllUsers = (req, res) => {
    User.findAll()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json('Error -> ' + err);
        });
};
//新增用户
exports.create = (req, res) => {
    if (req.body.username && req.body.password) {
        // 首先查询用户名是否已经存在
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(user => {
                // 如果用户名已经存在，则返回错误提示信息
                if (user) {
                    const msg = {
                        flag: 0,
                        msg: '用户名已经存在'
                    };
                    res.status(200).json(msg);
                } else {
                    // 如果用户名不存在，则创建新用户
                    User.create(req.body)
                        .then(newUser => {
                            const msg = {
                                flag: 1,
                                msg: '注册成功!',
                                uid: newUser.uid,
                                username: newUser.username
                            };
                            res.status(200).json(msg);
                        })
                        .catch(err => {
                            res.status(500).json('Error -> ' + err);
                        });
                }
            })
            .catch(err => {
                res.status(500).json('Error -> ' + err);
            });
    } else {
        const msg = {
            flag: 0,
            msg: '用户名或者密码不能为空!'
        };
        res.status(200).json(msg);
    }
};


//  验证用户名和密码
exports.validate = (req, res) => {
    if (req.body.username && req.body.password) {
        User.findOne({
            where: {
                [Op.and]: [
                    {
                        username: req.body.username
                    },
                    [
                        {
                            password: req.body.password
                        }
                    ]
                ]
            },
            attributes: ['uid', 'username']
        })
            .then(user => {
                let msg = {};
                if (user) {
                    msg = {
                        flag: 1,
                        msg: '用户名和密码正确!',
                        uid: user.uid,
                        username: user.username
                    };
                } else {
                    msg = {
                        flag: 0,
                        msg: '用户名或密码错误!'
                    };
                }

                res.status(200).json(msg);
            })
            .catch(err => {
                res.status(500).json('Error -> ' + err);
            });
    } else {
        let msg = {
            flag: 0,
            msg: '用户名或者密码不能为空!'
        };
        res.status(200).json(msg);
    }
};
// 删除用户账号
exports.delete = (req, res) => {
    User.destroy({
        where: {
            uid: req.params.userId
        }
    })
        .then(() => {
            const msg = {
                flag: 1,
                msg: '账号删除成功!'
            };
            res.status(200).json(msg);
        })
        .catch(err => {
            res.status(500).json('Error -> ' + err);
        });
};

//  修改密码
exports.updatePassWord = (req, res) => {
    User.findOne({
        where: {
            [Op.and]: [
                {
                    uid: req.params.userId
                },
                {
                    password: req.body.oldPassword
                }
            ]
        }
    }).then(user => {
        if (user) {
            User.update(
                {
                    password: req.body.newPassword
                },
                {
                    where: {
                        uid: req.params.userId
                    }
                }
            ).then(() => {
                let msg = {
                    flag: 1,
                    msg: '修改密码成功!'
                };
                res.status(200).json(msg);
            });
        } else {
            let msg = {
                flag: 0,
                msg: '密码不正确!'
            };
            res.status(200).json(msg);
        }
    });
};
